import express from 'express';
import multer, { diskStorage } from 'multer';
import path, { join, extname } from 'path';
import { writeFileSync, readdir, readFileSync } from 'fs';
import cors from 'cors'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Set up multer for file uploads
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename for each upload
  },
});

const upload = multer({ storage });

const filePath = path.join(__dirname, 'dashboard_data/data.json');

app.use(cors());
// Middleware to parse request body
// app.use(express.bodyParser({limit: '50mb'}));
app.use(express.json({limit: '50mb'}));


// Route to handle file and text uploads
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image file uploaded.');
  }

  const { text } = req.body;
  const filePath = req.file.path;

  // Save text to a file
  const textFilePath = join('uploads', `${Date.now()}-text.txt`);
  writeFileSync(textFilePath, text);

  res.status(200).send(`Image and text uploaded successfully. Image: ${filePath}, Text: ${textFilePath}`);
});

app.post('/api/dashboard', (req, res) => {
    const data = req.body;
  
    // Save the data to a JSON file
    writeFileSync(filePath, JSON.stringify(data, null, 2));
  
    console.log('Data saved to data.json');
    res.json({ message: 'Data received and saved successfully' });
});

app.get('/api/project', (req, res) => {
    try {
        const data = JSON.parse(readFileSync(filePath, 'utf-8'));
        res.json(data);
      } catch (error) {
        console.error('Error reading data.json:', error);
        res.status(500).json({ error: 'Error reading data.json' });
      }
});

// Route to fetch uploaded files
app.get('/files', (req, res) => {
  const uploadsDir = join(__dirname, 'uploads');

  readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading uploads directory');
    }

    const fileList = files.map((file) => {
      const filePath = join(uploadsDir, file);
      const isImage = extname(file).toLowerCase() === '.jpg' || extname(file).toLowerCase() === '.png';
      return { path: filePath, isImage };
    });

    res.status(200).json(fileList);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});