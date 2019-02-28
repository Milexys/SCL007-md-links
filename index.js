#!/usr/bin/env node

const fs =  require('fs');
const path =  require('path');
const markdownLinkExtractor = require('markdown-link-extractor');
const chalk = require('chalk');
const fetch = require('node-fetch');



const URLpath = process.argv[2];
const validate = process.argv.indexOf("--validate");

    const readDirOrFile = (URLpath) => {
        let URLabsolute = path.resolve(URLpath);
        let extensionFile = path.extname(URLabsolute);
        if (fs.lstatSync(URLabsolute).isDirectory()){
          fs.readdirSync(URLabsolute).forEach(file => { 
            if (fs.lstatSync(URLabsolute + "/" + file).isDirectory() || path.extname(URLabsolute + "/" + file) === '.md'){
              readDirOrFile(URLabsolute + "/" + file); 
            }   
          }); 
        }
        else if (fs.lstatSync(URLabsolute).isFile() && extensionFile === '.md'){
          let markdown = fs.readFileSync(URLabsolute).toString();
          let links = markdownLinkExtractor(markdown);
          makePromises(links);
        }
  } 

  const makePromises = (links) => {
    let URLabsolute = path.resolve(URLpath);
    const arr = [];
    for(let i = 0; i < links.length; i++){
      const link = links[i];
      const text = links[i].text;
      const fetchLinks =  fetch(link)
      .then(res => {
        if (validate === 3){
          const objectLinks = {
            url: res.url,
            text: text,
            file: URLabsolute,
            statusLink: res.status,
            statusText: res.statusText,
          };
          return objectLinks;
        } else{
          const objectLinks = {
            url: res.url,
            text: text,
            file: URLabsolute,
          };
          return objectLinks;
        }
      })
      .catch(error => {
        const objectLinks = {
          url: link,
          statusLinks: "Fail",
        };
        return objectLinks;
      })
      arr.push(fetchLinks);
    }
    Promise.all(arr)
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log(error)
    })
  }

  readDirOrFile(URLpath);


  


