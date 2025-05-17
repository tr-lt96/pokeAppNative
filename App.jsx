import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 14 }}>
        Open up App.js to start working on your app!
      </Text>
      <Text style={{ fontSize: 16 }}>
        Open up App.js to start working on your app!
      </Text>
      <Text style={{ fontSize: 18 }}>
        Open up App.js to start working on your app!
      </Text>
      <Text style={{ fontSize: 24 }}>
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
  },
});
