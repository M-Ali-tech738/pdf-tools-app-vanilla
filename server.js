import express from 'express';
import fileUpload from 'express-fileupload';

const app = express();
app.use(express.static('public'));
app.use(fileUpload());

app.post('/api/pdf-to-jpg', async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const file = req.files.file;
    const { data } = file;
    // Placeholder: Implement PDF to JPG conversion with sharp
    res.json({ message: 'PDF to JPG processed (server-side placeholder)' });
  } catch (error) {
    res.status(500).json({ error: 'Processing failed' });
  }
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
