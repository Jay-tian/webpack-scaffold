# webpack-scaffold

## 功能列表
1. 模块化管理资源文件，解析编译ES6语法
2. 编译less文件，自动添加浏览器前缀
3. 压缩js,css文件
4. 去除无用css，减少css大小，优化css结构
5. 自动校验js语法，并自动修复部分语法格式问题

## 下载依赖
```
  yarn add jay-webpack-scaffold
```

## 配置文件
```
  cp ./node_modules/jay-webpack-scaffold/webpack/config.dist.js ./webpack-config.js
```
根据需求调整相应目录

### 配置文件参数
```
  entry: 需要编译输出的js 根路径
  output: 输出的路径
  mainJs: 全局使用的js文件路径
  lessPath: 需要编译输出的less 根路径，该目录下，都会被编译输出
  publicPath: 开发环境下，使用路径
  author: 作者名称
  purifyCssPaths: 被使用到css的所有文件地址，如html页面和js，它会过滤除了这些被使用的css样式
  copyLibs: 需要拷贝的类库
```

## 代码格式化配置

 你需要自己配置代码风格
```
  ./node_modules/.bin/eslint --init
```

修复代码格式
```
./node_modules/.bin/eslint --fix filepath
```

## 开发说明
目录下的index.js命名的文件将会作为输出文件
不是index.js命名的会作为通用模块使用

## 命令(scripts)
```
  "scripts": {
    "build": "NODE_ENV=production settingPath='/webpack-config.js' webpack --config    '/node_modules/jay-webpack-scaffold/webpack/webpack.js'",
    "dev": "NODE_ENV=development settingPath='webpack-config.js' webpack-dev-server --config '/node_modules/jay-webpack-scaffold/webpack/webpack.js'",
  }
```
setting.js
本地开发环境执行以下命令：
```
npm run dev
```
它将会文件生成好，放入内存中。自动监听文件变化
<br/>

生产环境执行以下命令：
```
npm run build
```
它将会生产静态资源文件到你定义的目录下

## ngixn配置
```
location ~ ^/dist {
	if (-f $root_dir/dev.lock){
      proxy_pass  http://127.0.0.1:8082;
	}
}
```

## 异常情况

### npm run dev 执行报错
1. 有可能依赖没有下载完成，执行yarn
2. 有可能端口被占用 执行以下命令
```
lsof -i:8082 （查看占用端口进程）
 kill -9 PID (pid 为进程id号)
```
