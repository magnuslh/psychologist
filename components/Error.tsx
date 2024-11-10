import { ReactNode } from "react";
import { View, Text } from "react-native";

export const Error = ({ message }: { message: string }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>{message}</Text>
    </View>
  );
};
