const webpack=require('webpack')
const path=require('path')
const express =require('express')
const opn=require('opn')

// const ps=require('./paths')
const multiConfig=require('../config/multi')
const config = require('../config')
const devWebpackConfig=require('./webpack.dev.conf')
const PORT = (process.env.PORT && Number(process.env.PORT))||config.dev.port
// const HOST = process.env.HOST || config.dev.host
const autoOpenBrowser = !!config.dev.autoOpenBrowser

const app=express()

const compiler=webpack(devWebpackConfig)
const wdm=require('webpack-dev-middleware')(compiler,{
  publicPath:devWebpackConfig.output.publicPath,
  quiet:true
  // stats:{
  //   colors:true,
  //   chunks:false
  // }
})

const whm=require('webpack-hot-middleware')(compiler,{
  log: false,
  heartbeat: 2000
})

app.use(whm)
app.use(wdm)

const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

app.get('/:viewname?',function (req,res,next) {
  let viewName=req.params.viewname
  let target=(!viewName||viewName.indexOf('/')>0||/\D+\.\D+/.test(viewName))?'':viewName+'/index.html'
  // console.log('tg:',target)
  if(!target){
    // console.log('shame ignore')
    return next();
  }
  let fPath=path.join(compiler.outputPath,multiConfig.sourceScheme,target)
  console.log('to:',fPath)
  // compiler.outputFileSytstem.readdir(compiler.outputPath,function (e,file) {
  //   console.log('fs',file)
  // })
  compiler.outputFileSystem.readFile(fPath,function (e,result) {
    if(e){
      return next(e)
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  })
})

let _resolve,_reject
const readyPromise=new Promise(function (resolve, reject) {
  _resolve=resolve;
  _reject=reject;
})

let server
const portfinder=require('portfinder')
portfinder.basePort=PORT
wdm.waitUntilValid(function () {
  portfinder.getPort(function (err,port) {
    if(err){
      _reject(err)
    }
    process.env.PORT = port
    let uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it

    // console.log('auto open',autoOpenBrowser)
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

// const server=app.listen(PORT,HOST,function (e) {
//   if(e){
//     console.log('hdm err:',e)
//     return
//   }
//   console.log('Listening at http://localhost:' + PORT + '\n')
// })

module.exports={
  ready:readyPromise,
  close:function () {
    server.close()
  }
}
