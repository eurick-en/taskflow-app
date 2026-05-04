import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: Task) => void; // 👈 NOVO
};

export const TaskContext = createContext({} as TaskContextType);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // 🔥 carregar tarefas ao iniciar
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await AsyncStorage.getItem('tasks');
      if (data) {
        setTasks(JSON.parse(data));
      }
    } catch (error) {
      console.log('Erro ao carregar tarefas', error);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    try {
      setTasks(newTasks);
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.log('Erro ao salvar tarefas', error);
    }
  };

  // 🔥 CRIAR
  const addTask = (task: Task) => {
    const newTasks = [...tasks, task];
    saveTasks(newTasks);
  };

  // 🔥 DELETAR
  const deleteTask = (id: string) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    saveTasks(newTasks);
  };

  // 🔥 EDITAR (CORRETO)
  const updateTask = (updatedTask: Task) => {
    const newTasks = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );

    saveTasks(newTasks);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};