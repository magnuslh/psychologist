import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { Error } from "@/components/Error";
import { StyleSheet, Text, View, Image } from "react-native";
import { Loader } from "@/components/Loader";
import { useEffect } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { LinearGradient } from "expo-linear-gradient";

export default function Psychologist() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["psychologist", id],
    queryFn: async () => {
      const response = await fetch(
        "https://mindler.se/api/mindlerproxy/psychologist/" + id
      );
      return response.json();
    },
  });
  useEffect(() => {
    if (data) {
      navigation.setOptions({
        title: `${data.data.firstName} ${data.data.lastName}`,
      });
    }
  }, [navigation]);

  if (isLoading) {
    return (
      <SafeAreaView>
        <Loader />
      </SafeAreaView>
    );
  }
  if (isError) {
    return (
      <SafeAreaView>
        <Error message={"Something went wrong"} />
      </SafeAreaView>
    );
  }
  console.warn(data);
  const { firstName, lastName, thumbnail, headline, summary } = data.data;
  return (
    <SafeAreaView style={styles.container}>
      <Image src={thumbnail} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.headline}>{headline}</Text>
        <Text style={styles.summary}>{summary}</Text>
        <Button style={styles.scheduleButton}>{"Boka tid"}</Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: "100%",
    aspectRatio: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  info: {
    padding: 16,
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },
  headline: {
    fontSize: 14,
    marginTop: 4,
  },
  summary: {
    marginTop: 16,
    fontSize: 14,
    fontStyle: "italic",
  },
  scheduleButton: {
    marginTop: 16,
    alignSelf: "flex-start",
  },
});
