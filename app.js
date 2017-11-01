/**
 * Created by lailai on 2017/11/1.
 */
var async=require('async');
var log=require('./log').log;

/**
 * 对集合中的每一个元素，执行某个异步操作，得到结果。所有的结果将汇总到最终的callback里。与forEach的区别是，forEach只关心操作不管最后的值，而map关心的最后产生的值。
 *
 * 提供了两种方式：
 * 1. 并行执行。同时对集合中所有元素进行操作，结果汇总到最终callback里。如果出错，则立刻返回错误以及已经执行完的任务的结果，未执行完的占个空位
 * 2. 顺序执行。对集合中的元素一个一个执行操作，结果汇总到最终callback里。如果出错，则立刻返回错误以及已经执行完的结果，未执行的被忽略。
 */
var arr = [{name:'Jack', delay:200}, {name:'Mike', delay: 100}, {name:'Freewind', delay:300}, {name:'Test', delay: 50}];
/**
 * 所有操作均正确执行，未出错。所有结果按元素顺序汇总给最终的callback。
 */
async.map(arr,function(item,callback){
    log('enter:'+item.name);
    setTimeout(function(){
        log('handle:'+item.name);
        callback(null,item.name);
    },item.delay);
},function(err,results){
    log('err:',err);
    log('results:',results);
});
/**
 *  如果中途出错，立刻将错误、以及已经执行完成的结果汇总给最终callback。未执行完的将会在结果数组中用占个空位。
 */
async.map(arr,function(item,callback){
    log('enter:',item.name);
    setTimeout(function(){
        log('handle:',item.name);
        if(item.name ==='Jack') callback('myerr');
        else callback(null,item.name);
    },item.delay)
},function(err,results){
    log('err:',err);
    log('results:',results);
});
/**
 * 顺序执行，一个完了才执行下一个。
 */
async.mapSeries(arr,function(item,callback){
    log('enter:',item.name);
    setTimeout(function(){
        log('handle:',item.name);
        callback(null,item.name);
    },item.delay)
},function(err,results){
    log('err:',err);
    log('results:',results);
});
/**
 * 顺序执行过程中出错，只把错误以及执行完的传给最终callback，未执行的忽略。
 */
async.mapSeries(arr, function(item, callback) {
    log('1.4 enter: ' + item.name);
    setTimeout(function() {
        log('1.4 handle: ' + item.name);
        if(item.name==='Mike') callback('myerr');
        else callback(null, item.name+'!!!');
    }, item.delay);
}, function(err, results) {
    log('1.4 err: ', err);
    log('1.4 results: ', results);
});