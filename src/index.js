import express from 'express';
import router from './router/index.js';
import connectDB from './dbConfig/database.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 9090;
connectDB();

app.use('/', router);
app.listen(PORT, () => {
  try {
    console.log(`🚀🚀 Server is running on port : ${PORT} 🚀🚀`);
  } catch (err) {
    console.log(`Server Connection Error : ${err}`);
  }
});

// BASE_URL
// MONGO_URI
// JWT_SECRET_KEY
