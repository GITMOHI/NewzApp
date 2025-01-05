require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Import routes
const newsRoutes = require('./routes/news');
const userRoutes = require('./routes/users');

const corsOptions = {
  origin: ['http://localhost:4200', 'newz-app-front.vercel.app'],
  credentials: true,
};
// Middleware
app.use(express.json());
app.use(cors(corsOptions))


// Routes
app.use('/news', newsRoutes);
app.use('/user',userRoutes);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
};


const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB(); 
  console.log(`Server is running on http://localhost:${PORT}`);
});
