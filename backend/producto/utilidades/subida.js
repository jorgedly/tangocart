const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const imageThumbnail = require('image-thumbnail');
const { BUCKET_NAME, S3_ENDPOINT, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env;
const endpoint = new AWS.Endpoint(S3_ENDPOINT);
const s3 = new AWS.S3({
    endpoint,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
});

async function guardar(objFoto, carpeta) {
    const { imgBase64, nombreOriginal, extension } = objFoto;
    const imagen = Buffer.from(imgBase64, 'base64');
    const thumbnail = await imageThumbnail(imgBase64);
    const nombreArchivo = `${nombreOriginal}-${uuidv4()}.${extension}`;
    const url_foto = await subir(carpeta, nombreArchivo, imagen);
    const url_thumbnail = await subir(`thumbnail_${carpeta}`, nombreArchivo, thumbnail);
    return { url_foto, url_thumbnail };
}

async function subir(carpeta, nombre, archivo) {
    try {
        const url = await s3.upload({
            Bucket: BUCKET_NAME,
            Key: `${carpeta}/${nombre}`,
            Body: archivo,
            ACL: 'public-read'
        }).promise();
        return url.Location;
    } catch (error) {
        console.log(error);
    }
}

module.exports = guardar;