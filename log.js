/**
 * Created by lailai on 2017/11/1.
 */
var moment=require('moment');
//记录日志
exports.log=function(msg,obj){
    process.stdout.write(moment().format('ss.SS')+'>');
    if(obj!==undefined){
        process.stdout.write(msg);
        console.log(obj);
    }else{
        console.log(msg);
    }
};