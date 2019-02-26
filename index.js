#!/usr/bin/env node
'use strict'
/*module.exports = () => {
  // ...
};
*/
const fs =  require('fs');
const path =  require('path');
const markdownLinkExtractor = require('markdown-link-extractor');
const fetch = require('node-fetch');
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
          res(console.log(link));
        });
      } else {
        reject(new Error('wooops'));
      }
  });
  return promise;
}

readDir(URLpath);

