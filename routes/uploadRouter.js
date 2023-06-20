// Import necessary libraries
const express = require('express');
const authenticate = require('../authenticate');
const multer = require('multer');

// Setup multer storage
const storage = multer.diskStorage({
    // Set where to store the files
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    // Set the name of the file
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

// Filter for only image files
const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

// Configure multer for upload
const upload = multer({ storage: storage, fileFilter: imageFileFilter });

// Setup router for image uploads
const uploadRouter = express.Router();

// Define routes for the image upload endpoint
uploadRouter
    .route('/')
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        // GET operation is not supported
        res.statusCode = 403;
        res.end('GET operation not supported on /imageUpload');
    })
    .post(
        authenticate.verifyUser,
        authenticate.verifyAdmin,
        upload.single('imageFile'),
        (req, res) => {
            // Handle the POST request for image upload
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(req.file);
        }
    )
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        // PUT operation is not supported
        res.statusCode = 403;
        res.end('PUT operation not supported on /imageUpload');
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        // DELETE operation is not supported
        res.statusCode = 403;
        res.end('DELETE operation not supported on /imageUpload');
    });

// Export the router
module.exports = uploadRouter;
