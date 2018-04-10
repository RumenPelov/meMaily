import _ from 'lodash';
import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({onCancel, formValues, submitSurvey,clearDraft, history}) => {
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
        await submitSurvey(formValues, history);
        clearDraft({delete:true});
    }

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button 
                className="yellow white-text darken-3 btn-flat"
                onClick={onCancel}
                >Back
            </button>
            <button 
                className="green white-text right btn-flat"
                onClick={submitSurveyReview}
                >Send Survey
                <i className="material-icons right">email</i>
            </button>
            </div>
    );
};

function mapStateToProps(state){
    return {
        formValues : state.form.surveyForm.values
    };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));

//() => submitSurvey(formValues, history)