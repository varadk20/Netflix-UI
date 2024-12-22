import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error(error));
  }, []);

  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => navigation.navigate("Details", { show: item.show })}
    >
      {item.show.image?.medium ? (
        <Image
          source={{ uri: item.show.image.medium }}
          style={styles.movieImage}
        />
      ) : (
        <View style={styles.noImageContainer}>
          <Text style={styles.noImageText}>No Image Found</Text>
        </View>
      )}
      <Text style={styles.movieTitle} numberOfLines={1}>
        {item.show.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.show.id.toString()}
        renderItem={renderMovie}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 2 - 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  movieContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: "#141414",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
  },
  movieImage: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.5,
    resizeMode: "cover",
  },
  noImageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.5,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#fff",
    fontSize: 16,
  },
  movieTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
});

export default HomeScreen;
