//Importacion de Router
const {Router} = require('express');

const URL = 'https://apirest-upimage.onrender.com';

const router = Router();

const multer = require('multer');
const mimeTpe = require('mime-types');

const path = require('path');
const { dirname } = require('path');

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
// router.get("/image/:id", (req, res) => {
//     res.writeHead(200,{'content-type':'image/jpg'});
//     fs.createReadStream(path.join(__dirname, '../imagesUploads','1677469246131.png')).pipe(res);
//     // let id = req.params.id;
//     // let name_image = '';
//     // for (let i = 0; i < id.length; i++) {
//     //     if(id[i] == '.'){
//     //         break;
//     //     }else{
//     //         name_image = name_image + id[i];
//     //     }   
//     // }
//     // let ruta_image = ;
//     // const send_image = require(path.join(__dirname, '../imagesUploads',name_image));
//     // console.log(ruta_image);
//     res.status(200).send();
// });

router.post('/uploading-files', upload.single('file'),(req, res) => { //, upload.single('file')
   var file_name = req.file || "name_file_proto";
   
   console.log(file_name);
    res.status(200).send({
        "file_name": file_name['fieldname']+mimeTpe,
        "link":path.resolve('https://apirest-upimage.onrender.com','/imagesUploads',file_name['filename'])
    });

    console.log("Funcionando Metodo Post");
});

module.exports = router;