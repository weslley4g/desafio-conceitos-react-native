import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  // buscando repositorios criados
  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  // criando um novo repositorio
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "Front-End com Reacjs",
      url: "https://github.com/weslley4g/REactJS",
      techs: "Reacjs, NodeJS, React-Native",
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  // removendo um repositorio
  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);
    const like = response.data;

    repositories.filter((repository) => {
      if (repository.id === id) {
        setRepositories(repository);
      }
    });
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <View style={styles.repositoryContainer}>
          <FlatList
            data={repositories}
            keyExtractor={(repository) => repository.id}
            renderItem={({ item: repository }) => (
              <>
                <Text style={styles.repository}>{repository.title}</Text>

                <View style={styles.techsContainer}>
                  <Text style={styles.tech}>{repository.techs}</Text>
                </View>

                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                    testID={`repository-likes-1`}
                  >
                    {repository.likes} curtidas
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleLikeRepository(repository.id)}
                    // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                    testID={`like-button-1`}
                  >
                    <Text style={styles.buttonText}>Curtir</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleRemoveRepository(repository.id)}
                >
                  <Text style={styles.buttonTextDell}>Excluir Repositorio</Text>
                </TouchableOpacity>
              </>
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={handleAddRepository}
        >
          <Text style={styles.buttonTextAdd}>Adicionar Repositorio</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 50,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
  buttonAdd: {
    marginTop: 10,
    alignContent: "center",
    alignItems: "center",
    position: "relative",
    flex: 1,
  },
  buttonTextAdd: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#000",
    backgroundColor: "#ffff",
    padding: 15,
    borderRadius: 10,
  },

  buttonTextDell: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#000",
    backgroundColor: "#800000",
    padding: 15,
  },
});
