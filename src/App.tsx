import React, { useState } from 'react';
import UserContext, { UserDetails } from './contexts/UserContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Documents from './pages/Documents';
import Upload from './pages/Upload';
import CreateTask from './pages/CreateTask';
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import TaskDetails from './pages/TaskDetails';

function App() {
  const [user, setUser] = useState<UserDetails | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/upload" element={<Upload />} />
        {user?.role === 'MANAGER' && (
          <Route path="/create-task" element={<CreateTask />} />
        )}
        <Route path="/task/:id" element={<TaskDetails />} />
      </Routes>
    </UserContext.Provider>
  );
}
export default App;
