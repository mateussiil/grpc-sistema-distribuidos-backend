const multer = require('multer');
const path = require('path');

const config = {
  storage: multer.diskStorage({
    destination: async (request, file, callback) => {
      console.log(path.resolve(__dirname, 'uploads','images','product'))
      console.log(file)
      callback(null, path.resolve(__dirname, 'uploads','images','product'));
    },
    filename: (request, file, callback) => {
      console.log(file)
      callback(null, file.originalname);
    }
  })
}

module.exports = config;
