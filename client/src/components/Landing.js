import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Landing extends Component {

    renderContent(){;
        switch (this.props.auth) {
            case null:
                return ;
            case false :
                return (
                <div >
                    <h3>
                        Emaily
                    </h3>
                    <h6 className="custom-line">Fast and easy way to collect feedback from your clients</h6>
                    <h6 className="custom-line">Login to start sending surveyes</h6>
                    <a className="custom-btn  custom-btn--grey  custom-my-20 " href="/auth/google">Login With Google</a>
                </div>
                );
            default:
                return  (
                    <div  >
                    <h5 className="custom-mt-20"> Welcome to Emaily! </h5>
                    <h6 className="custom-mt-10 custom-line">You are now ready to start collecting feedbacks </h6>
                    <Link className="custom-btn  custom-btn--grey custom-my-20 "
                        to={this.props.auth ? '/surveys' : '/'}>Next step &rarr;</Link>
                     
                </div>
                );
        }
    }


    render() {

        return (
            <div  className="custom-landing_card">
                {this.renderContent()}
            </div>
        )
    }
}

function mapStateToProps(state){
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Landing);