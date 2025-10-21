// app/_layout.tsx
import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import "./globals.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar hidden />
      <Slot />
    </AuthProvider>
  );
}
