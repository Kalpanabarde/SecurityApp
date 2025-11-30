import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Help() {
  const phoneNumber = "tel:9522439178"; // change number here

  const makeCall = () => {
    Linking.openURL(phoneNumber);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.helpButton} onPress={makeCall}>
        <Text style={styles.text}>Need Help?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
  },
  helpButton: {
    backgroundColor: "#E53935",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
