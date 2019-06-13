import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {

        return(
            <StripeCheckout 
            name="Emaily"
            description="5$ for 5 emails use card 4242 4242 4242 4242"
            amount={500}
            token={token => this.props.handleToken(token)}
            stripeKey= 'pk_test_fj0Fh1kxVNIXo8KVnx0GFRGv'
        >
        <div className={this.props.btnClass}>
            Add Credits
        </div>
        </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);

