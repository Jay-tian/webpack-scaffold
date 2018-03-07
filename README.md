# webpack-scaffold

## start
1. 打开根目录的 index.html, 默认为开发模式
2. 下载依赖 
3. 启动本地开发环境

## 下载依赖
```
  yarn
```

## 配置文件
```
  cp ./webpack/setting.dist.js ./webpack/setting.js
```
配置： 入口目录和输出口目录

### 代码格式化配置

 你可以自己配置代码风格
```
  ./node_modules/.bin/eslint --init
```

修复代码格式
```
./node_modules/.bin/eslint --fix filepath
```

## 开发说明
每个目录下的index.js命名的文件将会作为输出文件
不是index.js命名的会作为通用模块使用

## 命令
本地开发环境执行以下命令：
```
npm run dev
```
它将会文件生成好，放入内存中。他会监听文件变化
<br/>

生产环境执行以下命令：
```
npm run build
```
它将会生产静态资源文件到dist目录下

## ngixn配置
```
location ~ ^/dist {
	if (-f $root_dir/dist/dev.lock){
      proxy_pass  http://127.0.0.1:3032;
	}
}
```

有dev.lock 时访问静态资源时，访问本地端口3032服务
这样在页面中引用文件可以这样
```
 <script src="main.js"></script>
```

而不必像示例一样，当dist目录下有dev.lock 文件时，会自动访问 
```
 <script src="http://127.0.0.1:3032/main.js"></script>
```



## 异常情况

### npm run dev 执行报错
1. 有可能依赖没有下载完成，执行yarn
2. 有可能端口被占用 执行以下命令
```
lsof -i:3032 （查看占用端口进程）
 kill -9 PID (pid 为进程id号)
```
