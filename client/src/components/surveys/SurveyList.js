import React, { Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Fade from 'react-reveal/Fade'
import { Flex } from 'rebass'
import * as actions  from '../../actions';

import SurveyCard from './surveyCard';
import DropdownInput from './DropdownInput';


class SurveyList extends Component {
 
    componentDidMount(){
            this.props.fetchSurveys(); 
    }

    sortAscSurveys = () => {
        const surv = this.props.surveys.slice();
        this.props.sortAscSurveys(surv); 
    }

    sortDescSurveys = () => {
        const surv = this.props.surveys.slice();
        this.props.sortDescSurveys(surv); 
    }

    sortYesSurveys = () => {
        const surv = this.props.surveys.slice();
        this.props.sortYesSurveys(surv); 
    }

    renderSurveyNav(){

        const items =  [{text:'Date Sent Asc', fn: this.sortAscSurveys},
                        {text:'Date Sent Desc', fn: this.sortDescSurveys},
                        {text:'Yes Response', fn: this.sortYesSurveys}]
       
        if (this.props.surveys.length){
            return (
                <div >
                    <div className="custom-group-buttons custom-mt-15" >
                        <div>
                            <h5 className=" grey-text text-darken-1 custom-margin-none">Active surveys</h5>
                        </div>
                       <div style = {{flex: '1' }}> </div>
                       <Link to={'/surveys/new'} className="custom-btn custom-btn--grey-1">
                                    New survey
                                </Link>
                        <DropdownInput items={items} placeholder="Sort by" />    
                    </div>
                   
                    <div style = {{margin: '20px 0' }} >
                        <hr />
                    </div>
                </div>
            )
        }

        return (
            <div className="custom-landing_card">
                <h5 className="custom-text custom-mt-20">You currently do not have any surveys</h5>
                <Link className="custom-btn custom-btn--grey custom-my-20 "
                        to = "/surveys/new" >
                    Create survey &rarr;
                </Link>
            </div>
        )
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <SurveyCard key={survey._id} survey={survey} />
            );
        });
    } 

    render(){
        const length = this.props.surveys.length;

        return(
            <Flex justifyContent="center">
                <Fade bottom>
                    <div className={ length ? "custom-survey_card custom-mt-40" : "custom-pos-relative "}>
                        {this.renderSurveyNav()}
                        {this.renderSurveys()}
                    </div>
                </Fade>
            </Flex>
        );
    }
}

function mapStateToProps(state) {
    return { 
            surveys: state.surveys
        };
}

export default connect(mapStateToProps, actions )(SurveyList);

