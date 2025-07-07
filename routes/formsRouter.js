import express from 'express';
import Form from '../models/Form.js';

const router = express.Router();


router.post('/', async (req, res) => {
  try {

    const { json, html, userId, name } = req.body;

    if (!userId || !name) {
      return res.status(400).json({ message: 'userId and name are required.' });
    }
    const payload = {
      json: req.body.json || null,
      html: req.body.html || null,
      userId: req.body.userId, 
      name,
    };


    const newForm = new Form(payload);
    const savedForm = await newForm.save();

    res.status(201).json(savedForm);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving form' });
  }
});



router.get('/', async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching forms' });
  }
});


router.get('/user/:userId', async (req, res) => {
  try {
    const forms = await Form.find({ userId: req.params.userId });
    res.json(forms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching forms' });
  }
}); 


router.delete('/:id', async (req, res) => {
  try {
    const result = await Form.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json({ message: 'Form deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting form' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { json, html, name } = req.body;
    
    const payload = {
      json: req.body.json || null,
      html: req.body.html || null,
    };

    if (name) payload.name = name;

    const updatedForm = await Form.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.json(updatedForm);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating form' });
  }
});


export default router;
