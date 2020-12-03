const Koa = require('koa')
const app = new Koa()
const bodypaser = require('koa-bodyparser')
// const static = require('koa-static')
const path = require('path')
const fs = require('fs')
const cors = require('koa2-cors');
app.use(bodypaser())

// 假设传过去的是 对象 post  {name: "ssf"} get  ?name=ssf
// 处理跨域

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.set("Access-Control-Allow-Headers", "authorization")
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  ctx.set("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  await next()
})



app.use(
  cors({
    origin: function (ctx) { //设置允许来自指定域名请求
      if (ctx.url === '/test') {
        return '*'; // 允许来自所有域名请求
      }
      // return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
      // return 'http://localhost:8081'; //只允许http://localhost:8080这个域名的请求
      return '*'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
);

let composeRouter = require('./composeRouter/index')
app.use(composeRouter(__dirname + '/controllers').routes()); //传入路由所在文件夹即可

app.listen(3000)