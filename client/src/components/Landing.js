import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Landing extends Component {
    renderContent(){
        switch (this.props.auth) {
            case null:
                return ;
            case false:
                return (
                    <div style={{textAlign: 'center'}}>
                    <h1>
                        Emaily!
                    </h1>
                    <p>Collect feedback from your users</p>
                    <p>Please Login to start sending emails </p>
                </div>
                );
            default:
            return  (
                <div style={{textAlign: 'center'}}>
                <h1>
                    Emaily!
                </h1>
                <p>Press  <Link
                style={{display: 'inline'}}
              to={this.props.auth ? '/surveys' : '/'}
               >here</Link> to start collecting feedbacks from your users</p>
                 
            </div>
            );
                
            
        }
    }

    render() {

        return (
            <div >
                {this.renderContent()}
            </div>
        )
    }
}

function mapStateToProps(state){
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Landing);