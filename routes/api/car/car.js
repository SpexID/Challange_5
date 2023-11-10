const Router = require('express').Router;
const db = require('../../../config/database');
const upload = require('../../../upload');

const storage = require('../../../storage'); 

function ApiRouterCar() {
  const router = Router();

  // List
  router.get('/', async (req, res) => {
    const data = await db.select('*').from('car');
    res.status(200).json({
      data,
    });
  });

  // Single
  router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await db.select('*').from('car').where('carid', '=', id);
    res.status(200).json({
      data: data[0],
    });
  });

  // Create
  router.post('/', upload.single('file'), async (req, res) => {
    try {
      const { nama, ukuran, sewa } = req.body;
      const fileBase64 = req.file.buffer.toString('base64');
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;

      const uploadFile = () => {
        return new Promise((resolve, reject) => {
          storage.uploader.upload(file, (err, result) => {
            if (err) {
              console.log(err);
              reject('Failed to upload file');
            } else {
              resolve(result.url);
            }
          });
        });
      };


      const fileUrl = await uploadFile();


      const insertedData = await db('car').insert({
        nama,
        ukuran,
        sewa,
        gambar: fileUrl,
      }).returning('*');

      res.status(201).json({
        message: 'Create success!',
        data: insertedData[0],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  });

  return router;
}

module.exports = ApiRouterCar;
