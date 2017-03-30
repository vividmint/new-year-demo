/**
 * 部署cdn

 */

 var UPYUN = require('upyun');
 var fs = require('fs');
 var upyun = new UPYUN('scuinfo', 'dsgygb', 'www.scuweb.com','v0.api.upyun.com',{
     apiVersion:'v2'
 });


 var putfiles = function(){
     return new Promise((resolve,reject)=>{
      //  upyun.putFile(remotePath, localFile, type, checksum, opts, callback);

     });
 };

 putfiles().then(data=>{
     console.log(data);
 }).catch(err=>{
     console.log(err);
 });
