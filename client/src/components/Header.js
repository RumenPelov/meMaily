import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import Payments from './Payments';
import * as actions  from '../actions';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state =  {expand: false};
    }

    toggle = () => {
        this.setState({expand: !this.state.expand });
    }
    
    componentWillMount() {
        this.props.fetchUser(this.props.history);
    }

    logout = () => {
       this.props.logout(this.props.history);
    }
  
    renderContent(){
        switch (this.props.auth) {
            case null:
                return ;
            case false :
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default:
                return [
                    <li key='1' ><Payments btnClass="custom-btn custom-btn--green custom-inline"/></li>,
                    <li key='3' style = {{margin: '0 10px' }}>  Credits: {this.props.auth.credits} </li>,
                    <li key='2' ><a onClick={this.logout} href="#!">Logout</a></li>
                ];
        }
    }

    renderDropContent(){
        switch (this.props.auth) {
            case null:
                return ;
            case false :
                return (
                    <a  href="/auth/google" className="custom-nav_menu-item">Login With Google</a> 
                );
            default:
                return [
                    <button key='1' className="custom-nav_menu-item" onClick={()=>{}}><Payments btnClass="" /></button>,
                    <button key='3' className="custom-nav_menu-item" onClick={()=>{}}>Credits: {this.props.auth.credits} </button>,
                    <button key='2' className="custom-nav_menu-item" onClick={this.logout} >Logout</button> 
                ];
        }
    }

    render() {
        return (
        <div >
            <nav className="nav-wrapper deep-orange accent-4">
                <div className="container">
                    <div className="custom-nav ">
                    <Link style = {{margin: '0 10px' }}
                        to={this.props.auth ? '/surveys' : '/'}
                        className="custom-nav_logo"
                        >Emaily</Link>

                    <div className="hide-on-med-and-up custom-nav_menu" 
                         style = {{margin: '0 10px'}} 
                         onClick={this.toggle}>
                        <svg className="custom-nav_menu-icon" >
                            <use xlinkHref='sprite.svg#icon-menu'></use>
                        </svg> 

                        <div className={this.state.expand ? "custom-nav_menu-content custom-nav_menu-toggle" : "custom-nav_menu-content"}>
                            {this.renderDropContent()}
                        </div>
                    </div>

                    <ul id="" className="hide-on-small-and-down">
                        {this.renderContent()}
                    </ul>                          
                </div>      
                </div>
            </nav>
        </div> 
        )
    }
}

function mapStateToProps(state){
    return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(withRouter(Header));

