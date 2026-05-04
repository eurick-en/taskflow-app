import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TaskListScreen from '../screens/tasks/TaskListScreen';
import TaskFormScreen from '../screens/tasks/TaskFormScreen';
import TaskDetailScreen from '../screens/tasks/TaskDetailScreen';

const Stack = createNativeStackNavigator();

export default function TaskStackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TaskList" component={TaskListScreen} />
      <Stack.Screen name="TaskForm" component={TaskFormScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
    </Stack.Navigator>
  );
}