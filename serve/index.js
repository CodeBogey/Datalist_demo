const Koa = require('koa')
const Router = require('koa-router')
const mock = require('../mock/')
const app = new Koa()
const bodyParser = require('koa-bodyparser') // 解析post参数

const router = new Router({
  prefix: ''
})
let listDatas = mock.list.rows
app.use(bodyParser())
router.post('/articleCategory/list', async (ctx, next) => {
  let listData = listDatas
  let arr = []
  listData.map(item => {
    arr.push({
      id: item.id,
      name: item.name
    })
  })
  ctx.body = {
    code: 1,
    data: arr
  }
})
router.post('/list', async (ctx, next) => {
  let {pageIndex, title, name, createTime, order} = ctx.request.body
  let listData = JSON.parse(JSON.stringify(listDatas))
  // console.log('listData', listData)
  if (order === 'desc') {
    listData = listData.reverse()
  }
  let resData = listData.slice(0, 10)
  if (pageIndex) {
    resData = listData.slice(10 * (pageIndex - 1), 10 * pageIndex)
  }
  if (title) {
    let arr = []
    listData.map(item => {
      if (item.title.indexOf(title) > -1) {
        arr.push(item)
      }
    })
    resData = arr
    listData = arr
  }
  if (createTime && createTime.length) {
    let startTime = Date.parse(createTime[0])
    let endTime = Date.parse(createTime[1])
    let arr = []
    listData.map(item => {
      let currTime = Date.parse(item.createdTime)
      if (startTime <= currTime && currTime <= endTime) {
        arr.push(item)
      }
    })
    resData = arr
    listData = arr
  }
  if (name) {
    let arr = []
    listData.map(item => {
      if (item.id === name) {
        arr.push(item)
      }
    })
    resData = arr
    listData = arr
  }
  ctx.body = {
    code: 1,
    rows: resData,
    total: listData.length
  }
})
router.post('/list/add', async (ctx, next) => {
  let {title, content} = ctx.request.body
  let obj = {
    title,
    content,
    name: 'admin',
    yiNum: parseInt(Math.random() * 1000),
    createdTime: new Date().toLocaleDateString(),
    id: listDatas.length + 1
  }
  listDatas.push(obj)
  ctx.body = {
    code: 1,
    data: listDatas
  }
})
router.post('/detail', async (ctx, next) => {
  let {id} = ctx.request.body
  let resData = listDatas.find((item) => {
    if (item.id === id) {
      return item
    }
  })
  ctx.body = {
    code: 1,
    data: resData
  }
})
router.post('/remove', async (ctx, next) => {
  let {id} = ctx.request.body
  let list = listDatas.filter((item) => {
    if (item.id !== id) {
      return item
    }
  })
  listDatas = list
  ctx.body = {
    code: 1,
    message: '删除成功'
  }
})
router.post('/edit', async (ctx, next) => {
  let {id, title, content} = ctx.request.body
  listDatas.find((item) => {
    if (item.id === id) {
      item.title = title
      item.content = content
    }
  })
  ctx.body = {
    code: 1,
    message: '修改成功'
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods())
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
