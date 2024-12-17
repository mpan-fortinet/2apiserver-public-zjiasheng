const moment = require('moment');
function getCurrentTime(){
    return moment().format("YYYY-MM-DD HH:mm:ss")
}

function compare(o,n){
    const f = {}
    Object.keys(n).forEach(function(nk){
        if (o.hasOwnProperty(nk)){
            if (o[nk] !== n[nk]){
                f[nk] = n[nk]
            }
        }
       // console.log(nk,n[nk])
    })
    return f
  
}

const a = {
    "a1":11,
    "b1":22,
    "c1":33
}
const b = {
  
    "b1":22,
    "c1":"33"
}

let c = compare(a,b)
console.log(c)
console.log(Object.keys(c).length)
function getRspBaseObj({success=true,data={},errCode=0,errMsg=""}={}){
    return {
        success,
        errorCode:errCode,
        errorMessage:errMsg,
        data,
    }
} 
module.exports = {
    getCurrentTime,
    getRspBaseObj
};
