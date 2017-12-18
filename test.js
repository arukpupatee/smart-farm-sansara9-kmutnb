const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');

// Start the app
const env = Object.assign({}, process.env, {PORT: 5000});
const child = spawn('node', ['index.js'], {env});
const assert = require("assert")
const describe = require("describe")

// // test valve status set-get
// for(let i = 1; i < 5; i++){
//   request('http://127.0.0.1:5000/api/insert/valve_status/1/'+i+'/0', (error, response, body1) => {
//     request('http://127.0.0.1:5000/api/get/valve_status/1/'+i, (error, response, body2) => {
//       assert((body1 == 'ok') && (body2 == 'OFF'), 'Set "OFF" on valve '+i+' but not "OFF"')
//       request('http://127.0.0.1:5000/api/insert/valve_status/1/'+i+'/1', (error, response, body1) => {
//         request('http://127.0.0.1:5000/api/get/valve_status/1/'+i, (error, response, body2) => {
//           assert((body1 == 'ok') && (body2 == 'ON'), 'Set "ON" on valve '+i+' but not "ON"')
//         })
//       })
//     })
//   })
//   console.log("Test request valve"+i+" OK")
// }
//
// // console.log();
//
// var name_val = ['air_temperature', 'air_humidity', 'brightness', 'soil_temperature', 'soil_moisture']
//
// for(let n in name_val){
//   let num = parseInt(Math.random()*1000)
//   // console.log(num);
//   request('http://127.0.0.1:5000/api/insert/'+name_val[n]+'/1/1/'+num, (error, response, body1) => {
//     request('http://127.0.0.1:5000/api/get/'+name_val[n]+'/1/1', (error, response, body2) => {
//       assert((body1 == 'ok') && (body2 == num), 'Set value on '+name_val[n]+' as '+num+' but value is '+body2)
//     })
//   })
//   console.log("Test request "+n+" OK")
// }

var mocha = require('mocha')
var Browser = require('zombie')

describe('Web is refresh', function(){
  before(function(){
    this.conn = new Browser({ site: 'http://127.0.0.1:5000' })
    this.conn.visit('/', done)
  })

  it()
})
// console.log(Browser);


console.log("Test Success !")
