const Koa = require('koa')
const Router = require('koa-router')
const bodypaser = require('koa-bodyparser')
// const static = require('koa-static')
const path = require('path')

const cors = require('koa2-cors');

const app = new Koa()
const router = new Router()
app.use(bodypaser())

// 假设传过去的是 对象 post  {name: "ssf"} get  ?name=ssf

// 处理跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.set("Access-Control-Allow-Headers", "authorization")
  await next()
})

// 请求数据的接口
router.get('/getData', async (ctx, next) => {
  // console.log(ctx) get对象获取
  console.log(ctx.request.query.name)
  ctx.body = {
    msg: "ok",
    data: {
      name: "huahua",
      age: "18"
    }
  }
})
// 请求数据的接口
router.post('/postData', async (ctx, next) => {
  // console.log(ctx)
  // console.log(ctx.request.body) post对象获取
  ctx.body = {
    msg: "ok",
    data: {
      name: "huahua",
      age: "18"
    }
  }
})



app.use(router.routes())

app.use(
  cors({
    origin: function (ctx) { //设置允许来自指定域名请求
      if (ctx.url === '/test') {
        return '*'; // 允许来自所有域名请求
      }
      return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
);

app.listen(3000)