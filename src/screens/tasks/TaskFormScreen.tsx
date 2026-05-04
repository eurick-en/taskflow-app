import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { TaskContext } from '../../context/TaskContext';
import { Task } from '../../types/task';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskForm'>;

export default function TaskFormScreen({ route, navigation }: Props) {
  const { addTask, updateTask } = useContext(TaskContext);

  const taskToEdit = route.params?.task;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // 👇 preenche os campos ao editar
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSave = () => {
    if (!title) {
      alert('Título é obrigatório');
      return;
    }

    if (taskToEdit) {
      // 🔥 EDITAR (AGORA CORRETO)
      const updatedTask: Task = {
        ...taskToEdit,
        title,
        description,
        updatedAt: new Date().toISOString(),
      };

      updateTask(updatedTask);

    } else {
      // 🔥 CRIAR
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        description,
        status: 'pendente',
        priority: 'media',
        category: 'geral',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      addTask(newTask);
    }

    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        {taskToEdit ? 'Editar Tarefa' : 'Nova Tarefa'}
      </Text>

      <Text>Título</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título"
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Descrição</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Digite a descrição"
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Button
        title={taskToEdit ? 'Salvar alterações' : 'Criar tarefa'}
        onPress={handleSave}
      />
    </View>
  );
}