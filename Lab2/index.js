
const http = require('http')
const handles = require('./handles')

const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
'       <p>Hello World !</p>' +
'    </body>' +
'</html>'



http
.createServer(handles.serverHandle)
.listen(8080)