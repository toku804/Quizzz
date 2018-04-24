import React from 'react';


class Over extends React.Component {
    render(){
        return <section className="game-over">
                    <div className="score-info">
                        <h2>Game Over!</h2>
                        <h3>Your score: <span>22</span> / <span>30</span></h3>
                    </div>
                    <div className="replay">
                        <h3>Wanna play again?</h3>
                        <button>Sure!</button>
                    </div>
                </section>
    }
}

export {Over};