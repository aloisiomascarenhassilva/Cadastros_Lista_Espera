import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Button, 
  FlatList, 
  TouchableOpacity,
  Keyboard
} from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [listaNomes, setListaNomes] = useState([]);

 
  function adicionarNome() {
    if (nome === '') {
      alert('Por favor, digite um nome!'); 
      return;
    }

    const novoItem = {
      id: Math.random().toString(), 
      texto: nome
    };

    setListaNomes((listaAtual) => [...listaAtual, novoItem]);
    setNome(''); 
    Keyboard.dismiss();
  }

 
  function removerNome(idParaRemover) {
    setListaNomes((listaAtual) => {
      return listaAtual.filter(item => item.id !== idParaRemover);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciador de Nomes</Text>

      {/* Área de Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite um nome..."
          onChangeText={setNome} 
          value={nome}
        />
        <Button title="Salvar" onPress={adicionarNome} />
      </View>

      {/* Lista de Nomes */}
      <FlatList
        data={listaNomes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemLista}>
            <Text style={styles.textoItem}>{item.texto}</Text>
            
            {/* Botão de Excluir individual */}
            <TouchableOpacity 
              onPress={() => removerNome(item.id)} 
              style={styles.botaoDeletar}
            >
              <Text style={styles.textoDeletar}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.vazio}>A lista está vazia.</Text>}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  itemLista: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
  },
  textoItem: {
    fontSize: 18,
  },
  botaoDeletar: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 5,
  },
  textoDeletar: {
    color: '#fff',
    fontWeight: 'bold',
  },
  vazio: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  }
});