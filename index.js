//Importacion del archivo app en el directorio raiz
var app = require('./app');

//Definicion del puerto del servidor
const PORT = 4000 ;

//INICIALIZACION DEL SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor UpImage corriendo en el puerto ${PORT}`)
});
