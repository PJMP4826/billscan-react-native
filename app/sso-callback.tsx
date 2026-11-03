import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function SSOCallbackScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0c356a",
  },
});
