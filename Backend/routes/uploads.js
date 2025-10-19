const express = require('express');
const router = express.Router();
const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
const upload = require('../middleware/upload');

// --- Google Cloud Storage Configuration ---
// Make sure you have set up authentication by setting the
// GOOGLE_APPLICATION_CREDENTIALS environment variable
console.log("GOOGLE_APPLICATION_CREDENTIALS:", process.env.GOOGLE_APPLICATION_CREDENTIALS); // DEBUG

const storage = new Storage();
const bucketName = process.env.GCS_BUCKET_NAME; // Add this to your .env file!
console.log("GCS_BUCKET_NAME:", bucketName); // DEBUG

if (!bucketName) {
  console.error("FATAL ERROR: GCS_BUCKET_NAME is not set in .env file.");
  // You might want to exit here in a real app: process.exit(1);
}
const bucket = storage.bucket(bucketName);


// Helper function to upload a file buffer to GCS
const uploadToGCS = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject('No file provided.');
    }

    // This is the missing line that defines 'blob'
    const blob = bucket.file(`${uuidv4()}-${file.originalname.replace(/ /g, '_')}`);

    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      reject(err);
    });

    blobStream.on('finish', async () => {
      try {
        // Make the file publicly readable
        await blob.makePublic();

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      } catch (err) {
        console.error('Error making file public:', err);
        reject('Failed to make file public.');
      }
    });

    blobStream.end(file.buffer);
  });
};


// --- ROUTES ---

// Route to upload a single file
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    const publicUrl = await uploadToGCS(req.file);
    res.status(200).json({ url: publicUrl });
  } catch (error) {
    console.error('GCS Upload Error:', error);
    res.status(500).json({ error: 'File upload failed.' });
  }
});

// Route to upload multiple files
router.post('/upload-multiple', upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded.' });
    }

    const uploadPromises = req.files.map(uploadToGCS);
    const urls = await Promise.all(uploadPromises);

    res.status(200).json({ urls });
  } catch (error) {
    console.error('GCS Multiple Upload Error:', error);
    res.status(500).json({ error: 'File upload failed.' });
  }
});

module.exports = router;