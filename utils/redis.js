/**
 *Author: TaiGuangYin
 *Date: 2017
 *Description:Redis操作类封装
 */
var redisSvc = {};
var redis = require("redis");
var config = require("../config").REDIS;

if(!client){
    var client = redis.createClient(config.port,config.host);
}

client.on("error", function (err) {
    console.log("Redis Error :" , err);
    client = null;
});

client.on('connect', function(){
    console.log('Redis连接成功.');
});

/**
 * 添加string类型的数据
 * @param key 键
 * @params value 值
 * @params expire (过期时间,单位秒;可为空，为空表示不过期)
 */
redisSvc.set = function(key, value, expire){
    return new Promise(function (resolve, reject) {
        if(typeof value == 'undefined') {
            return reject(key + '的值为空')
        }
        client.set(key, value, function(err, result){
            if (err) {
                return reject(err);
            }
            if (!isNaN(expire) && expire > 0) {
                client.expire(key, parseInt(expire));
            }
            return resolve(result);
        });
    });

};

/**
 * 查询string类型的数据
 * @param key 键
 */
redisSvc.get = function(key){
    return new Promise(function (resolve, reject) {
        client.get(key, function(err,result){
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });

};

/*
*删除String 类型的key
 * @param key 键
*/
redisSvc.del = function(key){
    return new Promise(function (resolve, reject) {
        client.del(key, function(err,result){
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });

};


module.exports = redisSvc;