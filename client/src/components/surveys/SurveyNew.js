// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component} from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade'
import { Flex } from 'rebass'
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { fetchDraft, clearDraft }  from '../../actions';

class SurveyNew extends Component {
     constructor(props) {
        super(props);

        this.state = {showFormReview: false};

        this.props.fetchDraft();
    } 
    //the above state initialization, could be replaced with just:
    //state = {showFormReview: false};

    
    componentWillUnmount(){
        this.props.clearDraft({clear: true});
        }

    renderContent() {
        if (this.props.DraftValues._id || this.props.DraftValues.noDraft ){

            if(this.state.showFormReview) {
                return <SurveyFormReview
                onCancel={() => this.setState({showFormReview: false })}
                />;
            }
            
            return <SurveyForm 
                onSurveySubmit={() => this.setState({showFormReview: true})}
            />;
        }
        //return <div>Loading...</div>
    }

    render () {
        return (
            <Flex justifyContent="center">
                <Fade top>
                    <div className="custom-survey_card custom-mt-20">
                        {this.renderContent()}
                    </div>
                </Fade>
            </Flex>
        );
    }
}
function mapStateToProps(state) {
    return { 
        DraftValues: state.formInit
    };
}

SurveyNew =  reduxForm({
    form: 'surveyForm'
})(SurveyNew);

SurveyNew = connect(mapStateToProps, {  fetchDraft, clearDraft } )(SurveyNew);

export default SurveyNew;
