import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image } from 'react-native';
import { cadastrarDepoimento } from '../api/cadastrarApi';
import { useNavigation } from '@react-navigation/native';

const CadastroForm = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [depoimento, setDepoimento] = useState('');
    const [mensagem, setMensagem] = useState('');

    const navigation = useNavigation();

    const handleSubmit = () => {
        const formData = {
            nome: nome,
            email: email,
            depoimento: depoimento,
        };

        console.log('Enviando dados:', formData);

        cadastrarDepoimento(formData)
            .then(response => {
                console.log('Dados enviados com sucesso:', response);
                setMensagem('Dados enviados com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao enviar os dados:', error);
                setMensagem('Erro ao enviar os dados. Por favor, tente novamente.');
            });
    };

    const navigateToAnotherPage = () => {
        console.log('Navegando para outra página...');
        navigation.navigate('Listar');
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/cidade-do-vaticano.png')}
                resizeMode="contain"
            />
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={text => setNome(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Digite seu depoimento."
                value={depoimento}
                onChangeText={text => setDepoimento(text)}
            />
            <Button title="Enviar Dados" onPress={handleSubmit} />
            <Text style={styles.mensagem}>{mensagem}</Text>
            <Button title="Ir para outra página" onPress={navigateToAnotherPage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#f3f3f3',
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 16,
    },
    input: {
        marginBottom: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    mensagem: {
        marginTop: 16,
        color: 'green',
        textAlign: 'center',
    }
});

export default CadastroForm;
