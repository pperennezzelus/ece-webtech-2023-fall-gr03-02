

// Import modules
const http = require('http')
const handles = require('./handles')

/*
//html string 
const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
'       <p>Hello World!</p>' +
'    </body>' +
'</html>'*/




// Declare an http server
http
.createServer(handles.serverHandle)
.listen(8080)