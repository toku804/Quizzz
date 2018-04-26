import React from 'react';
import {
    Link,
} from 'react-router-dom';


class Over extends React.Component {
    render(){

        return <section className="game-over">
                    <div className="score-info">
                        <h2>Game Over!</h2>
                        <h3>Your score: <span>{this.props.match.params.points}</span></h3>
                    </div>
                    <div className="replay">
                        <h3>Wanna play again?</h3>
                        <Link to={'/welcome'}>Sure!</Link>
                    </div>
                </section>
    }
}

export {Over};