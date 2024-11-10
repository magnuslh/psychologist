import { ReactNode } from "react";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

export const SafeArea = ({
  children,
  ...rest
}: { children: ReactNode } & SafeAreaViewProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }} {...rest}>
      {children}
    </SafeAreaView>
  );
};
