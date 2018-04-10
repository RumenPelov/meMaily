import _ from 'lodash';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';
import { fetchDraft }  from '../../actions';

class SurveyForm extends Component {
   

    saveDraft(){

        if (this.props.formValues){
            let {title, subject, body, recipients, from} = this.props.formValues;
            let data =  {title, subject, body, recipients, from};
           // console.log(data);
            this.props.fetchDraft(data);
        } 

    }

    renderFields() {

        return _.map(formFields , ({label, name}) => {
            let placeHolder = "";
            if (name ==='from'){
                placeHolder = "Leave blank for no-reply@emaily.com or enter your email";
            }
            return <Field key={name} 
                    label={label} type='text' 
                    name={name}
                    placeHolder={placeHolder}
                    component={ SurveyField } />   
        });
    }

    render () {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)} 
                >
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                    Cancel
                    </Link>

                    <button type='submit' className="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right" >done</i>
                    </button>

                    <a   className="teal lighten-1 btn-flat  white-text"
                     style = {{margin: '0 30px'}}
                     onClick={this.saveDraft.bind(this)}>
                    Save Draft
                    <i className="material-icons right" >backup</i>
                    </a>

                </form>

            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields , ({ name}) => {
        if (!values[name] && name!== 'from' ) {
            errors[name]=`You must provide ${name}`;
        }
        if (values[name] && name === 'from'){
            errors[name]=validateEmails(values[name], name);
        }
    });

    return errors;
}



function mapStateToProps(state) {
    //console.log(state);
    if (state.form.surveyForm){
        return { 
            initialValues: state.formInit,
            formValues : state.form.surveyForm.values
        };
    }
    return { 
        initialValues: state.formInit
    };
}

SurveyForm = reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);

SurveyForm = connect(mapStateToProps, {  fetchDraft } )(SurveyForm);

export default SurveyForm;

