import express from 'express';
import Word from '../models/Word.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET ALL WORDS (Only for the logged in user)
router.get('/', verifyToken, async (req, res) => {
  try {
    const words = await Word.find({ user: req.user._id });
    res.json(words);
  } catch (err) {
    res.json({ message: err });
  }
});

// ADD WORD
router.post('/', verifyToken, async (req, res) => {
  const word = new Word({
    word: req.body.word,
    meaning: req.body.meaning,
    difficulty: req.body.difficulty,
    user: req.user._id // Taken from the token
  });

  try {
    const savedWord = await word.save();
    res.json(savedWord);
  } catch (err) {
    res.json({ message: err });
  }
});

// EDIT WORD
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedWord = await Word.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // Find word by ID and Owner
      { 
        $set: { 
          word: req.body.word, 
          meaning: req.body.meaning, 
          difficulty: req.body.difficulty 
        } 
      },
      { new: true } // This tells MongoDB to return the *updated* version, not the old one
    );
    res.json(updatedWord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE WORD
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const removedWord = await Word.deleteOne({ _id: req.params.id, user: req.user._id });
    res.json(removedWord);
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;