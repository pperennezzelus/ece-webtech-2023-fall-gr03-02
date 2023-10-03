module.exports = {
    serverHandle: function (req, res) {

        const url = require('url')
        const qs = require('querystring')
        const queryParams = qs.parse(url.parse(req.url).query)
   
        const route = url.parse(req.url)
        const path = route.pathname 
        const params = qs.parse(route.query)
      
      
          console.log(path)
          console.log(queryParams)
      
        res.writeHead(200, {'Content-Type': 'text/html'})
      
      
        //res.write(path)
        if(path === '/')
        {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('How this app work\nIf you put a name on the path of the application it will reply something to you \nhello takes a name query parameter and random names reply hello [name] (http://localhost:8080/hello?name=Jean)\nMy own name replies with a short intro of myself \nAny other path replies a 404 code with a not found message')
        }
        else if (path === '/hello' && 'name' in params) {
            if(params['name'] === 'Hugo')
            {
                res.write('I m Hugo the developper of this small application')

            }else{
                res.write('Hello '+ params['name']);
            }

        }else if(path === '/about'){

            const data = require('./content/about.json')
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify(data))
            res.end()
        }
         else{
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('Message not found (404)\n');
        }
        
        res.end()
    } 
  }