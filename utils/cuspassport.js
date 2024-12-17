const passport = require('passport');
const passportSaml = require('passport-saml');
var fs = require("fs");

function getCertData(){
    let certFile = './conf/idp.pem'
    let orgdata = fs.readFileSync(certFile).toString();
    let newdatalist = []
    const linelist = orgdata.split('\n')
    linelist.forEach(line => {
       // console.log(line,line.indexOf("CERTIFICATE-") >= 0)
        if (line.length > 1 && (line.indexOf("CERTIFICATE-") === -1)){
           newdatalist.push(line)
        }
    });

    return newdatalist.join('')
}

var certData = getCertData()
passport.serializeUser((user, done) => {
   // console.log("serialze...",user)
    done(null, user);
  });
  
passport.deserializeUser((user, done) => {
  //  console.log("de serialze...",user)
    done(null, user);
  });

const strategy = new passportSaml.Strategy(
    {
        entryPoint: "https://10.106.48.17/saml-idp/kbfed7ox3nd4iu1z/login/",
        issuer: "http://10.106.48.17/saml-idp/kbfed7ox3nd4iu1z/metadata/",
        callbackUrl: "https://devtestplat.fortinet.com:8000/api/user/ssocb",
        cert: certData,
    },
    (profile, done) => {
       // console.log('profile',profile)
        done(null, profile)
    },
);
passport.use(strategy);
module.exports = passport;

