const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
//let config = require("../config");
const md5 = require("md5-node");
const { getRspBaseObj } = require("../utils/common");
const  userDB  = require("../model/userdb");
const debugLogger = require('../utils/logger.js');
const ini = require('../utils/ini.js')
const passport = require('../utils/cuspassport');

// 用户注册接口 添加用户
userRouter.post("/user/add", async function (req, res) {
  console.log('add user body',req.body)
  const r = await userDB.addUser(req.body);
  if (r.ok){
    debugLogger.debug(`web->user: add new user success`)
    rsp = getRspBaseObj()
  
  }else{
    debugLogger.warn(`web->user: fail to add new user`)
    rsp = getRspBaseObj({success:false,errCode:2,errMsg:r.result})
  }
  res.json(rsp);
});

// 查看所有用户
userRouter.get("/user/list", async function (req, res) {
  console.log(req.auth)
  const r = await userDB.getUser(req.auth);
  if (r.ok){
    debugLogger.warn(`web->user: list all user sucess`)
    rsp = getRspBaseObj()
    rsp.data = r.result
  }else{
    rsp = getRspBaseObj({success:false,errCode:2,errMsg:r.result})
  }
  res.json(rsp);
});

// 登录接口
userRouter.post("/user/login", async function (req, res) {
    console.log(req.body)
    let { username, passwd } = req.body;
    console.log(username,passwd)
    const r = await userDB.verifyUser(req.body);
    if (r.ok){
      debugLogger.warn(`web->user: verify ${username} and ${passwd} success`)

      //  let resultJSON = r.result.toJSON();
      //  let token = jwt.sign(resultJSON, config.Secret);
      // let token = jwt.sign(r.result, jwtkey,{ expiresIn: config.EXPIRESD });
      let signStr = jwt.sign(r.result, ini.jwtkey,{ expiresIn: ini.jwtexpire });

      rsp = getRspBaseObj()
      rsp.data = {
        token: `Bearer ${signStr}`,
        status: 'ok',
      }
    } else {
      msg = `web->user: verify ${username} and ${passwd} fail, due to ${r.msg}`
      debugLogger.warn(msg)
      rsp = getRspBaseObj({success:false,errCode:2,errMsg:r.msg})
  }
  res.json(rsp);
});

// 查询当前用户信息接口, 当前既然能到这里，说明中间件流程已经走完,其实可以简化
userRouter.get("/user/current", async function (req, res) {
  let result
  let msg
  console.log("进入路由页面",req.auth)
  result = getRspBaseObj({data:req.auth})
  res.json(result);
  // if ("authorization" in req.headers){
  //   let authorization = req.headers["authorization"];
  //   console.log("web: enter into the route, prepare to verify");
  //   let token = authorization.split(" ")[1];
  //   let vr = jwt.verify(token, jwtkey);
  //   msg = `web: current user is verified success,result=${JSON.stringify(vr)}`
  //   debugLogger.debug(msg)
  //  // let result = jwt.verify(token, config.Secret, { expiresIn: config.EXPIRESD });
  //   result = getRspBaseObj({data:vr})
  //   res.json(result);
  // }else{
  //   msg = `web: The current user req has no authorization`
  //   debugLogger.warn(msg)
  //   result = getRspBaseObj({success:false,errCode:110,errMsg:msg})
  //   res.status(401).send(result)
  // }
  
});

// 查询所有用户信息
userRouter.get("/user/account", async function (req, res) {
  let {current=1,pageSize=10,sorter,filter={},...query} = req.query;
  if(sorter){
    sorter = sorter ? JSON.parse(sorter) : {};
    for (const key in sorter) {
        sorter[key] = sorter[key] === 'ascend' ? 1 : -1;
    }
  }
  if(filter){
    filter = filter? JSON.parse(filter) : {};
    for (const key in filter) {
      if(filter[key]){
        query[key] = filter[key]
      }
   }
  }
  let total = await UserModel.countDocuments(query);
  let users = await UserModel.find(query).sort(sorter).skip((current-1)*pageSize).limit(Number(pageSize));
  let dataSource = users.map(item=>item.toJSON());
  const result = {
    data: dataSource,
    total,
    success:true,
    pageSize,
    current,
  }
  return res.json(result)
});

// 删除用户信息
userRouter.post("/user/del", async function (req, res) {
  let rsp
  const r = await userDB.delUser(req.body);
  if (r.ok){
    debugLogger.debug(`web->user: delete user ${req.body} success`)
    rsp = getRspBaseObj()
    rsp.data = r.result
  }else{
    debugLogger.warn(`web->user: fail to delete user ${req.body}`)
    rsp = getRspBaseObj({success:false,errCode:2,errMsg:r.result})
  }
  res.json(rsp);
});

// SSO, SAML2.0 LOGIN
// app.post(
//   "user/ssocb",
//   bodyParser.urlencoded({ extended: false }),
//   passport.authenticate("saml", {
//     failureRedirect: "/login",
//   }),
//   function (req, res) {
//     /* save session id of this login */
//     req.session.userSessID = req.sessionID;

//     res.redirect("/");
//   }
// );
// ssocb
userRouter.post("/user/ssocb",
  passport.authenticate("saml", {
  failureRedirect: "/user/login",}),
  async function (req, res) {
   console.log("ssocb",req.user) 
  // 这里写入db,无用户写入
    req.session.userSessID = req.sessionID;
    console.log(1111)
    const tmpRst = {
      username:req.user.username,
      "role":"rw",
    }
    let signStr = jwt.sign(tmpRst, ini.jwtkey,{ expiresIn: ini.jwtexpire });
    let signStr2 = `Bearer ${signStr}`
  //   rsp = getRspBaseObj()
  //   result = getRspBaseObj(
  //     {  success: true,
  //        errCode: 448,
  //        errMsg: "this is by design, not a error",
  //        data:{"ssoToken": signStr}
  //   })
  //   res.status(448).send(result);
  //res.redirect(`http://127.0.0.1:8000/hidessologin?ssotoken=${signStr2}`);
  res.redirect(`http://devtestplat.fortinet.com/hidessologin?ssotoken=${signStr2}`);

   // console.log(1112)


});

// ssologin
userRouter.get("/user/ssologin",
  passport.authenticate("saml", {
  failureRedirect: "/user/login",}),
  async function (req, res) {
   // console.log("ssologin",req) 

});

// ssologin
userRouter.get("/user/ssologout", function (req, res) {
 // res.redirect("https://10.106.48.17/saml-idp/kbfed7ox3nd4iu1z/logout/");
  console.log("here is callback about logout of call")
});


// app.get(
//   "user/ssologin",
//   passport.authenticate("saml", {
//     failureRedirect: "/user/login",
//   }),
//   function (req, res) {
//     /* save session id of this login */
//     req.session.userSessID = req.sessionID;

//     res.redirect("/");
//   }
// );



// 修改用户信息
userRouter.post("/user/chg", async function (req, res) {
  let rsp
  const r = await userDB.updateUser(req.body);
  if (r) {
    debugLogger.debug(`web->user: update user ${req.body} success`)
    rsp = getRspBaseObj()
  } else {
    debugLogger.warn(`web->user: fail to update user ${req.body}`)
    rsp = getRspBaseObj({success:false,errCode:2,errMsg:r.result})
  }
  res.json(rsp);
});

// 退出登录
userRouter.post("/user/logout", async function (req, res) {
  console.log('layoooo,这里应该写入环境绑定取消操作吗？')
 // result = getRspBaseObj({data:req.auth})
  if (req.auth.username === "user1"){
    console.log("here is test sso")
     res.redirect("https://10.106.48.17/saml-idp/kbfed7ox3nd4iu1z/logout/");
  }else{
    console.log("here is normal logout")
    result = getRspBaseObj()
    res.json(result);
  }
});


userRouter.get("/user/test", async function (req, res) {
  console.log('just test')
  result = getRspBaseObj()
  
  res.status(500).send(result)
//   result = getRspBaseObj()
//   res.json(result);
});


module.exports = {
  userRouter,
};
