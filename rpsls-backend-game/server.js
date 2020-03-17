const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

let playerScore = 0
let computerScore = 0
// document.getElementById(`rock`).onclick = pThrowsRock
// document.getElementById(`paper`).onclick = pThrowsPaper
// document.getElementById(`scizzor`).onclick = pThrowsScizzor
// document.getElementById(`lizard`).onclick = pThrowsLizard
// document.getElementById(`spock`).onclick = pThrowsSpock

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
   else if (page == '/api') {
     function getRandomWeapon(){
       let ranNum = Math.random()
       let computerWeapon = "rock"
       if(ranNum < .2){
         computerWeapon = "paper"
       }else if(ranNum < .4){
         computerWeapon = "scizzor"
       }else if(ranNum < .6){
         computerWeapon = "lizard"
       }else if(ranNum < .8){
         computerWeapon = "spock"
       }else{
         return computerWeapon
       }
     }
    if('playerChoice' in params){
      if(params['playerChoice']== 'rock'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "leon",
          status: "Boss Man",
          currentOccupation: "Baller"
        }
        res.end(JSON.stringify(objToJson));
      }//student = leon
      else if(params['student'] != 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "unknown",
          status: "unknown",
          currentOccupation: "unknown"
        }
        res.end(JSON.stringify(objToJson));
      }//student != leon
    }//student if
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
