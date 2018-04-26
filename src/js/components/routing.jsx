import React from 'react';
import {App} from "./app.jsx";
import {Welcome} from "./welcome.jsx";
import {Game} from "./game.jsx";
import {Over} from "./over.jsx";
import {NotFound} from "./notFound.jsx";
import {
    HashRouter,
    Route,
    Switch,
} from 'react-router-dom';


const Routing = () => {
    return  <HashRouter>
        <div>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/welcome' component={Welcome}/>
                <Route path='/game/:cat' component={Game}/>
                <Route path='/over/:points' component={Over}/>
                <Route path='*' component={NotFound} />
            </Switch>
        </div>
    </HashRouter>;
};

export {Routing}