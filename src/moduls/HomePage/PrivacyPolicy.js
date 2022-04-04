import React, { Component } from "react";
import PrivacyPolicyComponent from "../../common/PrivacyPolicy/PrivacyPolicy.js";


class PrivacyPolicy extends Component
{
    constructor(props)
    {
        super(props);

        this.state={
          
        }
    }


    render() {
        return(
            <div>
                <PrivacyPolicyComponent />
            </div>
        )
    }

}

export default PrivacyPolicy;