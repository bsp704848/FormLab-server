import express , { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import formsRouter from './routes/formsRouter.js';
import authRouter from './routes/auth.js'


dotenv.config();
const app = express();

app.use(cors());
app.use(json());


connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});


app.use('/api/forms', formsRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Server running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
