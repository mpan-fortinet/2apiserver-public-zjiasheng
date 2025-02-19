const createError = require("http-errors");
const http = require("http");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
var cookieParser = require('cookie-parser')
var session = require('express-session');

const expressJWT= require("express-jwt");
const passport = require('./utils/cuspassport');

//const config = require("./config");
const { userRouter } = require("./web/user");
const { cloudRouter } = require("./web/cloud");
const { getRspBaseObj } = require("./utils/common");
const  errhandle = require("./utils/errhandle")
const ini = require("./utils/ini");
// 处理post请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'assetManagement',       
  cookie: {maxAge: 12*60*60*1000},  //定义session失效时间
  // rolling: true,
  // resave: true,
  // saveUninitialized: false
}));

// 打印日志
app.use(morgan("dev"));
// 处理跨域
app.use(cors());
//app.options("*", cors())  //将失败
// 使用cookie
// app.use(cookieParser());
//app.use("/api", userRouter);
// 校验token，获取headers⾥里里的Authorization的token，要写在路由加载之前，静态资源之后
// app.use(expressJWT({
//     secret: jwtkey,
//     //secret: config.Secret,
//     algorithms: ["HS256"],
//     credentialsRequired: true
//   }).unless({
//     path: ["/api/user/login","api/user/test"]
//    //path: ["/api/user/current", "/api/user/login"]
//    //path: ["/api/user/current"]
//   })
// );

// app.use(
//   expressJWT.expressjwt({ secret: ini.jwtkey, algorithms: ["HS256"] }).unless({
//     path: ["/ws","/favicon.ico","/api/user/login","/api/user/test","/api/user/ssologin","/api/user/ssologout","/api/user/ssocb"],
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api", userRouter);
app.use("/v1", cloudRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errhandle)
// app.use(function (err, req, res, next) {
//   if (err.name === "UnauthorizedError") {
//     // 这个需要根据⾃自⼰己的业务逻辑来处理理
//     result = getRspBaseObj(
//       { 
//          errCode:401,
//          errMsg:"token verify fail"
//     })
//     res.status(401).send(result);
//   } else {
//     // res.locals.message = err.message;
//     // res.locals.error = req.app.get("env") === "development" ? err : {};
//     // res.status(err.status || 500);
//     // res.render("error");
//     result = getRspBaseObj(
//       {  success: false,
//          errCode: err.status || 500,
//          errMsg: err.message
//     })
//     res.status(err.status || 500).send(result);

//   }
// });

const server = http.createServer(app)
//app.listen(ini.global.listenport, function () {
//   console.log("服务在8000启动了");
// });
// var privateCrt = fs.readFileSync("./conf/server.pem", 'utf8');
// var privateKey = fs.readFileSync("./conf/server.key", 'utf8');
// const HTTPS_OPTOIN = {
//   key: privateKey,
//   cert: privateCrt
// };
// const server = https.createServer(HTTPS_OPTOIN, app);

module.exports = server;
