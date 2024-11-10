import { ReactNode, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export const Toggle = ({
  label,
  onToggle,
  isToggled,
}: {
  label: string;
  isToggled: boolean;
  onToggle: () => void;
}) => {
  return (
    <Pressable
      onPress={() => onToggle()}
      style={[
        styles.pressable,
        { backgroundColor: isToggled ? "black" : "white" },
      ]}
    >
      <Text style={[styles.text, { color: isToggled ? "white" : "black" }]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 99,
    padding: 12,
  },
  text: { fontSize: 14 },
});
