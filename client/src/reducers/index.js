import { combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import {fetchDraftReducer, fetchInitReducer} from './formInitReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer,
    draft: fetchDraftReducer,
    formInit: fetchInitReducer
})