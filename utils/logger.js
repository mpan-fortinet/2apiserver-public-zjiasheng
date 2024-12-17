const log4js = require('log4js');
const ini = require("../utils/ini");

const logConfig = {
    // 输出到控制台的内容，同时也输出到日志文件中
   // replaceConsole: true,
   appenders: {
     'mylogfiles': {
       type:'file',
       filename: ini.logfile,
       // filename: '1.log',
       maxLogSize: 10485760,
       backups: 3,
       compress: true,
       layout:{
        type: "pattern",
        pattern: "%d %p %m %x{user}%n",
        tokens:{
            user: function (logEvent) {
                lines = logEvent.callStack.split('\n')[0].split('/')
                return lines[lines.length-1];
              }
        }
       },
    },
    "myconsole": {
        type:"console",
        layout:{
         type: "pattern",
         pattern: "%d %p %m %x{user}%n",
         tokens:{
             user: function (logEvent) {

               // console.log(logEvent.callStack)
                lines = logEvent.callStack.split('\n')[0].split('/')
                //console.log(11111)
                //console.log(lines)
               // console.log(22222,lines.length)
                return lines[lines.length-1];
               }
         }
        },
     },
   },
   
    
   
   categories: {
     default: {
     appenders: ['mylogfiles','myconsole'],
   //appenders: ['myconsole'],

       level: 'debug',
       enableCallStack:true

     }
   },
  // disableClustering: true
 }
 log4js.configure(logConfig)
 const logger = log4js.getLogger()
 module.exports = logger