export const checkPasswordGuidelines = (password) => {
    const capitalRage = /[A-Z]/
    const smallRegd = /[a-z]/
    const specialRegd = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    const digitRegd = /[0-9]/
    let returnObj = {
        returnCapital: false,
        returnSmall: false,
        returnSpecial: false,
        returnDigit: false,
        returnLength: false,
        returnErrorMsg:null
    }

    if (capitalRage.test(password)) {
        // return 'password most have atleast one capital characater'
        returnObj.returnCapital = true;
    }
    else {
        returnObj.returnErrorMsg='Password most have atleast one capital characater.'
        returnObj.returnCapital = false;
    }
    if (smallRegd.test(password)) {
        // return 'password most have atleast one small characater'
        returnObj.returnSmall = true;
    }
    else {
        returnObj.returnErrorMsg='Password most have atleast one small characater.'
        returnObj.returnSmall = false;
    }
    if (specialRegd.test(password)) {
        // return 'password most have atleast one special characater'
        returnObj.returnSpecial = true;
    }
    else {
        returnObj.returnErrorMsg='Password most have atleast one special characater.'
        returnObj.returnSpecial = false;
    }

    if (digitRegd.test(password)) {
        // return 'password must have atleast one digit'
        returnObj.returnDigit = true;
    }
    else {
        returnObj.returnErrorMsg='Password must have atleast one digit.'
        returnObj.returnDigit = false;
    }
    if (password.length >= 8) {
        // return 'password length must be atleast 8 character'
        returnObj.returnLength = true;
    }
    else {
        returnObj.returnErrorMsg='Password length must be atleast 8 character.'
        returnObj.returnLength = false;
    }

    return returnObj;


}

export const phoneGuidLines = (phoneNumber) =>{
    const startNumber = /[6-9]/
    
    let returnObj = {
        returnLengthNumber:false,
        returnStartNumber:false,
        returnErrorMsg:null
    }

    if(phoneNumber.length == 10){
        returnObj.returnLengthNumber =  true;
    }
    else{
        returnObj.returnErrorMsg = 'Mobile number should be length 10'
        returnObj.returnLengthNumber = false;
    }

    if(parseInt(phoneNumber.substring(0,1)) > 5){
        returnObj.returnStartNumber = true;
    }

    else{
        returnObj.returnErrorMsg = 'Mobile number must be start from  6 - 9'
        returnObj.returnStartNumber = false;
    }
     
    return returnObj;
}
export const pinCodeGuideLines = (pinCode) =>{
    
    let returnObj = {
        returnLengthNumber:false

    }

    if(pinCode.length == 6){
        returnObj.returnLengthNumber =  true;
    }
    else{
        returnObj.returnLengthNumber = false;
    }    
    return returnObj;
}
export const GstGuidelines = (gstNo)=>{
    let gstinformat = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$');

    return gstinformat.test(gstNo)
        
}