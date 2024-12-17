const ini = require('iniparser');
const cfg = ini.parseSync('./conf/config.ini');

cfg.listenport = cfg.global.listenport
cfg.logfile = cfg.global.logfile
cfg.jwtkey = cfg.web.jwtkey
cfg.jwtexpire = cfg.web.jwtexpire
if (cfg.global.env === 'dev'){
   cfg.dbhost = cfg.devdb.dbhost
   cfg.dbname = cfg.devdb.dbname
   cfg.dbuser = cfg.devdb.dbuser
   cfg.dbpasswd = cfg.devdb.dbpasswd
   cfg.dbport = cfg.devdb.dbport
}else{
    cfg.dbhost = cfg.proddb.dbhost
    cfg.dbname = cfg.proddb.dbname
    cfg.dbuser = cfg.proddb.dbuser
    cfg.dbpasswd = cfg.proddb.dbpasswd
    cfg.dbport = cfg.proddb.dbport 
}
cfg.global.listenport = Number(cfg.global.listenport)
console.log(cfg)
module.exports = cfg