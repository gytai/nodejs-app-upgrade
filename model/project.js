var mongoose = require('../mongoose').mongoose;
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name : { type:String },
    version : { type:String },
    download_path : { type:String },
    is_force : { type:Boolean },
    time : { type:Date, default:Date.now },
    option_people:{ type:String },
    is_delete:{ type:Boolean , default:false },
    file_md5:{ type:String },
    file_size:{ type:Number },
    file_name:{ type:String },
    remark : { type:String}
});

var ProjectModel = mongoose.model("project", ProjectSchema);

function add(name,version,download_path,is_force,option_people,file_md5,file_size,file_name,remark,callback) {
    ProjectModel.find({name:name,is_delete:false},function (err,data) {
        if(err){
            return callback(err,null);
        }
        if(data.length > 0){
            return callback('项目已存在',null);
        }
        if(!is_force){
            is_force = false
        }else{
            is_force = true;
        }

        var project = new ProjectModel({ name: name,version:version,download_path:download_path,is_force:is_force,option_people:option_people,file_md5:file_md5,file_size:file_size,file_name:file_name,remark:remark});
        project.save(function (err) {
            if (err){
                return callback(err,null);
            }
            return callback(null,null);
        });
    });

}

function del(id,callback) {
    ProjectModel.findByIdAndUpdate(id, { is_delete: true }, callback);
}

function update(id,name,version,download_path,is_force,option_people,file_md5,file_size,file_name,remark,callback) {
    ProjectModel.findById(id,function (err,info) {
        if(err){
            return callback(err,null);
        }
        if(!info){
            return callback('项目不存在',null);
        }

        if(!is_force){
            is_force = false
        }else{
            is_force = true;
        }

        var param = {
            name: name || info.name,
            version:version || info.version,
            download_path:download_path || info.download_path,
            is_force:is_force,
            option_people:option_people || info.option_people,
            file_md5:file_md5 || info.file_md5,
            file_size:file_size || info.file_size,
            file_name:file_name || info.file_name,
            remark:remark || info.remark,
        };

        ProjectModel.findByIdAndUpdate(id, param, callback);
    });

}

function query(page,size,callback) {
    ProjectModel.find({is_delete:false}).skip( (page-1)*size ).limit(size).sort({time:-1}).exec(function (err, res) {
        if (err) {
            return callback(err,null);
        }
        return callback(null,res);
    })

}

function check(name,ver,callback) {
    ProjectModel.findOne({name:name,version:{$gt: ver},is_delete:false},function (err, res) {
        if (err) {
            return callback(err,null);
        }
        if(!res){
            return callback('暂无更新',null);
        }
        var ret = {
            file_md5:res.file_md5,
            file_name:res.file_name,
            file_size:res.file_size,
            name:res.name,
            version:res.version,
            download_path:res.download_path,
            is_force:res.is_force

        }
        return callback(null,ret);
    });

}

exports.add = add;
exports.del = del;
exports.update = update;
exports.query = query;
exports.check = check;