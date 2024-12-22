// pages/SearchScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data))
        .catch((error) => console.error(error));
    }
  };

  const renderShow = ({ item }) => (
    <TouchableOpacity
      style={styles.resultContainer}
      onPress={() => navigation.navigate("Details", { show: item.show })}
    >
      {item.show.image?.medium ? (
        <Image
          source={{ uri: item.show.image.medium }}
          style={styles.resultImage}
        />
      ) : (
        <View style={styles.noImageContainer}>
          <Text style={styles.noImageText}>No Image Found</Text>
        </View>
      )}
      <Text style={styles.resultTitle} numberOfLines={1}>
        {item.show.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for shows"
        placeholderTextColor="#888"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.show.id.toString()}
        renderItem={renderShow}
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
  searchInput: {
    backgroundColor: "#141414",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
  resultContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: "#141414",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
  },
  resultImage: {
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
  resultTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
});

export default SearchScreen;
