import React, { Component} from 'react';
import { connect } from 'react-redux';
import 'jquery';
import 'materialize-css';
import {NavItem, Dropdown } from 'react-materialize';
import * as actions  from '../../actions';


class SurveyList extends Component {
    componentDidMount(){
        this.props.fetchSurveys();
    }

    deleteSurvey(){
        this.props.deleteSurvey(arguments[0]);
    }

    sortAscSurveys(){
        const surv = this.props.surveys.slice();
        this.props.sortAscSurveys(surv); 
    }

    sortDescSurveys(){
        const surv = this.props.surveys.slice();
        this.props.sortDescSurveys(surv); 
    }


    sortYesSurveys(){
        const surv = this.props.surveys.slice();
        this.props.sortYesSurveys(surv); 
    }

    renderSurveyNav(){
        if (this.props.surveys.length){
        return (
            <div>
                <div style = {{margin: '20px 0' }}>
                    <div>
                    <a  className="left grey-text text-darken-1 "
                    style = {{ fontSize: '1.5em' }}>Active surveys</a>
                    </div>
                    <div className=" right" >
                        <Dropdown className="right" options={{hover:true}} trigger={
                                <a
                                className="blue-grey lighten-5 btn-flat "
                                >Sort By</a>
                            }>
                            <NavItem onClick={this.sortAscSurveys.bind(this)}>Date Sent Asc</NavItem>
                            <NavItem divider />
                            <NavItem onClick={this.sortDescSurveys.bind(this)}>Date Sent Desc</NavItem>
                            <NavItem divider />
                            <NavItem  onClick={this.sortYesSurveys.bind(this)}>Yes Response</NavItem>
                        </Dropdown>
                    </div>
   
                </div>
                <br />
                <div style = {{margin: '20px 0' }} >
                    <hr />
                </div>
            </div>
        )
        }
        return (
        <div style={{textAlign: 'center', margin: '40px 0'}}>
        <h5>You currently do not have any surveys</h5>
        <p>To create new survey,  press the plus button at bottom right corner</p>
        </div>
        )
    }

    renderSurveys() {
       return this.props.surveys.reverse().map(survey => {
            return (
            <div key= {survey._id} className="card  blue-grey darken-1">
                <div className="card-content white-text ">
                  <span className="card-title ">{survey.title}</span>
                  <p>{survey.body}</p>
                  <p className="right" >
                    Sent on: {new Date(survey.dateSent).toLocaleDateString()}
                  </p>
                </div>
                <div className="card-action">
                  <a >Yes: {survey.yes}</a>
                  <a >No: { survey.no}</a>
                  <a href="#!"  
                    onClick={this.deleteSurvey.bind(this, survey._id )}
                    style = {{margin: '0 8px'}} 
                    className="right">
                    Remove Survey
                  </a>
                </div>
            </div>
            );
        });
    }

    render(){
        return(
            <div>
                {this.renderSurveyNav()}
                {this.renderSurveys()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { surveys: state.surveys };
}

export default connect(mapStateToProps, actions )(SurveyList);


/* renderSurveyNav(){
    return (

        <nav style = {{margin: '20px 0' }}>
            <div className="nav-wrapper blue-grey lighten-5 " >
                <a href="#!"  className="left grey-text text-darken-1 "
                style = {{margin: '0 0 0 15px', fontSize: '1.5em' }}>Active surveys</a>
          
                <div className="right " style = {{margin: '0 20px 0 0'}}>
                    <Dropdown options={{hover:true}} trigger={
                            <a
                            className="blue-grey lighten-5 btn-flat "
                            >Sort By</a>
                        }>
                        <NavItem onClick={this.sortAscSurveys.bind(this)}>Date Sent Asc</NavItem>
                        <NavItem divider />
                        <NavItem onClick={this.sortDescSurveys.bind(this)}>Date Sent Desc</NavItem>
                        <NavItem divider />
                        <NavItem  onClick={this.sortYesSurveys.bind(this)}>Yes Response</NavItem>
                    </Dropdown>
                </div>

            </div>
        </nav>

    )
} */