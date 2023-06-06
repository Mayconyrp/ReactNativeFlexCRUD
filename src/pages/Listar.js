import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert
} from 'react-native';
import {
    listarDepoimentos,
    atualizarDepoimento,
    excluirDepoimento,
} from '../api/listarApi';

const DepoimentosScreen = () => {
    const [depoimentos, setDepoimentos] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDepoimento, setEditedDepoimento] = useState(null);
    const [editedNome, setEditedNome] = useState('');
    const [editedDepoimentoText, setEditedDepoimentoText] = useState('');

    useEffect(() => {
        fetchDepoimentos();
    }, [refreshKey]);

    const fetchDepoimentos = async () => {
        try {
            const depoimentos = await listarDepoimentos();
            setDepoimentos(depoimentos);
        } catch (error) {
            console.error('Erro ao buscar depoimentos:', error);
        }
    };

    const handleEditDepoimento = (depoimento) => {
        setIsEditing(true);
        setEditedDepoimento(depoimento);
        setEditedNome(depoimento.nome);
        setEditedDepoimentoText(depoimento.depoimento);
    };

    const handleUpdateDepoimento = async () => {
        if (!editedNome || !editedDepoimentoText) {
            console.error('Nome e depoimento são campos obrigatórios');
            return;
        }
    
        try {
            await atualizarDepoimento(
                editedDepoimento.id,
                editedNome,
                editedDepoimentoText
            );
            setIsEditing(false);
            setEditedDepoimento(null);
            setEditedNome('');
            setEditedDepoimentoText('');
            setRefreshKey((prevKey) => prevKey + 1);
            console.log('Dados atualizados com sucesso');
            Alert.alert('Sucesso', 'Dados atualizados com sucesso');
        } catch (error) {
            console.error('Erro ao atualizar depoimento:', error);
        }
    };
        const handleDeleteDepoimento = async (id) => {
        try {
            await excluirDepoimento(id);
            setRefreshKey((prevKey) => prevKey + 1);
        } catch (error) {
            console.error('Erro ao excluir depoimento:', error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedDepoimento(null);
        setEditedNome('');
        setEditedDepoimentoText('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>ID</Text>
                    <Text style={styles.tableHeader}>Nome</Text>
                    <Text style={styles.tableHeader}>Depoimento</Text>
                    <Text style={styles.tableHeader}>Ações</Text>
                </View>
                {depoimentos.map((depoimento) => (
                    <View style={styles.tableRow} key={depoimento.id}>
                        <Text style={styles.tableData}>{depoimento.id}</Text>
                        <Text style={styles.tableData}>{depoimento.nome}</Text>
                        <Text style={styles.tableData}>{depoimento.depoimento}</Text>
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => handleEditDepoimento(depoimento)}
                            >
                                <Text style={styles.buttonText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDeleteDepoimento(depoimento.id)}
                            >
                                <Text style={styles.buttonText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>

            <Modal visible={isEditing} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalLabel}>Nome:</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={editedNome}
                            onChangeText={setEditedNome}
                        />

                        <Text style={styles.modalLabel}>Depoimento:</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={editedDepoimentoText}
                            onChangeText={setEditedDepoimentoText}
                            multiline={true}
                        />

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={handleCancelEdit}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.updateButton}
                                onPress={handleUpdateDepoimento}
                            >
                                <Text style={styles.buttonText}>Atualizar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    table: {
        flex: 1,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 8,
    },
    tableHeader: {
        flex: 1,
        fontWeight: 'bold',
    },
    tableData: {
        flex: 1,
    },
    actionsContainer: {
        flexDirection: 'row',
    },
    editButton: {
        marginRight: 8,
        backgroundColor: '#2196F3',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
    },
    deleteButton: {
        backgroundColor: '#F44336',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 16,
    },
    modalLabel: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    cancelButton: {
        marginRight: 8,
        backgroundColor: 'red',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
    },
    updateButton: {
        backgroundColor: '#009688',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default DepoimentosScreen;