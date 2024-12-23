const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors")

require('dotenv').config();

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors())
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));

// Define Mongoose Schema and Model
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    summary: { type: String }, // Added summary field
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// GEMINI Configuration
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Utility function to handle errors
const handleErrors = (res, error) => res.status(500).json({ error: error.message });

// Generate summary 


async function generateText(content) {
    try {
        const prompt = `Summarize this blog content ${content}`;
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text()
    } catch (error) {
        console.error("Error generating text:", error);
    }
}

generateText()

// Create a new blog post with summary generation
app.post('/posts', upload.single('image'), async (req, res) => {
    try {
        const { title, content } = req.body;

        // Generate summary
        const summary = await generateText(content);

        const newPost = new Post({
            title,
            content,
            image: req.file ? `/uploads/${req.file.filename}` : null,
            summary
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        handleErrors(res, error);
    }
});



// Retrieve all blog posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        handleErrors(res, error);
    }
});

// Retrieve details of a specific blog post
app.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        handleErrors(res, error);
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
