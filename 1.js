function getRspBaseObj({success=true,data={},errCode=0,errMsg=""}={}){
    return {
        success,
        errorCode:errCode,
        errorMessage:errMsg,
        data,
    }
} 

a = getRspBaseObj(data=222)
console.log(a)
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiYmluZF9lbnYiOm51bGwsInJvbGUiOiJydyIsInByb2ZpbGUiOm51bGwsImlhdCI6MTY3NzE5NjY2OCwiZXhwIjoxNjc3MTk2Nzg4fQ.fZt1DmJefGpSIbjBXACB8VHvEqz-aPrkaOpwp7hpG-A
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiYmluZF9lbnYiOm51bGwsInJvbGUiOiJydyIsInByb2ZpbGUiOm51bGwsImlhdCI6MTY3NzE5NjQyMiwiZXhwIjoxNjc3MTk2NTQyfQ.0OQaNGbFtTqAJju0llRuTKxCWiJDZ-xgSGpECsOOXy8default)({}, "".concat(prefixCls, "-content-horizontal"), chartPlacement === 'left' || chartPlacement === 'right')); // 默认上下结构
