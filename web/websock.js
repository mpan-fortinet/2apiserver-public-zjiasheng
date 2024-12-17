const ws = require("ws");
const spawn = require('child_process').spawn

const wsObj= new ws.Server({ noServer: true })

wsObj.on("connection", (conn,envIp) => {
    let spawnOjb
    console.log("新的客户端连接 chatWS进行处理");
    conn.on("error",(error)=>{
        console.log("ws conn meet error",error)
        if (spawnOjb != undefined){
            spawnOjb.kill()
            spawnOjb = undefined    
        }
        conn.close()
    })

    conn.on("close",()=>{
        console.log("ws conn meet close")
        if (spawnOjb != undefined){
            spawnOjb.kill()
            spawnOjb = undefined    
        }
    })
    conn.on("message",(message)=>{
        msg = message.toString()
        console.log("receive the messsage",msg)
        if (msg === "+stop+"){
           console.log("准备关闭进程")
           if (spawnOjb != undefined){
              spawnOjb.kill()
              spawnOjb = undefined    
            }
            return
            // 这里要不要也关闭连接需要考虑
        }
        if (spawnOjb?.pid){
            console.log("the task had been excuete, return directly")
            return 
        }
        let firstCmd = msg.split(/\s+/)[0]
        let cmdPara = msg.split(/\s+/).slice(1)
        console.log('cmd=%s',firstCmd)
        console.log('cmdPara=%s',cmdPara)
        spawnOjb = spawn(
            firstCmd,
            cmdPara,
            {
                cwd: "./",
                stdio:['ignore','pipe','pipe'],
            }
        )
        spawnOjb.stdout.setEncoding('utf8')
        spawnOjb.stderr.setEncoding('utf8')
        spawnOjb.stdout.on('data',(chunk)=>{
            console.log("stdout: ",chunk)
            conn.send(chunk.toString())
        })
        spawnOjb.stderr.on('data',(chunk)=>{
            console.log("stderr: ",chunk)
            conn.send(chunk.toString())
        })
        spawnOjb.on("close",()=>{
            console.log("cmd run over")
            if (spawnOjb != undefined){
                spawnOjb.kill() 
              }
            spawnOjb = undefined 
            conn.close()
        })

        
    })

  });
  
module.exports = wsObj