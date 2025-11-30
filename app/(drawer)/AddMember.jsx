import * as Location from "expo-location";
import * as SMS from "expo-sms";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function App() {

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [contactArr, setContactArr] = useState([]);

  const addMember = () => {
    if (!name || !contact) {
      alert("Please enter both name and number");
      return;
    }

    setContactArr(prev => [...prev, { name, contact }]);
    setName("");
    setContact("");
  };

  const sendEmergencyAlert = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude;
      const lng = location.coords.longitude;

      const msg = `🚨 EMERGENCY ALERT\nPlease help me!\n\nMy Location:\nLat: ${lat}\nLng: ${lng}\nGoogle Maps: https://www.google.com/maps/?q=${lat},${lng}`;

      const phoneNumbers = contactArr.map(item => item.contact);

      if (phoneNumbers.length === 0) {
        alert("Please add at least one contact!");
        return;
      }

      const isAvailable = await SMS.isAvailableAsync();
      if (!isAvailable) {
        alert("SMS not available");
        return;
      }

      await SMS.sendSMSAsync(phoneNumbers, msg);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.header}>Add Emergency Contact</Text>

      <TextInput
        placeholder="Contact Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#777"
      />

      <TextInput
        placeholder="Phone Number"
        value={contact}
        keyboardType="phone-pad"
        onChangeText={setContact}
        style={styles.input}
        placeholderTextColor="#777"
      />

      <TouchableOpacity style={styles.addBtn} onPress={addMember}>
        <Text style={styles.addBtnText}>+ Add Contact</Text>
      </TouchableOpacity>

      {contactArr.length > 0 && (
        <View style={{ marginTop: 25 }}>
          <Text style={styles.subHeader}>Saved Contacts</Text>
          {contactArr.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardNumber}>{item.contact}</Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.sosButton} onPress={sendEmergencyAlert}>
        <Text style={styles.sosText}>SEND EMERGENCY ALERT</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F7F8FA",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#1a1a1a",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 5,
  },
  addBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
  },
  cardNumber: {
    fontSize: 15,
    color: "#555",
    marginTop: 4,
  },
  sosButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 30,
  },
  sosText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },
});
