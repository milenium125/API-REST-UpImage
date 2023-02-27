//Importacion de Router
const {Router} = require('express');

const router = Router();

const multer = require('multer');
const mimeTpe = require('mime-types');

const path = require('path');

const storage = multer.diskStorage({
    destination: './imagesUploads/',
    filename: function(req,file, cb){
        cb("", Date.now() + "."+ mimeTpe.extension(file.mimetype));
    }
})
var upload = multer({
    storage: storage
});

router.get("/home", (req, res) => {
    console.log("Hola Mundo desde Routers");
    res.status(200).send("<h1>Hola Mundo</h1>");
});

router.post('/uploading-files', upload.single('file'),(req, res) => { //, upload.single('file')
   var file_name = req.file || "name_file_proto";
   
   console.log(file_name);
    res.status(200).send({
        "file_name": file_name['fieldname']+mimeTpe,
        "link":path.resolve(__dirname,'../imagesUploads',file_name['filename'])
    });

    console.log("Funcionando Metodo Post");
});

module.exports = router;