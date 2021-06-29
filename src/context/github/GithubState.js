import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './GithubContext';
import githubReducer from './GithubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const AUTH = `client_id=${githubClientId}&client_secret=${githubClientSecret}`;

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState);

    // Search Github users
    const searchUsers = async text => {
        setLoading();

        const res = await axios.get(`https://api.github.com/search/users?q=${text}&${AUTH}`);

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
    }

    // Get single Github user
    const getUser = async (username) => {
        setLoading();

        const res = await axios.get(`https://api.github.com/users/${username}?${AUTH}`);

        dispatch({
            type: GET_USER,
            payload: res.data
        })
    }

    // Get user's repo
    const getUserRepos = async (username) => {
        setLoading();

        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${AUTH}`);

        dispatch({
            type: 'GET_REPOS',
            payload: res.data
        })
    }

    // Clear users from state
    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    // Set loading
    const setLoading = () => dispatch({ type: SET_LOADING });


    return <GithubContext.Provider value={{ users: state.users, user: state.user, repos: state.repos, loading: state.loading, searchUsers, clearUsers, getUser, getUserRepos }}>
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;