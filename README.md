# 基于Nodejs、express框架的app升级服务。数据库MongoDB。UI框架Layui Admin。

------

安卓以及嵌入式设备需要修改bug以及发布新的功能，就要用到在线升级。我这里给大家提供了一个基于Nodejs的在线升级服务器的Demo.真实使用下，建议文件上传到类似阿里云、七牛云这样的文件服务器。

参考知识点：
> * Nodejs、Express框架
> * LayUI的admin模板使用
> * MongoDB以及Mongoose的使用

### 安装
1,git clone https://github.com/gytai/nodejs-app-upgrade.git

2,npm install 

3,pm2 start bin/www -name upgrade

### 线上Demo
http://112.74.81.224:3008/
测试账户：admin 123456

### 已完成和未完成 
- [x] 登录、登出
- [x] 项目添加、更新、删除
- [x] 密码修改
- [ ] 用户管理
- [ ] 权限控制

实例图片：
![登录](https://github.com/gytai/nodejs-app-upgrade/blob/master/login.png)

![项目管理](https://github.com/gytai/nodejs-app-upgrade/blob/master/project.png)

![项目添加](https://github.com/gytai/nodejs-app-upgrade/blob/master/project_add.png)

![修改密码](https://github.com/gytai/nodejs-app-upgrade/blob/master/password_reset.png)

如果您喜欢，请给个Star 谢谢...
