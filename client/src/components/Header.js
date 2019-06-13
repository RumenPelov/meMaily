import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import 'jquery';
import 'materialize-css';
import {NavItem, Dropdown } from 'react-materialize';

import Payments from './Payments';
import * as actions  from '../actions';

class Header extends Component {
    
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
                    <NavItem  href="/auth/google">Login With Google</NavItem> 
                );
            default:
            return [
            <NavItem key='1' onClick={()=>{}}><Payments btnClass="" /></NavItem>,
            <NavItem key='3' onClick={()=>{}}>Credits: {this.props.auth.credits} </NavItem>,
            <NavItem key='4' divider />,
            <NavItem  key='2' onClick={this.logout} >Logout</NavItem> 
            ];
                
            
        }
    }


    render() {

        return (
        <div >
            <nav className="nav-wrapper deep-orange accent-4">
                <div className="container">
                    <div className="nav-wrapper ">
                    <Link style = {{margin: '0 10px' }}
                        to={this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo"
                        >Emaily</Link>

                    <div className="right hide-on-med-and-up" style = {{margin: '0 20px'}}>
                        <Dropdown options={{hover:true}} 
                            trigger={
                            <a href="#!" type="text">
                                <i className="material-icons">menu</i>
                            </a>
                            }>
                            {this.renderDropContent()}
                        </Dropdown>
                    </div>
            
                    <ul id="nav-mobile" className="right hide-on-small-and-down">
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

