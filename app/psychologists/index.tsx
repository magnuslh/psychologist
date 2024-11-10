import { Loader } from "@/components/Loader";
import { Error } from "@/components/Error";
import { useQuery } from "@tanstack/react-query";
import { formatRelative } from "date-fns";
import { sv } from "date-fns/locale";
import { Link } from "expo-router";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toggle } from "@/components/Toggle";
import { useState } from "react";

type Psychologist = {
  psychologistId: number;
  firstName: string;
  lastName: string;
  thumbnail: string;
  headline: string;
  headlineEnum: string;
  startsAt: number;
  matchingSlots: number;
  userId: number;
};

type Filters = {
  languages: number[];
};

const languageIds: Record<string, number> = {
  english: 1,
  swedish: 2,
  danish: 3,
  norwegian: 4,
  arabic: 5,
};

const parseFiltersToUrl = (filters: Filters) => {
  return "";
  return filters.languages.length > 0
    ? `?&languages=${filters.languages.join(",")}`
    : "";
};

export default function Psychologists() {
  const [filters, setFilters] = useState<Filters>({ languages: [] });
  const toggleLanguage = (languageId: number) => {
    if (filters.languages.includes(languageId)) {
      setFilters((oldFilters) => ({
        languages: oldFilters.languages.filter((lang) => lang !== languageId),
      }));
    } else {
      setFilters((oldFilters) => ({
        languages: [...oldFilters.languages, languageId],
      }));
    }
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["psychologists", filters],
    queryFn: async () => {
      const url =
        "https://mindler.se/api/mindlerproxy/psychologists/available/" +
        parseFiltersToUrl(filters);
      const response = await fetch(url);
      return response.json();
    },
  });
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Toggle
          label={"Engelska"}
          onToggle={() => toggleLanguage(languageIds.english)}
          isToggled={filters.languages.includes(languageIds.english)}
        />
        <Toggle
          label={"Svenska"}
          onToggle={() => toggleLanguage(languageIds.swedish)}
          isToggled={filters.languages.includes(languageIds.swedish)}
        />
        <Toggle
          label={"Danska"}
          onToggle={() => toggleLanguage(languageIds.danish)}
          isToggled={filters.languages.includes(languageIds.danish)}
        />
        <Toggle
          label={"Norska"}
          onToggle={() => toggleLanguage(languageIds.norwegian)}
          isToggled={filters.languages.includes(languageIds.norwegian)}
        />
      </View>
      <FlatList
        data={data.data}
        contentContainerStyle={styles.list}
        renderItem={({ item }: { item: Psychologist }) => (
          <Link
            href={{
              pathname: "/psychologists/[id]",
              params: { id: item.psychologistId },
            }}
            asChild
          >
            <Pressable style={styles.item}>
              <Image src={item.thumbnail} style={styles.thumbnail} />
              <View style={styles.info}>
                <Text
                  style={styles.name}
                  numberOfLines={2}
                >{`${item.firstName} ${item.lastName}`}</Text>
                <Text style={styles.headline} numberOfLines={2}>
                  {item.headline}
                </Text>
                <Text style={styles.nextTime} numberOfLines={1}>
                  {"Nästa tid: "}
                  {formatRelative(new Date(item.startsAt * 1000), new Date(), {
                    locale: sv,
                  })}
                </Text>
              </View>
            </Pressable>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    flexDirection: "row",
    gap: 4,
  },
  list: {
    gap: 16,
    padding: 16,
  },
  item: { flexDirection: "row", gap: 16, width: 200 },
  thumbnail: { width: 112, aspectRatio: 1, borderRadius: 8 },
  info: { gap: 4, justifyContent: "center", paddingVertical: 16 },
  name: { fontSize: 18 },
  headline: { fontSize: 12 },
  nextTime: { fontSize: 14 },
});
