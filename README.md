# 简介

> Vue 实战案例演练：Vue 仿制开发网易云音乐

## 测试

``` bash
# 安装依赖
npm install

# 本地开发环境：localhost:8080 
npm strat

# 线上生产环境打包
npm run build
```

## 数据接口

本地测试数据接口配置 /config/index.js 文件中对开发环境 dev 的代理配置项
```
## /config/index.js

module.exports = {
    dev: {
        proxyTable: {
            '/api':{
                target: xxx(网易云音乐 npm 项目包的数据接口地址)
            }
        }
    }
}
```

## 网易云音乐 npm 项目包

这是网易云音乐官方提供的一个网易云音乐数据接口项目包，[github 地址](https://github.com/Binaryify/NeteaseCloudMusicApi.git)，获取到该项目后，```npm i```、```node app.js``` 启动数据接口服务。

根据其数据接口地址（默认 localhost:3000）配置到我们播放器项目的开发配置项中，从而实现数据接口服务。