import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const { colors, toggleTheme } = useContext(ThemeContext);

  return (
    <View
      style={{
        padding: 15,
        backgroundColor: colors.card,
        borderBottomWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text }}>
        {user?.name}
      </Text>

      <Text style={{ color: colors.subText }}>{user?.role}</Text>

      <TouchableOpacity onPress={toggleTheme}>
        <Text style={{ color: colors.primary, marginTop: 5 }}>
          Alternar Tema
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout}>
        <Text style={{ color: colors.danger, marginTop: 5 }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}