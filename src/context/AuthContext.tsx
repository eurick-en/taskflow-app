import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: number;
  username: string;
  password: string;
  role: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

const users: User[] = [
  { id: 1, username: 'admin', password: '123', role: 'admin', name: 'Administrador' },
  { id: 2, username: 'user', password: '123', role: 'user', name: 'Usuário Comum' },
];

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  // 🔥 Carregar usuário salvo
  useEffect(() => {
    async function loadUser() {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    }
    loadUser();
  }, []);

  // 🔥 Login
  const login = async (username: string, password: string) => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      await AsyncStorage.setItem('user', JSON.stringify(foundUser));
    } else {
      alert('Credenciais inválidas');
    }
  };

  // 🔥 Logout
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};