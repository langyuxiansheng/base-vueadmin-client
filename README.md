# base-vueadmin-client 简介

- 基于Vue 2.x和ElementUI 2.x的后台管理系统基础脚手架
- 使用 vue-router 和 vuex
- ajax请求使用的axios
- 工程化、模块化的风格，让你的开发更轻松
- 使用 async await 从此让你告别繁琐的then回调，更简洁的风格和语法
- 集成权限系统
- resetful 风格，每个请求都一目了然

### 下载使用请看这里

项目详细的[说明文档](https://github.com/langyuxiansheng/base-vueadmin-client/tree/master/%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3)

此项目提供最基础的管理后台解决方案,是一套最基础的、开箱即用的vue管理后台框架

可以配套使用的后台API服务 [基于KOA2的restful 风格的后台API服务](https://github.com/langyuxiansheng/base-restfulapi-server)

在线预览地址[Demo](http://111.231.225.103)
------------
```
http://111.231.225.103
```

### 其它
---

- 项目持续更新中......
- 如果此项目对你有帮助的话,欢迎star,有问题请在github Issues 留言提问
- 您有更好的方案和方法请指教,也可以直接联系作者 109643291@qq.com
- 欢迎加入作者所在的QQ群: 46153838
- 作者个人网站: http://www.hao2013.cn
- CSDN博客: https://blog.csdn.net/qq_33270001

---


### 图片展示
---
登陆页面 Y
![登录页面展示](https://github.com/langyuxiansheng/base-vueadmin-client/blob/master/images/login.png)

表单和列表页面 Y
![表单和列表页面展示](https://github.com/langyuxiansheng/base-vueadmin-client/blob/master/images/manage.png)

图表 N

更多功能正在更新中......

---
### 目录结构说明


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

### 为了规范所有的项目开发者风格一致,建议不要删除eslint 的验证

### 更新说明
---

*v1.0.2 2018年11月23日21:49:09*

1. 新增项目说明文档
2. 优化http请求模块

*v1.0.1 2018年11月22日15:49:13*

1.	更新权限系统。
2.  优化部分代码逻辑

*v1.0.0 2018年11月12日10:31:40*

1.	创建项目。

---
