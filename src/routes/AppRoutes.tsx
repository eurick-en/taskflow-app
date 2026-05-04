import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import TabRoutes from './TabRoutes';

export default function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <TabRoutes /> : <LoginScreen />}
    </NavigationContainer>
  );
}