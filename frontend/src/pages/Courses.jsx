import { useEffect, useState } from 'react';
import API from '../api';
import CourseForm from '../components/CourseForm';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await API.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Erro ao buscar cursos:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este curso?')) return;
    try {
      await API.delete(`/courses/${id}`);
      fetchCourses();
    } catch (err) {
      console.error('Erro ao excluir curso:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Cursos</h1>

      <CourseForm onSuccess={fetchCourses} course={editingCourse} clearEdit={() => setEditingCourse(null)} />

      <ul className="mt-6">
        {courses.map((course) => (
          <li key={course.id} className="border p-3 mb-2 rounded flex justify-between items-center">
            <div>
              <strong>{course.title}</strong>
              <p>{course.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => setEditingCourse(course)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(course.id)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
