import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  json: {
    type: mongoose.Schema.Types.Mixed, 
    default: null,
  },
  html: {
    type: String,
    default: null,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Form', formSchema);
