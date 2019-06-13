import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, INIT_DRAFT } from "./types";

const dateToNumber = (str) => {
    let value = str.slice(0,16).split('').filter(char => char!=='-' && char!=='T' && char!==':' ).join('');
    return parseInt(value, 10);
}

export const fetchUser = (history) => {
    return async function(dispatch) {
       const res = await axios.get('/api/current_user')
       
       if(!res.data._id){
            history.push('/');
       }
       dispatch({type: FETCH_USER, payload: res.data});
    }
}

export const logout = (history) => {
    return async function(dispatch) {
       const res = await axios.get('/api/logout');
       
       history.push('/');
       dispatch({type: FETCH_USER, payload: res.data});
    }
}

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    
    dispatch({type: FETCH_USER, payload:res.data})
} 

export const submitSurvey = (values, history) => async dispatch => {
    
    //return { type: 'submit_survey'};
    const res = await axios.post('/api/surveys', values);
    
    history.push('/surveys');
    dispatch({type: FETCH_USER, payload:res.data})
} 

export const fetchSurveys = () => async dispatch => {

    const res = await axios.get('/api/surveys');
    
    dispatch({type: FETCH_SURVEYS, payload:res.data});
} 

export const sortDescSurveys = (surveys) =>  {
    
   // [...surveys].reverse();
    surveys.sort((a,b) => {
        return dateToNumber(a.dateSent) - dateToNumber(b.dateSent);
    });

    return {type: FETCH_SURVEYS, payload: surveys};
} 
export const sortAscSurveys = (surveys) =>  {
    
    // [...surveys].reverse();
     surveys.sort((a,b) => {
         return -(dateToNumber(a.dateSent) - dateToNumber(b.dateSent));
     });
 
     return {type: FETCH_SURVEYS, payload: surveys};
 } 

export const sortYesSurveys = (surveys) =>  {
    
    // [...surveys].reverse();
     surveys.sort((a,b) => {
         return a.yes - b.yes;
     });
 
     return {type: FETCH_SURVEYS, payload: surveys};
 }

export const deleteSurvey = (id) => async dispatch => {
    
    const res = await axios.post('/api/surveys/delete', {id});
    
    dispatch({type: FETCH_SURVEYS, payload:res.data});
} 

export const fetchDraft = (values) => async dispatch => {

    if(!values){
        const res = await axios.get('/api/surveys/draft');

        dispatch({type: INIT_DRAFT, payload: res.data});
    } else {
        const res = await axios.post('/api/surveys/draft', values);
   
        dispatch({type: INIT_DRAFT, payload: res.data});
       
    }
}

export const clearDraft = (obj) => async dispatch => {

    if(obj.clear) {
        dispatch({type: INIT_DRAFT, payload: {}});
    }

    if(obj.delete){

        await axios.post('/api/surveys/draft/delete', {});

        dispatch({type: INIT_DRAFT, payload: {}});
    }
    
}