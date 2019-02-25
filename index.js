#!/usr/bin/env node

/*module.exports = () => {
  // ...
};
*/
const fs =  require ('fs');
const path =  require ('path');
const fetch = require('node-fetch');


function readDir (dir){

  fs.readdir(dir, function(err, files){
    if (err){
      console.log(err)
    }
    console.log(files);
  })

}
console.log(readDir("./"));
