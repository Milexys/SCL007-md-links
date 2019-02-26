#!/usr/bin/env node
'use strict'
/*module.exports = () => {
  // ...
};
*/
const fs =  require('fs');
const path =  require('path');
const markdownLinkExtractor = require('markdown-link-extractor');
const https = require('https');
//const fetch = require('node-fetch');
//const _ = require('lodash');

const URLpath = process.argv[2];

function readDir (URLpath){
  let promise = new Promise((res, reject) => {
    let URLabsolute = path.resolve(URLpath);
    let extensionFile = path.extname(URLabsolute);
     if (extensionFile === '.md') {
        let markdown = fs.readFileSync(URLabsolute).toString();
        let links = markdownLinkExtractor(markdown);
        links.forEach(function (link) { 
          res(https.get(link, (res)=>{
            if (res.statusCode >= 200 && res.statusCode <= 208){
              console.log(link + ' link is OK');
            }
            else if (res.statusCode >= 300 && res.statusCode <= 308) {
              console.log(link + ' Redirect');
            }
            else if(res.statusCode >= 400 && res.statusCode <= 451) {
              console.log(link + ' Not Found');
            }
          }));
        });
      } else {
        reject(new Error('wooops'));
      }
  });
  return promise;
}

readDir(URLpath);

