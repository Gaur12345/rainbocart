function filters(f,d){

    let users = d;
    
    if((f.pCompanyName===null || f.pCompanyName.length===0) && 
    (f.productName===null || f.productName.length===0 ) && 
    (f.pCategory===null || f.pCategory.length===0)&&
    (f.pColor===null || f.pColor.length===0 ) &&
    (f.pSize===null || f.pSize.length===0 ) ){
      return users
    }else{
        
        users = users.filter(function(item) {
          for (var key in f) {
          let m = false;
          if(f[key]!==null){
            if(f[key].length===0)continue;
            else{

            for(let i=0;i<f[key].length;i++){
            if (item[key] !== undefined && item[key] === f[key][i].value)
              m=true;
            }
            if(m===false){
              return false;}
            else{
              m=false;
              }
          
            }
          }
        }
         return true
     });
     
     return users

     
     
   }
}

export default filters