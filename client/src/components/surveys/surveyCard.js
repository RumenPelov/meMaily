import React, { Component} from 'react';
import { connect } from 'react-redux';

import * as actions  from '../../actions';

class SurveyCard extends Component {

    deleteSurvey(){
        this.props.deleteSurvey(arguments[0]);
    }

    render(){
        const survey = this.props.survey; 
        return(
            <div className="custom-card">
                <div className="custom-card__content">
                    <div className="custom-card__content-title">
                        <div className="custom-card__content-left">Title:</div>
                        <div className="custom-card__content-right custom-text-2">{survey.title}</div>
                    </div>
                    <div className="custom-card__content-qtn">
                        <div className="custom-card__content-left">Question:</div>
                        <div className="custom-card__content-right custom-text">{survey.body}</div>
                    </div>
                    <div className="custom-card__content-subject">
                        <div className="custom-card__content-left">Subject:</div>
                        <div className="custom-card__content-right">{survey.subject}</div>
                    </div>
                    <div className="custom-card__content-subject">
                        <div className="custom-card__content-left">Date sent:</div>
                        <div className="custom-card__content-right">{new Date(survey.dateSent).toLocaleDateString()}</div>
                    </div>
                    
                </div>
                <div className="custom-card__action">
                    <div className="custom-card__action-left">
                        <div className="custom-card__action-votes">YES: {survey.yes}</div>
                        <div className="custom-card__action-votes">NO: {survey.no}</div>
                    </div>
                    <button className="custom-card__action-right custom-btn custom-btn--orange-2"
                            onClick={this.deleteSurvey.bind(this, survey._id )}>
                        Delete Survey
                    </button>
                </div>
            </div>
        );
    }

}

export default connect(null, actions )(SurveyCard);