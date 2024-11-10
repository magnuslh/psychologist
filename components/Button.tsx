import React, { ForwardedRef } from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";

export const Button = React.forwardRef(
  (
    { children, style, ...rest }: { children: string; style?: ViewStyle },
    ref: ForwardedRef<View>
  ) => {
    return (
      <Pressable
        ref={ref}
        {...rest}
        style={({ pressed }) => ({
          ...style,
          ...styles.pressable,
          backgroundColor: pressed ? "pink" : "lightpink",
        })}
      >
        <Text>{children}</Text>
      </Pressable>
    );
  }
);

const styles = {
  pressable: {
    borderRadius: 16,
    padding: 16,
    paddingHorizontal: 32,
  },
};
