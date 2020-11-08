
   const express = require('express');
   const app = express();
   const bodyParser = require('body-parser');
   const pool = require('./PostgresConnection').pool;
   const multer  = require('multer');
   const port = process.env.PORT || 3000;
   const cors = require('cors');

   app.use(cors());

   // Rename the uploaded file to timestamp and add file extension.
   const storage = multer.diskStorage({
      destination: function (req, file, cb) {
         cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
         cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`);
      }
   });

   // File should be a Jpeg image and size should be less than 1MB.
   const upload = multer({ 
      fileFilter: (req, file, cb) => {

         if (file.mimetype !== 'image/jpeg') {
            return cb(new Error('Incorrect File Type.'));
         }
         cb(null, true);
       },
       limits: {
         files: 1,
         fileSize: 1024 * 1024,
      },
      storage: storage
   });

   const handleError = (err) => {
      throw err;
   };

   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(bodyParser.json());

   app.get('/getBannerByLocationId/:locId', function (req, res) {

      const query = `SELECT public."getBanners"(${req.params.locId})`;
      console.log(query);

      pool.query(query)
         .then((result) => {
            res.status(200).json(result.rows[0].getBanners);
         })
         .catch((err) => { 
            handleError(err);
         });
   });

   app.get('/getBannerById/:id', function (req, res) {

      const query = `SELECT public."getBannerById"(${req.params.id})`;

      pool.query(query)
         .then((result) => {
            res.status(200).json(result.rows[0].getBannerById);
         })
         .catch((err) => { 
            handleError(err);
         });
   });

   app.get('/uploads/:file', (req, res) => res.download('./uploads/' + req.params.file))

   // Upload the image and save the record in the database.
   app.post('/createBanner', upload.single('avatar'), function (req, res) {
      
      console.log(req.file);

      const name = req.body.name;
      const description = req.body.description;
      const locationId = parseInt(req.body.location);
      const url = req.body.url;

      const query = `SELECT public.createbanner('${name}','${description}',${locationId},'${req.file.filename}','${url}')`;
      console.log(query);
      pool.query(query)
         .then((result) => {
            res.status(200).json(result.rows);
         })
         .catch((err) => { 
            handleError(err);
         });
   });

   app.listen(port, function () { 
      console.log(`Listening on port : ${port}`);
   });