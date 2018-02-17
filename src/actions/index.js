import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POSTS = 'create_posts';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';



const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const APP_KEY = '?key=MATIASCP123456' 


export function fetchPosts() {    
    const request = axios.get(`${ROOT_URL}/posts${APP_KEY}`);
    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function createPosts(values, callback) {    
    // after we have a request response we call the callback funtion
    // passed as parameter (the funcion is passed as a parameted, here we
    // we only do the call after the request is done).
    const request = axios.post(`${ROOT_URL}/posts${APP_KEY}`, values)
        .then(() => callback());
    return {
        type: CREATE_POSTS,
        payload: request
    };
}

export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}${APP_KEY}`);

    return {
        type: FETCH_POST,
        payload: request
    };
}

export function deletePost(id, callback) {    
    const request = axios.delete(`${ROOT_URL}/posts/${id}${APP_KEY}`)
        .then(() => callback());

    return {
        type: DELETE_POST,
        payload: id
    };
}