// src/Todos.js
import { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import {
  addDoc, collection, deleteDoc,
  doc, onSnapshot, query,
  updateDoc, where, serverTimestamp
} from 'firebase/firestore';
import { toast } from 'react-toastify';

const Todos = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const q = query(
      collection(db, 'todos'),
      where('userId', '==', auth.currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }));
      setTodos(todosData.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!task.trim()) return toast.error('Task cannot be empty');

    if (editId) {
      await updateDoc(doc(db, 'todos', editId), { task });
      toast.success('Task updated');
      setEditId(null);
    } else {
      await addDoc(collection(db, 'todos'), {
        task,
        completed: false,
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid,
      });
      toast.success('Task added');
    }
    setTask('');
  };

  const toggleComplete = async (id, current) => {
    await updateDoc(doc(db, 'todos', id), { completed: !current });
  };

  const handleEdit = (id, currentTask) => {
    setTask(currentTask);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
    toast.success('Task deleted');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <>
      <form onSubmit={handleAdd} className="todo-form">
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>

      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(todo.id, todo.completed)}>
              {todo.task}
            </span>
            <button onClick={() => handleEdit(todo.id, todo.task)}>✏️</button>
            <button onClick={() => handleDelete(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
