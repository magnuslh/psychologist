import { ForwardedRef, forwardRef } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

export const Button = forwardRef(
  ({ children, ...rest }: { children: string }, ref: ForwardedRef<View>) => {
    return (
      <Pressable
        ref={ref}
        {...rest}
        style={({ pressed }) => [
          styles.pressable,
          { backgroundColor: pressed ? "pink" : "lightpink" },
        ]}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 16,
    padding: 16,
    paddingHorizontal: 32,
  },
  text: { fontSize: 14, textAlign: "center" },
});
