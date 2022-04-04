import Compressor from 'compressorjs';
var crypto =require('crypto-js');

export const encryptData = (data,key)=>
{
    let cipher=crypto.AES.encrypt(data,key).toString();
    console.log(cipher);
   return cipher;
}


export const decryptData = (data,key)=>
{
    let cipher=crypto.AES.decrypt(data,key).toString(crypto.enc.Utf8);
        console.log(cipher);
       return cipher;
}
export const getDateFormat = (dateValue)=>
{
    const dataMonth = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]

    let date = new Date(dateValue);
    let finalDate = `${dataMonth[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`;
    return finalDate;
}

export const compressImage= async (image)=>{
   let compressImageReturn ='';
    new Compressor(image, {
        
        quality: 0.1, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server. 
           var image = new Image();
           compressImageReturn =  URL.createObjectURL(compressedResult);
        //   console.log("image Compressed",URL.createObjectURL(compressedResult));
          console.log("Compressed",compressImageReturn);
          
        }
        
    } );
    return compressImageReturn;         
}
export const getCaptcha = ()=>
{
    let chars = "0123456789ABCDEFGHJKMNOPQRSTUVWXTZabcdefghkmnopqrstuvwxyz";
    var string_length = 7;
    var randomstring = '';

    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }

       return randomstring;
}
export const generateOTP = ()=>{

        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
}