import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  const handleCadastroPress = () => {
    console.log('Botão de Cadastro pressionado');
    navigation.navigate('Cadastro');
  };

  const handleListarPress = () => {
    console.log('Botão de Listar pressionado');
    navigation.navigate('Listar');
  };

  console.log('Renderizando a tela Home');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página Inicial</Text>
      <View style={styles.buttonContainer}>
        <Button title="Ir para Cadastro" onPress={handleCadastroPress} color="#2196F3" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Ir para Listar" onPress={handleListarPress} color="#4CAF50" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    marginBottom: 16,
    width: '80%',
  },
});

export default Home;
