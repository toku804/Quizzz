import React from 'react';
import {Welcome} from "./welcome.jsx";


class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <Welcome/>
        </div>
    }
}

export {App};