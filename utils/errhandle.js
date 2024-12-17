const { getRspBaseObj } = require("./common");
module.exports = function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      // 这个需要根据⾃自⼰己的业务逻辑来处理理
      result = getRspBaseObj(
        { 
           errCode:401,
           errMsg:"token verify fail"
      })
      res.status(401).send(result);
    } else {
      // res.locals.message = err.message;
      // res.locals.error = req.app.get("env") === "development" ? err : {};
      // res.status(err.status || 500);
      // res.render("error");
      result = getRspBaseObj(
        {  success: false,
           errCode: err.status || 500,
           errMsg: err.message
      })
      res.status(err.status || 500).send(result);
    }
  };