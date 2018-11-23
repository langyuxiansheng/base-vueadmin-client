# base-vueadmin-client

> 基于Vue和ElementUI的后台管理系统基础脚手架

使用了vue-router 和 vuex

ajax请求使用的axios

----------------------------------

提供最基本的脚手架服务

配套使用的后台服务  https://github.com/langyuxiansheng/base-restfulapi-server

项目会持续更新

如果对你有帮助的话,欢迎star,有问题请在此留言

也可以在github Issues提问 或者直接 联系作者 109643291@qq.com

欢迎加入作者所在的QQ群: 46153838

作者个人网站: http://www.hao2013.cn

CSDN: https://blog.csdn.net/qq_33270001

----------------------------------

## Build Setup

``` bash
#clone
git clone https://github.com/langyuxiansheng/base-vueadmin-client.git

#cd base-vueadmin-client
cd base-vueadmin-client

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

#图片展示
---------------------------------
登陆页面 Y
![Image text](https://github.com/langyuxiansheng/base-vueadmin-client/blob/master/images/login.png)

表单和列表页面 Y
![Image text](https://github.com/langyuxiansheng/base-vueadmin-client/blob/master/images/manage.png)

图表 N

移动端适配 N

更多功能正在持续更新中..........

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


目录结构说明
------------

```bash
.
├── README.md				# 项目说明文件
├── .babelrc                # Babel 配置文件
├── .editorconfig           # 编辑器风格定义文件
├── .eslintignore           # ESlint 忽略文件列表
├── .eslintrc.js            # ESlint 配置文件
├── .gitignore              # Git 忽略文件列表
├── package.json            # 描述文件
├── config                  # config 配置文件目录
├── dist                    # 生产文件输出目录
├── build                   # build 入口目录
├── src                     # 源代码目录，编译后目标源代码位于 dist 目录
│   ├── main.js             # 入口文件
│   ├── App.vue             # 组件挂载节点
│   ├── assets              # 静态资源目录
│   ├── common              # 公共方法目录
│   ├── components          # 公共组件目录
│   ├── filters             # 全局过滤器
│   ├── http                # Http模块
│   │   ├── apis            # 业务模块文件夹
│   │   ├── index.js        # 统一出口文件
│   │   ├── interceptor.js  # HTTP请求响应拦截器
│   │   └── wrapper.js      # HTTP主配置
│   ├── router              # 路由器模块
│   │   ├── index.js        # 路由基础配置
│   │   ├── permission.js   # 路由权限控制模块
│   │   └── routes.js       # 路由组件模块
│   ├── store               # vuex主模块
│   └── views               # 路由组件文件夹
├── images                  # 项目截图目录
├── static                  # 静态资源目录
└── test                    # 测试模块
```

## 为了规范所有的项目开发者风格一致,建议不要删除eslint 的验证

更新说明
--------------------------------------------------------------
*v1.0.1 2018年11月22日15:49:13*

1.	更新权限系统。
2.  优化部分代码逻辑


*v1.0.0 2018年11月12日10:31:40*

1.	创建项目。

--------------------------------------------------------------
