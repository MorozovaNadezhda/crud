import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    axios
      .get('http://localhost:7070/notes')
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:7070/notes/${id}`)
      .then(() => {
        fetchNotes(); // Обновляем список после удаления
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });
  };

  const handleAdd = (content) => {
    axios
      .post('http://localhost:7070/notes', { id: 0, content })
      .then(() => {
        fetchNotes(); // Обновляем список после добавления
      })
      .catch((error) => {
        console.error('Error adding note:', error);
      });
  };

  const handleRefresh = () => {
    fetchNotes(); // Обновляем список заметок
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content}
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <NoteForm onAdd={handleAdd} />
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

const NoteForm = ({ onAdd }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Enter note content'
        required
      />
      <button type='submit'>Add</button>
    </form>
  );
};

export default Notes;
