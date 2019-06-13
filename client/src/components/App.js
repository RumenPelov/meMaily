import React, { Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Landing from './Landing';
import Dashboard  from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {

    render() {
        return(
            <BrowserRouter>
                <div >
                    <Header />
                    <div className="custom-image">
                        <div className="container">
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/surveys" component={Dashboard} />
                            <Route path="/surveys/new" component={SurveyNew} />
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
};

export default App;

