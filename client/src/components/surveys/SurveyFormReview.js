import _ from 'lodash';
import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({onCancel, formValues, submitSurvey,clearDraft, history, credits}) => {
    const reviewFields = _.map(formFields, ({name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {name !== 'from' ? formValues[name]: formValues[name] ? formValues[name]: 'no-reply@emaily.com' }
                </div>
            </div>
        );

    })

    const submitSurveyReview = async () =>{
        if(credits > 0) {
            await submitSurvey(formValues, history);
            clearDraft({delete:true});
        } else {
            window.alert("You need credits");
        }
    }

    const renderNoCreditsAlarm = () => {
        if (credits === 0) {
            return <div className="custom-alarm-text">You have 0 credits left!</div>  
        } 
    }

    return (
        <div>
            <h5>Please confirm your entries</h5>
            <div>
                {reviewFields}
            </div>
            <div className="custom-mt-30 custom-mb-20 custom-group-buttons">
                <button 
                    className=" custom-btn  custom-btn--orange"
                    onClick={onCancel}
                    > &larr; Back
                </button>   
                {renderNoCreditsAlarm()}                
                <button disabled={credits === 0}
                    className=" custom-btn custom-btn--green-2 custom-align-center"
                    onClick={submitSurveyReview}
                    >
                    <span>Send Survey</span> 
                    <i className="material-icons right custom-icon">email</i>
                </button>
            </div>
        </div>
    );
};

function mapStateToProps(state){
    return {
        formValues : state.form.surveyForm.values,
        credits: state.auth.credits
    };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));

//() => submitSurvey(formValues, history)