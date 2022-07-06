const multer = require('multer');

let document = multer({
    storage:multer.diskStorage({
        destination : (req,file,callback) =>{
            let path = './document';
            callback(null,path);
        },
        filename:(req,file,callback)=>{
            callback(null,Date.now()+'-'+file.originalname)
        }
    })
})
module.exports = document;