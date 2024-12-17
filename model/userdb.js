const { Sequelize, DataTypes } = require('sequelize');
const md5 = require("md5-node")
//const moment = require('moment');
const {getCurrentTime} = require('../utils/common.js');
const sequelize = require('./db.js');
const debugLogger = require('../utils/logger.js');


const PlantformUser = sequelize.define('platform_user', {
  // 在这里定义模型属性
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  passwd: {
    type: DataTypes.STRING,
    // allowNull 默认为 true
    allowNull: false,
  },
  bind_env: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.STRING,
    // allowNull 默认为 true
    allowNull: false
  },
  profile: {
    type: DataTypes.JSON
  },
  createdat: {
    type: DataTypes.STRING,
 //   type: DataTypes.DATE,
    allowNull: false
  },
  updatedat: {
    type: DataTypes.STRING,
  //  type: DataTypes.DATE,
    allowNull: false
  },
  userdesc: {
    type: DataTypes.TEXT
  }
}, {
  // 这是其他模型参数
  freezeTableName: true,
 // timestamps: true
});


async function getUser(auth){
  let result
  let msg
  let where 
  if (auth.role === "admin"){
     where = {}
  }else{
     where = {username: auth.username}
  }
  try{
    result = await PlantformUser.findAll({
      where,
      attributes: ['username', 'role','bind_env','profile','createdat','updatedat','userdesc'],
      raw: true
    })
    if (result){
      msg = "db->user: get the user success"
      debugLogger.debug(msg)
      return {ok:true,result}
    }else{
      msg = "db->user: failed to get users,due to unknown result"
      debugLogger.warn(msg)
      return {ok:false,result:msg}
    }
  }catch(e){
    msg = `db-> user: meet error during the query the user due to ${e}`
    debugLogger.error(msg)
    return {ok:false,result:msg}
  }
}
async function addUser(ob){
  ob.updatedat = getCurrentTime()
  ob.createdat = ob.updatedat
  try{
    ob.passwd = md5(ob.passwd)
    const r = await PlantformUser.create(ob)
    debugLogger.debug("db -> user: add new user sucess")
    return {ok:true}
  }catch(e){
    msg = `db-> user: meet error during the add the user due to ${e}`
    debugLogger.error(e)
    return {ok:false,result:msg}
  }
}

async function verifyUser(ob){
  try{
    const vr = await PlantformUser.findOne({
      attributes: ['username', 'bind_env','role','profile'],
      where:{
        username: ob.username,
        passwd: md5(ob.passwd)
      },
      raw: true
    })
    if (vr){
      const msg = "db->user: verify success"
      debugLogger.debug(msg)
      return {ok:true,result:vr}
    }else{
      const msg = "db->user: verify fail"
      debugLogger.warn(msg)
      return {ok:false,msg}
    }
  }catch(e){
    const msg = `db->user: error appear during verify, the reason is ${e.toString()}`
    debugLogger.error(msg)
    return {ok:false,msg}
  }
}

async function updateUser(ob){
  ob.updatedat = getCurrentTime()
  if (ob.hasOwnProperty("passwd")){
    ob.passwd = md5(ob.passwd)
  }
  try{
    const us = await PlantformUser.update(ob,{
      where:{
        username: ob.username
      }
    })
    const msg = `db->user: update the user ${ob.username} success`
    debugLogger.debug(msg)
    return {ok:true,msg}
  }catch(e){
    const msg = `db->user: error appear during update  ${ob.username} due to ${e.toString()}`
    debugLogger.error(msg)
    return {ok:false,msg}
  }
}

async function delUser(ob){
  try{
    // const user22 = await PlantformUser.findOne({ username: ob.username});
    // console.log(user22)
    // console.log(22222)
    // us = user22.destroy()
    await PlantformUser.destroy({
      where:{
        username:ob.username
      }
    })
    const msg = `db->user: delete ${ob.username} sucess`

    debugLogger.debug(msg)
    return {ok:true,result:msg}
   // const us = await PlantformUser.destory(ob)
  }catch(e){
    const msg = `db->user:  meet error when remove user due to ${e.toString()}`
    debugLogger.error(msg)
    return {ok:false,result:msg}
  }
}

// `sequelize.define` 会返回模型
const data = {
    username: "admin",
    passwd: "fortinet",
    //bind_env: "lab2",
    role: "admin",
   // createat: "2011-02-22 11:22:44",
   // updateat: "2011-02-22 11:22:45",
    userdesc: "this is super admin"
}
//console.log(getCurrentTime())
//addUser(data)
//verifyUser(data)
//updateUser(data)
//console.log(moment().format("YYYY-MM-DD HH:mm:ss"))
//getUser()
//deleteUser(data)

module.exports = {
  getUser,
  verifyUser,
  addUser,
  delUser,
  updateUser
}


