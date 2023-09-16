// Necessary imports
const url = require('url')
const qs = require('querystring')
const fs = require('fs')


module.exports = {
  //callback function
  serverHandle: function (req, res) {
    
    const route = url.parse(req.url)
    const path = route.pathname 
    const params = qs.parse(route.query)
          
    res.writeHead(200, {'Content-Type': 'text/plain'})
          
    if (path === '/hello' && 'name' in params) {
      if(params['name']=='paul')
      {
        res.write('Hello ! My name is Paul, I am an engineering student, and I live in France')
      }    
      else
      {
        res.write('Hello [name]\nIf you want to learn more about me use "name=paul" in the query parameters')
      }
      
    } 
    else if (path === '/about') {
      // Lire le fichier JSON
      fs.readFile('content/about.json', 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'})
          res.write('Error  JSON file')
          console.error(err)
        } else {
          // Envoyer le contenu du fichier JSON en tant que réponse JSON
          res.writeHead(200, {'Content-Type': 'application/json'})
          res.write(data)
          
          console.log(data);
        }
        res.end()
      })
    }
    else if (path == '/') {
      res.write('Use the link : http://localhost:8080/hello?name=paul \n\nto learn more about me ! :)\n')
    }
    else{
      res.write('404 not found')
    }       

    res.end()
  }
} 