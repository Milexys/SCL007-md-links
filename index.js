#!/usr/bin/env node

const fs =  require('fs');
const path =  require('path');
const markdownLinkExtractor = require('markdown-link-extractor');
//const https = require('https');
const chalk = require('chalk');
const fetch = require('node-fetch');
//const _ = require('lodash');

const URLpath = process.argv[2];

    const readDirOrFile = (URLpath) => {
      let promise = new Promise((res, reject) => {
        let URLabsolute = path.resolve(URLpath);
        let extensionFile = path.extname(URLabsolute);
        if (fs.lstatSync(URLabsolute).isDirectory()){
          fs.readdirSync(URLabsolute).forEach(file => { 
            if (fs.lstatSync(URLabsolute + "/" + file).isDirectory() || path.extname(URLabsolute + "/" + file) === '.md'){
              readDirOrFile(URLabsolute + "/" + file); 
            } /* else {
              console.log("soy un archivo cualquiera")
            }  */   
          }); 
        }
        else if (fs.lstatSync(URLabsolute).isFile() && extensionFile === '.md'){
          let markdown = fs.readFileSync(URLabsolute).toString();
          let links = markdownLinkExtractor(markdown);
          links.forEach(function (link) {
            return res(fetch(link)
            .then(res => {
              return console.log({"href": res.url,  "status": res.status}) 
            })
            .catch(error => {return error})
          )})
        }
        else {
          reject(new Error('ups'))
        }
      })
    return promise;
  }

         
        
    readDirOrFile(URLpath);

  


