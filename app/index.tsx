import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { StyleSheet, View, Text, Pressable } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Help is just a few minutes away"}</Text>
      <Link href="/psychologists" asChild>
        <Button>{"Find available Psychologist"}</Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  pressable: {
    borderRadius: 16,
    padding: 16,
  },
});
