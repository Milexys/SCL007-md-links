/*module.exports = () => {
  // ...
};
*/
const fs =  require ('fs');

fs.readFile("./README.md",function(err, data){
  if (err){
    console.log(err)
  }
  console.log(data.toString());
})