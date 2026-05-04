import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      padding: 30,
      backgroundColor: '#121212'
    }}>
      <Text style={{
        fontSize: 28,
        color: '#fff',
        marginBottom: 30,
        fontWeight: 'bold'
      }}>
        TaskFlow 🚀
      </Text>

      <TextInput
        placeholder="Usuário"
        placeholderTextColor="#aaa"
        onChangeText={setUsername}
        style={{
          backgroundColor: '#1e1e1e',
          padding: 15,
          borderRadius: 10,
          color: '#fff',
          marginBottom: 10
        }}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setPassword}
        style={{
          backgroundColor: '#1e1e1e',
          padding: 15,
          borderRadius: 10,
          color: '#fff',
          marginBottom: 20
        }}
      />

      <TouchableOpacity
        onPress={() => login(username, password)}
        style={{
          backgroundColor: '#007bff',
          padding: 15,
          borderRadius: 10
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}