import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import axios from 'axios';

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
            const response = await axios.get('http://localhost:8080/depoimentos');
            setDepoimentos(response.data);
        } catch (error) {
            console.error('Error fetching depoimentos:', error);
        }
    };

    const handleEditDepoimento = (depoimento) => {
        setIsEditing(true);
        setEditedDepoimento(depoimento);
        setEditedNome(depoimento.nome);
        setEditedDepoimentoText(depoimento.depoimento);
    };

    const handleUpdateDepoimento = async () => {
        try {
            await axios.put(`http://localhost:8080/depoimentos/update/${editedDepoimento.id}`, {
                nome: editedNome,
                depoimento: editedDepoimentoText
            });

            setIsEditing(false);
            setEditedDepoimento(null);
            setEditedNome('');
            setEditedDepoimentoText('');
            setRefreshKey((prevKey) => prevKey + 1);
        } catch (error) {
            console.error('Error updating depoimento:', error);
        }
    };

    const handleDeleteDepoimento = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/depoimentos/delete/${id}`);
            setRefreshKey((prevKey) => prevKey + 1);
        } catch (error) {
            console.error('Error deleting depoimento:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>ID</Text>
                    <Text style={styles.tableHeader}>Nome</Text>
                    <Text style={styles.tableHeader}>Depoimento</Text>
                    <Text style={styles.tableHeader}>Actions</Text>
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
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDeleteDepoimento(depoimento.id)}
                            >
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>

            <Modal
                visible={isEditing}
                animationType="slide"
                transparent={true}
            >
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

                        <TouchableOpacity
                            style={styles.updateButton}
                            onPress={handleUpdateDepoimento}
                        >
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
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
        backgroundColor: '#f3f3f3',
    },
    table: {
        backgroundColor: '#fff',
        borderRadius: 4,
        overflow: 'hidden',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingHorizontal: 16,
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    editButton: {
        marginRight: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#4287f5',
        borderRadius: 4,
    },
    deleteButton: {
        marginRight: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#f54242',
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 16,
        width: '80%',
    },
    modalLabel: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 16,
        padding: 8,
    },
    updateButton: {
        backgroundColor: '#4287f5',
        borderRadius: 4,
        paddingVertical: 12,
        alignItems: 'center',
    },
});

export default DepoimentosScreen;
