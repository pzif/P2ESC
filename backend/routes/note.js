const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const authMiddleware = require('../middleware/auth');

// Criar uma nova anotação
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { courseId, content } = req.body;
    const note = new Note({
      userId: req.user.id,
      courseId,
      content,
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar anotação' });
  }
});

// Listar anotações do usuário
router.get('/', authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar anotações' });
  }
});

// Deletar uma anotação
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!note) {
      return res.status(404).json({ error: 'Anotação não encontrada' });
    }
    res.json({ message: 'Anotação excluída' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir anotação' });
  }
});

module.exports = router;
