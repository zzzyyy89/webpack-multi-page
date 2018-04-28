
const glob=require('glob')
const multi=require('../config/multi')
const config=require('../config')

const webpack=require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function getHtmlPluginOption(env,name) {
  return env==='production'?{
    filename:config.build.assetsRoot+'/'+name+'.html',
    // chunks:['vendor',name],
    template:multi.htmlTemp,
    inject:true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunks:['manifest','vendor',name,'comps'],
    chunksSortMode:'dependency'
  }:{
    filename:name+'.html',
    template:multi.htmlTemp,
    inject:true,
    chunks:[name]
  }
}

module.exports=function (env) {
  let webpackConfig={entry:{},plugins:[]}
  glob.sync(multi.sourcePath).forEach(function (f) {
    let name=multi.sourceTemp.exec(f)[1]
    //文件入口和页面
    webpackConfig.entry[name]=f
    webpackConfig.plugins.push(new HtmlWebpackPlugin(getHtmlPluginOption(env,name)))
  })
  webpackConfig.entry['vendor']=multi.vendors

  if(env==='production'){
    const comps=glob.sync(multi.components)
    if(comps&&comps.length>0){
      webpackConfig.entry['comps']=comps
      webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name:'comps',
        chunks:['comps']
      }))
    }
  }

  return webpackConfig
}
