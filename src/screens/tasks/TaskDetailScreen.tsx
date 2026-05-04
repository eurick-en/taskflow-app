import React from 'react';
import { View, Text, Button } from 'react-native';

export default function TaskDetailScreen({ route, navigation }: any) {
  const { task } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Detalhe da Tarefa
      </Text>

      <Text><Text style={{ fontWeight: 'bold' }}>Título:</Text> {task.title}</Text>
      <Text><Text style={{ fontWeight: 'bold' }}>Descrição:</Text> {task.description}</Text>
      <Text><Text style={{ fontWeight: 'bold' }}>Status:</Text> {task.status}</Text>
      <Text><Text style={{ fontWeight: 'bold' }}>Prioridade:</Text> {task.priority}</Text>

      <Button
        title="Editar"
        onPress={() =>
          navigation.navigate('TaskForm' as never, { task } as never)
        }
      />
    </View>
  );
}