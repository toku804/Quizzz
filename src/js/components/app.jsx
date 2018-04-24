import React from 'react';
import {Welcome} from "./welcome.jsx";
import {Over} from "./over.jsx";


class App extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return <div>
            <Welcome/>
            <Over/>
        </div>
    }
}

export {App};