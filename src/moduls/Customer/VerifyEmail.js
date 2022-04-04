import React, { Component, useEffect, useReducer, useRef, useState } from 'react';
import axios from 'axios';

import { Redirect ,useHistory} from 'react-router-dom';

const VerifyEmail = () =>
{

    const history = useHistory();


    useEffect(()=>{


        let emailRec = localStorage.getItem("EmailStorageOne");
       

        if(localStorage.getItem("EmailStorageOne") !=null && localStorage.getItem("EmailStorageOne") !=undefined && localStorage.getItem("EmailStorageOne") !="")
        {
             axios.post("https://backend.we-matter.net/verifyClient",{emailId : emailRec}).
           // axios.post("https://clientback.wematter.co.in/verifyClient",{emailId : emailRec}).
            then(Response=>{

                if(Response.data === "userVerify")
                {
                    history.push("/ClientLogin")
                }
                else
                {
                    console.log("email False email is ",localStorage.getItem("EmailStorageOne"));
                }

            })
            .catch(error=>{


                alert(error);

            })
        }
        else
        {
            console.log("email Else not OUT ",localStorage.getItem("EmailStorageOne"));
        }


    },[])


    return(

        <div>

                <h1></h1>

        </div>


    )
}




export default VerifyEmail;