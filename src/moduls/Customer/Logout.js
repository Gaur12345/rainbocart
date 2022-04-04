import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class Logout extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        sessionStorage.clear();
        localStorage.clear();
        return <Redirect to="/" />
    }
}

export default Logout;