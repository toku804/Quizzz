import React from 'react';
import {urls} from './categories.js'


class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            catUrl: this.props.match.params.cat,
            questions: [],
            counter: 1,
            points: 0,
            level: 1,
            answers: [],
            correctAnswer: '',
            isCorrect: false,
            isIncorrect: false,
            correctAnswerStyle: {},
            incorrectAnswerStyle: {}
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
                correctAnswer: response.results[this.state.counter-1].correct_answer,
                answers: answers
            })
        });

    }

    // showAnswers = () => {
    //     const arrayQuestions = this.state.questions.results;
    //     const incorrect = arrayQuestions != undefined ? arrayQuestions[this.state.counter-1].incorrect_answers : [];
    //     const correct = arrayQuestions != undefined ? arrayQuestions[this.state.counter-1].correct_answer : [];
    //     return incorrect.concat(correct).sort();
    // };

    handleClickAnswers = (event, i) => {
        let cnt = this.state.counter + 1;
        if (this.state.answers[i] == this.state.correctAnswer){
            let pts = this.state.points + 1;
            this.setState({
                isCorrect: true,
                correctAnswerStyle: {
                    backgroundColor: 'green'
                },
                counter: cnt,
                points: pts
            })
        } else {
            this.setState({
                isIncorrect: true,
                incorrectAnswerStyle: {
                    backgroundColor: 'red'
                },
                counter: cnt
            })
        }
    };


    render(){

        console.log(this.state.answers);
        console.log(this.state.correctAnswer);
        const arrayQuestions = this.state.questions.results;
        const questionToShow = arrayQuestions != undefined ? arrayQuestions[this.state.counter-1].question : '';




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
                                <h3>0:08</h3>
                            </div>
                        </div>
                        <div className="level-counter">
                            <div className="name">
                                <h3>Level</h3>
                            </div>
                            <div className="value">
                                <h3>{this.state.level} / 3</h3>
                            </div>
                        </div>
                    </div>
                    <div className="question">
                        <div className="question-frame">
                            <h3>{questionToShow}</h3>
                        </div>
                    </div>
                    <div className="answers">
                        <div className="answer-1"
                             onClick={event => this.handleClickAnswers(event, 0)}
                             style={this.state.isCorrect ? this.state.correctAnswerStyle : this.state.incorrectAnswerStyle}>
                            <h3>{this.state.answers[0]}</h3>
                        </div>
                        <div className="answer-2"
                             onClick={event => this.handleClickAnswers(event, 1)}
                             style={this.state.isCorrect ? this.state.correctAnswerStyle : this.state.incorrectAnswerStyle}>
                            <h3>{this.state.answers[1]}</h3>
                        </div>
                        <div className="answer-3"
                             onClick={event => this.handleClickAnswers(event, 2)}
                             style={this.state.isCorrect ? this.state.correctAnswerStyle : this.state.incorrectAnswerStyle}>
                            <h3>{this.state.answers[2]}</h3>
                        </div>
                        <div className="answer-4"
                             onClick={event => this.handleClickAnswers(event, 3)}
                             style={this.state.isCorrect ? this.state.correctAnswerStyle : this.state.incorrectAnswerStyle}>
                            <h3>{this.state.answers[3]}</h3>
                        </div>
                    </div>
                </section>
    }
}


export {Game};