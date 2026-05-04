import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Header from '../../components/Header';
import { ThemeContext } from '../../context/ThemeContext';

export default function HomeScreen() {
  const { colors } = useContext(ThemeContext);

  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://dummyjson.com/quotes/random')
      .then(res => setQuote(res.data.quote))
      .catch(() => setQuote('Erro ao carregar'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header />

      <View style={{ padding: 20 }}>
        <Text style={{ color: colors.text, fontSize: 20 }}>
          Bem-vindo 👋
        </Text>

        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={{ color: colors.subText }}>
            "{quote}"
          </Text>
        )}
      </View>
    </View>
  );
}