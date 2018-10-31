const Mock = require('mockjs')
let data = {
  list: Mock.mock({
    'rows|10-100': [
      {
        'id|+1': 1,
        title: '@ctitle',
        name: '@cname',
        content: '@cparagraph',
        createdTime: '@date("yyyy-MM-dd")',
        'yiNum|1-1000': 1000
      }
    ]
  })
}
module.exports = data
