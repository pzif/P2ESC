import { useEffect, useState } from 'react';
import API from '../api';

export default function CourseForm({ onSuccess, course, clearEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDescription(course.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [course]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (course) {
        await API.put(`/courses/${course.id}`, { title, description });
        clearEdit();
      } else {
        await API.post('/courses', { title, description });
      }
      onSuccess();
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Erro ao salvar curso:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <input
        type="text"
        placeholder="Título do curso"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        {course ? 'Atualizar' : 'Criar'}
      </button>
      {course && (
        <button type="button" onClick={clearEdit} className="ml-2 text-sm text-gray-600 underline">
          Cancelar edição
        </button>
      )}
    </form>
  );
}
