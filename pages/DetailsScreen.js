import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";

const DetailsScreen = ({ route }) => {
  const { show } = route.params;

  return (
    <ScrollView style={styles.detailsContainer}>
      {show.image?.original ? (
        <Image
          source={{ uri: show.image.original }}
          style={styles.detailsImage}
        />
      ) : (
        <View style={styles.noImageContainer}>
          <Text style={styles.noImageText}>No Image Found</Text>
        </View>
      )}

      <Text style={styles.detailsTitle}>{show.name}</Text>

      <View style={styles.detailsRow}>
        <Text style={styles.detailsText}>
          Rating: {show.rating?.average || "N/A"}
        </Text>
        <Text style={styles.detailsText}>Score: {show.score || "N/A"}</Text>
      </View>

      <Text style={styles.detailsSubTitle}>Genres</Text>
      <Text style={styles.detailsText}>{show.genres?.join(", ") || "N/A"}</Text>

      <Text style={styles.detailsSubTitle}>Status</Text>
      <Text style={styles.detailsText}>{show.status || "N/A"}</Text>

      <Text style={styles.detailsSubTitle}>Premiered</Text>
      <Text style={styles.detailsText}>{show.premiered || "N/A"}</Text>

      <Text style={styles.detailsSubTitle}>Runtime</Text>
      <Text style={styles.detailsText}>
        {show.runtime ? `${show.runtime} min` : "N/A"}
      </Text>

      <Text style={styles.detailsSubTitle}>Network</Text>
      <Text style={styles.detailsText}>{show.network?.name || "N/A"}</Text>

      <Text style={styles.detailsSubTitle}>Official Site</Text>
      <Text
        style={styles.linkText}
        onPress={() => Linking.openURL(show.officialSite || "#")}
      >
        {show.officialSite || "No official site available"}
      </Text>


      <Text style={styles.detailsSubTitle}>Previous Episode</Text>
      {show._links?.previousepisode?.href ? (
        <Text
          style={styles.linkText}
          onPress={() => Linking.openURL(show._links.previousepisode.href)}
        >
          {show._links.previousepisode.name || "No Previous Episode Available"}
        </Text>
      ) : (
        <Text style={styles.detailsText}>No Previous Episode Available</Text>
      )}

      <Text style={styles.detailsSubTitle}>Next Episode</Text>
      {show._links?.nextepisode?.href ? (
        <Text
          style={styles.linkText}
          onPress={() => Linking.openURL(show._links.nextpisode.href)}
        >
          {show._links.nextepisode.name || "No next Episode Available"}
        </Text>
      ) : (
        <Text style={styles.detailsText}>No next Episode Available</Text>
      )}


      <Text style={styles.detailsSubTitle}>Summary</Text>
      <Text style={styles.detailsSummary}>
        {show.summary?.replace(/<\/?[^>]+(>|$)/g, "") || "No Summary Available"}
      </Text>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    detailsContainer: {
      flex: 1,
      backgroundColor: "#000",
      padding: 20,
    },
    detailsImage: {
      width: "100%",
      height: 300,
      resizeMode: "contain", // Ensures the full image is visible
      marginBottom: 20,
    },
    noImageContainer: {
      width: "100%",
      height: 300,
      backgroundColor: "#333",
      justifyContent: "center",
      alignItems: "center",
    },
    noImageText: {
      color: "#fff",
      fontSize: 16,
    },
    detailsTitle: {
      color: "#fff",
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
    },
    detailsText: {
      color: "#ddd",
      fontSize: 16,
      marginBottom: 10,
    },
    detailsSubTitle: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 15,
      marginBottom: 5,
    },
    detailsSummary: {
      color: "#ddd",
      fontSize: 16,
      textAlign: "justify",
      marginBottom: 20,
      flexGrow: 1,  // Allow text to grow and avoid clipping
      flexWrap: "wrap",  // Ensures text wraps if too long
    },
    detailsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 15,
    },
    linkText: {
      color: "#1e90ff",
      fontSize: 16,
      textDecorationLine: "underline",
    },
  });
  

export default DetailsScreen;
