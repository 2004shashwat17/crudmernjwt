import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/todos');
      setTodos(res.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      if (isEditing) {
        const res = await axios.put(`http://localhost:5000/api/todos/${editId}`, {
          text: input,
        });
        setTodos(todos.map((todo) => (todo._id === editId ? res.data : todo)));
        setIsEditing(false);
        setEditId(null);
      } else {
        const res = await axios.post('http://localhost:5000/api/todos', {
          text: input,
        });
        setTodos([...todos, res.data]);
      }
      setInput('');
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEdit = (id) => {
    const toEdit = todos.find((todo) => todo._id === id);
    setInput(toEdit.text);
    setIsEditing(true);
    setEditId(id);
  };

  return (
    <div>
      <h2>TODO LIST</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span>{todo.text}</span>
            <div>
              <button onClick={() => handleEdit(todo._id)}>EDIT</button>
              <button onClick={() => handleDelete(todo._id)}>DELETE</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
