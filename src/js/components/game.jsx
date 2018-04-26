import React from 'react';
import {urls} from './categories.js';
import {
    Redirect
} from "react-router-dom";


class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            catUrl: this.props.match.params.cat,
            questions: [],
            counter: 1,
            points: 0,
            timer: 15,
            answers: [],
            correctAnswer: '',
            clickedAns: -1,
            isCorrect: false,
            isIncorrect: false,
            correctAnswerStyle: {},
            incorrectAnswerStyle: {},
            gameOver: false,
            isClicked: false
        }
    }

    componentDidMount(){
        const objCat = urls.filter( elem => {
            return elem.nameCategory == this.state.catUrl
        });

        fetch(objCat[0].url).then(data => data.json()).then(response => {

            const incorrect = response.results[this.state.counter-1].incorrect_answers;
            const correct = response.results[this.state.counter-1].correct_answer;
            const answers = incorrect.concat(correct).sort();

            this.setState({
                questions: response,
                correctAnswer: correct,
                answers: answers
            });

            console.log(response);
        });

        this.timer();

    }

    timer = () => {
        this.interval = setInterval( () => {
            this.setState({
                timer: this.state.timer - 1
            });

            if(this.state.timer == 0){

                this.setState({
                    counter: this.state.counter + 1,//< 10 ? (this.state.counter + 1) : 10,
                    timer: 15,
                    gameOver: this.state.counter >= 10 ? true : false
                })
            }
        }, 1000)
    };

    handleClickAnswers = (event, i) => {
        const cnt = this.state.counter +1;

        clearInterval(this.interval);

        if(cnt > 10){
            this.setState({
                gameOver: true
            })
        } else {
            const incorAns = this.state.questions.results[cnt-1].incorrect_answers;
            const corAns = this.state.questions.results[cnt-1].correct_answer;
            const ans = incorAns.concat(corAns).sort();

            this.timeout = setTimeout( () => {
                this.timer();
                this.setState({
                    answers: ans,
                    correctAnswer: corAns,
                    counter: cnt,
                    isCorrect: false,
                    isIncorrect: false,
                    timer: 15,
                    isClicked:true
                });
            }, 1500);

            if (this.state.answers[i] == this.state.correctAnswer){
                let pts = this.state.points + 1;
                this.setState({
                    isCorrect: true,
                    correctAnswerStyle: {
                        backgroundColor: 'green'
                    },
                    points: pts,
                    clickedAns: i
                })
            } else {
                this.setState({
                    isIncorrect: true,
                    incorrectAnswerStyle: {
                        backgroundColor: 'red'
                    },
                    clickedAns: i
                })
            }
        }
    };

    componentWillUnmount(){
        clearInterval(this.interval);
        clearTimeout(this.timeout);
    }

    render(){

        const arrayQuestions = this.state.questions.results;
        let question, ansCor, ansInc, answ, answBoxes, questionToShow;

        if(arrayQuestions != undefined && !this.state.gameOver) {

            question = arrayQuestions != undefined ? arrayQuestions[this.state.counter-1].question : '';

            function createMarkup(text) { return {__html: text}; }
            questionToShow = <h3 dangerouslySetInnerHTML={createMarkup(question)} />;

            ansCor = arrayQuestions[this.state.counter-1].correct_answer;
            ansInc = arrayQuestions[this.state.counter-1].incorrect_answers;
            answ = ansInc.concat(ansCor).sort();

            // console.log(ansCor);

            answBoxes = answ.map( (elem,i) => {
                let style;
                if (this.state.isCorrect) {
                    style = (i === this.state.clickedAns) ? this.state.correctAnswerStyle : {}
                }
                if (this.state.isIncorrect) {
                    style = (i === this.state.clickedAns) ? this.state.incorrectAnswerStyle : {}
                }
                return <div className="answer"
                            key={i}
                            onClick={event => this.handleClickAnswers(event, i)}
                            style={ style }>
                    <h3 dangerouslySetInnerHTML={createMarkup(elem)}/>
                </div>
            });
        }

        const { from } = this.props.location.state || { from: { pathname: "/over/" + this.state.points } };
        if (this.state.gameOver) {
            return <Redirect to={from} />;
        }


        return <section className="main-screen">
                    <div className="info">
                        <div className="question-counter">
                            <div className="name">
                                <h3>Question</h3>
                            </div>
                            <div className="value">
                                <h3>{this.state.counter} / 10</h3>
                            </div>
                        </div>
                        <div className="point-counter">
                            <div className="name">
                                <h3>Points</h3>
                            </div>
                            <div className="value">
                                <h3>{this.state.points}</h3>
                            </div>
                        </div>
                        <div className="timer">
                            <div className="name">
                                <h3>Timer</h3>
                            </div>
                            <div className="value">
                                <h3>{this.state.timer}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="question">
                        <div className="question-frame">
                           {questionToShow}
                        </div>
                    </div>
                    <div className="answers">
                        {answBoxes}
                    </div>
                </section>
    }
}

export {Game};