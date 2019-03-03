const mdlinks = require('./promise.js');

const URLpath = process.argv[2];

if (require.main === module){
  mdlinks.mdlinks(URLpath)
  .then((response) => {
    console.log(response)
  }, (error) =>{
    console.log(error)
  })
}
module.exports.mdlinks = mdlinks;

  


