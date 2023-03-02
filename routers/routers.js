const fs = require('fs-extra');
//Importacion de Router
const {Router} = require('express');

const URL = 'https://apirest-upimage.onrender.com';

const router = Router();

const multer = require('multer');
const mimeTpe = require('mime-types');

const path = require('path');
const { dirname } = require('path');



const storage = multer.diskStorage({
    destination: 'public/imagesUploads',
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
router.get("/image/:id", async (req, res) => {
    res.contentType('file');
    let fullname_image = req.params.id;
    let ext = fullname_image.split('.').pop();
    let ruta_image = path.resolve(`public/imagesUploads/${fullname_image}`);
    console.log('antes if')
    if(fs.existsSync(ruta_image)){
        console.log('despues if')
        res.setHeader('Content-disposition', 'attachment; filename=' + fullname_image);
        res.setHeader('Content-type', 'image/jpeg (.jpg, .jpeg, .jfif, .pjpeg, .pjp, .png)');  
        res.sendFile(ruta_image);
    }else{
        res.setHeader('Content-disposition', 'attachment; filename= no-image.png');
        res.setHeader('Content-type', 'image/jpeg (.jpg, .jpeg, .jfif, .pjpeg, .pjp, .png)');
        console.log('no existe la imagen');
        const image_default = path.resolve('public/imagesUploads/no-image.jpg');
        res.sendFile(image_default);
    }
    
    console.log(ruta_image);
});

router.post('/uploading-files', upload.single('file'),(req, res) => {
   var file_name = req.file || "name_file_proto";
   console.log('post');
   console.log(file_name);
    res.status(200).send({
        "file_name": file_name['fieldname']+mimeTpe,
        "link": `https://up-image.onrender.com//image/${file_name['filename']}`
    });

    console.log("Funcionando Metodo Post");
});

module.exports = router;