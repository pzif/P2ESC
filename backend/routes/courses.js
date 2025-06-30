const express = require('express');
const Course = require('../models/Course');
const auth = require('../middleware/auth');

const router = express.Router();

// Criar curso
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = await Course.create({ title, description });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar curso' });
  }
});

// Listar todos os cursos
router.get('/', auth, async (req, res) => {
  const courses = await Course.findAll();
  res.json(courses);
});

// Atualizar curso
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const updated = await Course.update(
      { title, description },
      { where: { id: req.params.id } }
    );
    res.json({ message: 'Curso atualizado', updated });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar curso' });
  }
});

// Deletar curso
router.delete('/:id', auth, async (req, res) => {
  try {
    await Course.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Curso deletado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar curso' });
  }
});

module.exports = router;
