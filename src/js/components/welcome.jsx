import React from 'react';
import {
    Link,
} from 'react-router-dom';

import {urls} from './categories.js'

class Welcome extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            category: '',
            clickedStyle: {},
            clickedBox: -1,
            questions: {}
        }
    }

    handleClickCategory = (event,i) => {
        const clickedCat = urls[i];
        this.setState({
            category: clickedCat.url,
            clickedStyle: {
                backgroundColor: '#31263E',
                border: '3px solid white'
            },
            clickedBox: i,
            categoryName: clickedCat.nameCategory
        });
    };

    render(){
        const boxes = urls.map( (elem,i) => {
            return  <div style={ i === this.state.clickedBox ? this.state.clickedStyle : {} }
                         key={i}
                         onClick={e=> this.handleClickCategory(e,i)}
                         className="category">{elem.nameCategory}
             </div>
        });

        return <section className="welcome-screen">
                    <div className="title">
                        <h1>Quizzz</h1>
                    </div>
                    <div className="instruction">
                        <h3>Please choose your category:</h3>
                    </div>
                    <div className="categories">
                        {boxes}
                    </div>
                    <div className="start">
                        <Link to={`/game/${this.state.categoryName}`}>Start game!</Link>
                    </div>
                </section>
    }
}

export {Welcome};