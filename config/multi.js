const path=require('path')
const context=path.join(__dirname,'..','src')
const appScheme='apps'
const compScheme='components'
const libs=['vue','vue-router']

module.exports={
  sourceScheme:appScheme,
  compScheme:compScheme,
  sourceExcludes:[],//入口排除项
  sourcePath:path.join(context,appScheme,'*/index.js'),//入口文件
  sourceTemp:new RegExp('.*\\/('+appScheme+'\\/.*?\\/index)\\.js'),//匹配入口文件
  components:path.join(context,compScheme,'*.vue'),//公共组件
  vendors:libs,//第三方库
  htmlTemp:path.join(context,'index.html')//页面模板
}
