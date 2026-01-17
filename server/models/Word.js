import mongoose from 'mongoose';

const WordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  meaning: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // The Owner
}, { timestamps: true });

export default mongoose.model('Word', WordSchema);