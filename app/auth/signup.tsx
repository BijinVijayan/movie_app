import { images } from "@/constants/images";
import { registerUser } from "@/services/auth";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

export default function Signup({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async () => {
    try {
      await registerUser(email, password, name);

      ToastAndroid.showWithGravity(
        "Signup successful! You can now log in.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );

      router.replace("/auth/login");
    } catch (err: any) {
      console.error("Signup error:", err);

      let message = "Signup failed! Try again.";

      if (err?.message?.includes("User already exists")) {
        message = "Email already registered! Please log in.";
      } else if (err?.code === 409) {
        message = "This email is already in use.";
      }

      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
    }
  };

  return (
    <View className="flex-1 bg-dark-200 justify-start items-center">
      <Image
        source={images.bg}
        className="absolute top-0 z-0 w-full"
        resizeMode="cover"
      />
      <Image
        source={require("@/assets/icons/logo.png")}
        className="w-24 h-24 mb-10 mt-20"
        resizeMode="contain"
      />
      <View className="w-full px-8 mt-10">
        <Text className="text-white text-2xl font-bold mb-10 text-center">
          Sign Up
        </Text>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          className="bg-dark-100 text-white rounded-lg text-sm mb-5 p-4"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          className="bg-dark-100 text-white rounded-lg text-sm mb-5 p-4"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          className="bg-dark-100 text-white rounded-lg text-sm mb-5 p-4"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={handleSignup}
          className="bg-light-200 text-white rounded-lg text-sm mb-5 mt-5 p-4"
        >
          <Text className="text-center text-white font-semibold">Sign Up</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text className="text-gray-300 mt-3">
          Already have an account?{" "}
          <Text className="text-light-100 text-sm font-semibold">Log In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
