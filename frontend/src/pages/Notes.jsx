import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Notes() {
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadNote = async () => {
      try {
        const res = await API.get('/notes');
        if (res.data.length > 0) setNote(res.data[0].conteudo);
      } catch (err) {
        console.error('Erro ao carregar nota:', err);
      }
    };
    loadNote();
  }, []);

  const saveNote = async () => {
    try {
      await API.post('/notes', { conteudo: note });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Erro ao salvar nota:', err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Minhas Anotações</h1>
      <textarea
        className="w-full h-60 p-4 border border-gray-300 rounded mb-4"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Escreva suas anotações aqui..."
      />
      <button
        onClick={saveNote}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Salvar Anotação
      </button>
      {saved && <p className="text-green-600 mt-2">Anotação salva com sucesso!</p>}
    </div>
  );
}