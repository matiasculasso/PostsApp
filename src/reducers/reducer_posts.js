import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function (state = {}, action)  {
    switch (action.type)
    {
        case DELETE_POST:
            // this method removes the property of the state object if exists
            // in the delete method the payload is the id of the deleted post 
            _.omit(state, action.payload)
        case FETCH_POSTS:   
            // maps an array to an object using the id in this case as the property name          
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_POST:             
            // this ES6 sintax adds to the state object a new properity
            // with the property id equal to action.payload.data.id and
            // the value is the action.payload.data object.
            return { ...state, [action.payload.data.id]: action.payload.data };
        default: 
            return state;
    }
}