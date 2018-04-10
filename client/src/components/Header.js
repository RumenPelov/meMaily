import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import 'jquery';
import 'materialize-css';
import {NavItem, Dropdown } from 'react-materialize';

import Payments from './Payments';

class Header extends Component {
  
    renderContent(){
        switch (this.props.auth) {
            case null:
                return ;
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default:
            return [
            <li key='1' ><Payments btnClass="btn"/></li>,
            <li key='3' style = {{margin: '0 10px' }}>  Credits: {this.props.auth.credits} </li>,
            <li key='2'><a href="/api/logout" >Logout</a></li>
            ];
                
            
        }
    }

    renderDropContent(){
        switch (this.props.auth) {
            case null:
                return ;
            case false:
                return (
                    <NavItem href="/auth/google">Login With Google</NavItem> 
                );
            default:
            return [
            <NavItem key='1' ><Payments btnClass="" /></NavItem>,
            <NavItem  key='3' >Credits: {this.props.auth.credits} </NavItem>,
            <NavItem key='4' divider />,
            <NavItem  key='2' href="/api/logout" >Logout</NavItem> 
            ];
                
            
        }
    }

    render() {

        return (
        <div>
            <nav>
            <div className="nav-wrapper">
                <Link style = {{margin: '0 10px' }}
                    to={this.props.auth ? '/surveys' : '/'}
                    className="left brand-logo"
                    >Emaily</Link>

                <div className="right hide-on-med-and-up" style = {{margin: '0 20px'}}>
                    <Dropdown options={{hover:true}} 
                        trigger={
                        <a type="text"
                        className=""><i className="material-icons">menu</i></a>
                        }>
                        {this.renderDropContent()}
                    </Dropdown>
                </div>
        
                <ul id="nav-mobile" className="right hide-on-small-and-down">
                    {this.renderContent()}
               
                </ul>
            </div>

           
            </nav>
        </div> 
        )
    }
}

function mapStateToProps(state){
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);

