
const path=require('path')
// const glob=require('glob')
// const js_source='src/apps/*/index.js'
// const vendors=['vue', 'vue-router']
//
// const entries={vendor:vendors}
// const entryFiles=glob.sync(path.join(__dirname, '..', js_source))
// entryFiles.forEach(function (f) {
//   entries[/.*\/(apps\/.*?\/index)\.js/.exec(f)[1]]=f
// })
const context=path.join(__dirname,'..','src')

module.exports={
  sourceJs:path.join(context,'apps/*/index.js'),//js入口文件
  sourceJsTemp:/.*\/(apps\/.*?\/index)\.js/,
  components:path.join(context,'components/*.vue'),//公共组件
  vendors:['vue','vue-router'],//第三方库
  htmlTemplate:path.join(context,'index.html'),//页面文件模板
}
