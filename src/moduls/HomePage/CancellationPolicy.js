import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import CancellationPolicyComponent from '../../common/CancellationPolicy/CancellationPolicy';

class CancellationPolicy extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
       return(

        <div>

            <CancellationPolicyComponent />
        </div>
       )
    }
}

export default CancellationPolicy;