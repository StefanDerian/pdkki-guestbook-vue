var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

const app = express()

var history = require('connect-history-api-fallback');




app.use(serveStatic(path.join(__dirname, './dist')))

app.use(history({
  disableDotRule: true,
  verbose: true
}));

app.use(serveStatic(path.join(__dirname, './dist')))

//console.log(path.join(__dirname,"dist"));

var port = process.env.PORT || 5001
app.use(history()).listen(port , ()=>{
	console.log('server started '+ port)
})

