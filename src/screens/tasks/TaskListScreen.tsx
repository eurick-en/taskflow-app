import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { TaskContext } from '../../context/TaskContext';
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../../types/navigation';
import Header from '../../components/Header';

type NavigationProps = NativeStackNavigationProp<
  TaskStackParamList,
  'TaskList'
>;

export default function TaskListScreen() {
  const { tasks, deleteTask, updateTask } = useContext(TaskContext);
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProps>();

  const [filter, setFilter] = useState<'todas' | 'pendente' | 'concluida'>('todas');

  const filteredTasks =
    filter === 'todas'
      ? tasks
      : tasks.filter((task) => task.status === filter);

  const handleDelete = (id: string) => {
    if (Platform.OS === 'web') {
      if (confirm('Excluir tarefa?')) deleteTask(id);
    } else {
      Alert.alert('Excluir', 'Tem certeza?', [
        { text: 'Cancelar' },
        { text: 'Excluir', onPress: () => deleteTask(id) },
      ]);
    }
  };

  const toggleStatus = (task: any) => {
    updateTask({
      ...task,
      status: task.status === 'concluida' ? 'pendente' : 'concluida',
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header />

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, color: colors.text, marginBottom: 10 }}>
          Tarefas
        </Text>

        {/* FILTRO */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 15 }}>
          {['todas', 'pendente', 'concluida'].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f as any)}
              style={{
                padding: 8,
                borderRadius: 6,
                backgroundColor: filter === f ? colors.primary : colors.card,
              }}
            >
              <Text style={{ color: filter === f ? '#fff' : colors.text }}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: colors.card,
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TaskDetail', { task: item })
                }
              >
                <Text
                  style={{
                    color: colors.text,
                    fontWeight: 'bold',
                    textDecorationLine:
                      item.status === 'concluida' ? 'line-through' : 'none',
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>

              <Text style={{ color: colors.subText }}>
                {item.status}
              </Text>

              <TouchableOpacity onPress={() => toggleStatus(item)}>
                <Text style={{ color: colors.primary }}>
                  {item.status === 'concluida'
                    ? 'Reabrir'
                    : 'Concluir'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={{ color: colors.danger }}>
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            padding: 12,
            borderRadius: 8,
            marginTop: 10,
          }}
          onPress={() => navigation.navigate('TaskForm')}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>
            + Nova Tarefa
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}