const Koa = require('koa')
const app = new Koa()
const bodypaser = require('koa-bodyparser')
app.use(bodypaser())

const router = require('koa-router')()
// 请求数据的接口
router.get('/getData', async (ctx, next) => {
  // console.log(ctx) get对象获取
  // console.log(ctx.request.query.name)
  ctx.body = {
    msg: "ok",
    data: {
      name: "huahua",
      age: "18"
    }
  }
})

module.exports = router