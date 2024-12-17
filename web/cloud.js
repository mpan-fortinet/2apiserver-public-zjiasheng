const express = require("express");
const cloudRouter = express.Router();
const jwt = require("jsonwebtoken");
//let config = require("../config");
const md5 = require("md5-node");
const { getRspBaseObj } = require("../utils/common");
const  userDB  = require("../model/userdb");
const debugLogger = require('../utils/logger.js');
const ini = require('../utils/ini.js')
const passport = require('../utils/cuspassport');


cloudRouter.get("/vm/:id", async function (req, res) {
    console.log('req.query=',req.params,req.query)
    console.log('req.body=',req.body)
    console.log('req.headers=',req.headers)
    const csp_mgmt = {
        code: 200,
        message: "ok",
        data: {
            requestId: "req-85796b54-f93e-11ee-bdf1-00155d35d8a3",
            vmState: 40,   // success
            //vmState: 10, 
            templateId: 9002,
            proxmoxId: 111,
            vmId: "3dd756ee569946b5aa374eb836f2b0d9",
            name: "KL-csp-1",
            osFamily: "FortiCSP_manager",
            osVersion: "6.0.0_b0053",
            cpu: 4,
            ram: 8192,
            disks: [
                {   
                    "index": 0,
                    "size": 5555
                },
                {
                    "index": 1,
                    "size": 6666
                }
            ],
            nics: [
                {
                    index: 0,
                  //  ip: "10.65.11.131",
                    ip: "10.65.176.244",
                    mac: "BC:24:11:FD:18:98",
                    maskBitCount: 22,
                    netId: 12,
                    netName: "mgmt",
                    vlan: 20,
                    gateway: "10.65.184.254",
                    dnsServer: ""
                },
                {
                    index: 1,
                    ip: "100.65.185.158",
                    mac: "AC:24:11:FD:18:88",
                    maskBitCount: 22,
                    netId: 11,
                    netName: "mgmt",
                    vlan: 100,
                    gateway: "100.65.185.254",
                    dnsServer: ""
                }
            
            ],
            host:"r11",
            cluster: "ftc-prod-1",
            sharedStore:false,
            clusterURL:"http://1.1.1.1",
            metadata: {
                user: "admin",
                password: "Forti1@#1@#",
               // password: "admin123",
                sshKey: "keys",
                tags: {
                env1: "testbed1",
                env2: "testbed2"
                }
            
            },
    
            CreatedAt: "2024-05-06T15:53:32.609-07:00",     
            UpdatedAt: "2024-05-06T15:54:16.505-07:00",
            DeletedAt: null
            }
        
        }

        const csp_site = {
            code: 200,
            message: "ok",
            data: {
                requestId: "req-85796b54-f93e-11ee-bdf1-00155d35d8a3",
                vmState: 40,   // success
                //vmState: 10, 
                templateId: 9002,
                proxmoxId: 111,
                vmId: "3dd756ee569946b5aa374eb836f2b0d9",
                name: "KL-csp-1",
                osFamily: "FortiCSP",
                osVersion: "6.0.0_b0053",
                cpu: 4,
                ram: 8192,
                disks: [
                    {   
                        "index": 0,
                        "size": 5555
                    },
                    {
                        "index": 1,
                        "size": 6666
                    }
                ],
                nics: [
                    {
                        index: 0,
                        ip: "10.65.11.130",
                        mac: "BC:24:11:FD:18:98",
                        maskBitCount: 22,
                        netId: 12,
                        netName: "mgmt",
                        vlan: 20,
                        gateway: "10.65.184.254",
                        dnsServer: ""
                    },
                    {
                        index: 1,
                        ip: "100.65.185.158",
                        mac: "AC:24:11:FD:18:88",
                        maskBitCount: 22,
                        netId: 11,
                        netName: "mgmt",
                        vlan: 100,
                        gateway: "100.65.185.254",
                        dnsServer: ""
                    }
                
                ],
                host:"r11",
                cluster: "ftc-prod-1",
                sharedStore:false,
                clusterURL:"http://1.1.1.1",
                metadata: {
                    user: "admin",
                   // password: "Forti1@#1@#",
                    password: "admin123",
                    sshKey: "keys",
                    tags: {
                    env1: "testbed1",
                    env2: "testbed2"
                    }
                
                },
        
                CreatedAt: "2024-05-06T15:53:32.609-07:00",     
                UpdatedAt: "2024-05-06T15:54:16.505-07:00",
                DeletedAt: null
                }
            
            }
    const windows = {
        code: 200,
        message: "ok",
        data: {
            requestId: "req-85796b54-f93e-11ee-bdf1-00155d35d8a3",
            vmState: 40,   // success
            //vmState: 10, 
            templateId: 9002,
            proxmoxId: 111,
            vmId: "3dd756ee569946b5aa374eb836f2b0d9",
            name: "KL-VM-Linux-3",
            osFamily: "windows",
            osVersion: "windows",
            cpu: 4,
            ram: 8192,
            disks: [
                {   
                    "index": 0,
                    "size": 5555
                },
                {
                    "index": 1,
                    "size": 6666
                }
            ],
            nics: [
                {
                    index: 0,
                    ip: "10.65.170.139",
                    mac: "BC:24:11:FD:18:98",
                    maskBitCount: 22,
                    netId: 12,
                    netName: "mgmt",
                    vlan: 20,
                    gateway: "10.65.184.254",
                    dnsServer: ""
                },
                {
                    index: 1,
                    ip: "100.65.185.158",
                    mac: "AC:24:11:FD:18:88",
                    maskBitCount: 22,
                    netId: 11,
                    netName: "mgmt",
                    vlan: 100,
                    gateway: "100.65.185.254",
                    dnsServer: ""
                }
            
            ],
            host:"r11",
            cluster: "ftc-prod-1",
            sharedStore:false,
            clusterURL:"http://1.1.1.1",
            metadata: {
                user: "administrator",
                password: "Forti1@#",
                sshKey: "keys",
                tags: {
                env1: "testbed1",
                env2: "testbed2"
                }
            
            },
    
            CreatedAt: "2024-05-06T15:53:32.609-07:00",     
            UpdatedAt: "2024-05-06T15:54:16.505-07:00",
            DeletedAt: null
            }
        
        }
        const linux = {
            code: 200,
            message: "ok",
            data: {
                requestId: "req-85796b54-f93e-11ee-bdf1-00155d35d8a3",
                vmState: 40,   // success
                //vmState: 10, 
                templateId: 9002,
                proxmoxId: 111,
                vmId: "3dd756ee569946b5aa374eb836f2b0d9",
                name: "KL-VM-Linux-3",
                osFamily: "linux",
                osVersion: "ubuntu-2204-amd64",
                cpu: 4,
                ram: 8192,
                disks: [
                    {   
                        "index": 0,
                        "size": 5555
                    },
                    {
                        "index": 1,
                        "size": 6666
                    }
                ],
                nics: [
                    {
                        index: 0,
                        ip: "10.65.170.139",
                        mac: "BC:24:11:FD:18:98",
                        maskBitCount: 22,
                        netId: 12,
                        netName: "mgmt",
                        vlan: 20,
                        gateway: "10.65.184.254",
                        dnsServer: ""
                    },
                    {
                        index: 1,
                        ip: "1.2.3.4",
                        mac: "AC:24:11:FD:18:88",
                        maskBitCount: 24,
                        netId: 11,
                        netName: "datanet1",
                        vlan: 100,
                        gateway: "100.65.185.254",
                        dnsServer: ""
                    }
                
                ],
                host:"r11",
                cluster: "ftc-prod-1",
                sharedStore:false,
                clusterURL:"http://1.1.1.1",
                metadata: {
                    user: "root",
                    password: "fortinet",
                    sshKey: "keys",
                    tags: {
                    env1: "testbed1",
                    env2: "testbed2"
                    }
                
                },
        
                CreatedAt: "2024-05-06T15:53:32.609-07:00",     
                UpdatedAt: "2024-05-06T15:54:16.505-07:00",
                DeletedAt: null
                }
            
            }
    res.json(windows)
   // res.json(csp_mgmt)
   // res.json(csp_site)
});
cloudRouter.post("/vm", async function (req, res) {
    console.log('req.query=',req.params,req.query)
    console.log('req.body=',req.body)
    console.log('req.headers=',req.headers)
    let a1 = {
        code: 200,
        message: "ok",
        data:{
            vmid:"3dd756ee569946b5aa374eb836f2b0d9",
            throtting:false,
        }
    }
    // a1 = {
    //     code: 2009,
    //     message: "any thins error",
    //     data:{
    //         vmid:"3dd756ee569946b5aa374eb836f2b0d9",
    //         throtting:false,
    //     }
    // }
    res.json(a1)
});

cloudRouter.delete("/vm/:id", async function (req, res) {

//cloudRouter.delete("/vm/:id", async function (req, res) {
    console.log('req.query=',req.params,req.query)
    console.log('req.body=',req.body)
    console.log('req.headers=',req.headers)
    const a1 = {
        code: 1005,  //
        message: "ok",
        data:{
            vmid:"e9ef557798d84f0faae0663b7f1ba96e"
        }
    }
    res.json(a1)
});


cloudRouter.get("/image", async function (req, res) {
    console.log('req.query=',req.params,req.query)
    console.log('req.body=',req.body)
    console.log('req.headers=',req.headers)
    const a1 = {
        code: 200,
        message: "ok",
        data: [
                {
                    templateId: 9102,
                    templateName: "windows-xp-sp2-x86",
                    osName: "windows",
                    osVersion: "windows-xp-sp2-x86",
                    osTemplateVersion:"",
                    type: "windows", 
                    enabled: true,
                    ID: 1,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                },
                {
                    templateId: 8102,
                    templateName: "Windows-XP-SP2-x64",
                    osName: "windows",
                    osVersion: "windows-xp",
                    osTemplateVersion:"",
                    type: "windows", 
                    enabled: true,
                    ID: 1,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                },
                {
                    templateId: 8102,
                    templateName: "Windows-XP-SP2-x64",
                    osName: "afefefe",
                    osVersion: "ubuntu 2023",
                    osTemplateVersion:"",
                    type: "linux", 
                    enabled: true,
                    ID: 1,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                },
                {
                    id: 29,
                    templateId: 9003,
                    templateName: "ubuntu-2204-amd64",
                    osName: "ubuntu-2204-amd64",
                    osVersion: "ubuntu-2204-amd64",
                    osTemplateVersion:"",
                    osFamily: "linux",
                    enabled: true,
                    cluster: "ftc",
                    createdAt: "0001-01-01T00:00:00Z",
                    updatedAt: "0001-01-01T00:00:00Z",
                    deletedAt: null
                }
        
            ]
        }
    res.json(a1)
});

cloudRouter.get("/network/available", async function (req, res) {
    console.log('req.query=',req.params,req.query)
    console.log('req.body=',req.body)
    console.log('req.headers=',req.headers)
    let a1
    if (req.query.hasOwnProperty('ctrlNet') && req.query.ctrlNet==='true'){
        console.log('mgmt1111')
        a1 = {
            code: 200,
            message: "ok",
            data: [
                    {
                        name: "mgmt-actal",
                        netSegment: "10.1.1.0",
                        maskBitCount: 22,
                        vlan: 1,
                        gateway: "10.1.1.254",
                        dns_serverServer: "",
                        dhcp_enabled: true,
                        dhcp_range: "10.65.184.1-10.65.185.255",
                        dhcp_lease_time: 604800,
                        enabled: true,
                        id: 1,
                        CreatedAt: "0001-01-01T00:00:00Z",
                        UpdatedAt: "0001-01-01T00:00:00Z",
                    },
                    
            ]
          }
        
    }else{
 //const a1 = JSON.parse(`{
    a1 = {
        code: 200,
        message: "ok",
        data: [
                {
                    name: "data2-acl",
                    netSegment: "10.65.184.0",
                    maskBitCount: 22,
                    vlan: 1001,
                    gateway: "10.65.187.254",
                    dns_serverServer: "",
                    dhcp_enabled: true,
                    dhcp_range: "10.65.184.1-10.65.185.255",
                    dhcp_lease_time: 604800,
                    enabled: true,
                    id: 100,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                },
                {
                    name: "data1-acl",
                    netSegment: "20.65.185.0",
                    maskBitCount: 22,
                    vlan: 2001,
                    gateway: "20.65.187.254",
                    dns_serverServer: "",
                    dhcp_enabled: true,
                    dhcp_range: "10.65.184.1-10.65.185.255",
                    dhcp_lease_time: 604800,
                    enabled: false,
                    id: 200,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                },
                {
                    name: "data3-acl",
                    netSegment: "30.65.186.0",
                    maskBitCount: 22,
                    vlan: 3001,
                    gateway: "30.65.187.254",
                    dns_serverServer: "",
                    dhcp_enabled: true,
                    dhcp_range: "10.65.184.1-10.65.185.255",
                    dhcp_lease_time: 604800,
                    enabled: true,
                    id: 300,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                },
                {
                    name: "data4-acl",
                    netSegment: "40.65.186.0",
                    maskBitCount: 22,
                    vlan: 4001,
                    gateway: "30.65.187.254",
                    dns_serverServer: "",
                    dhcp_enabled: true,
                    dhcp_range: "10.65.184.1-10.65.185.255",
                    dhcp_lease_time: 604800,
                    enabled: true,
                    id: 400,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                },
        ]
      }
    }
 

  res.json(a1)

  
});

module.exports = {
    cloudRouter,
  };
  
