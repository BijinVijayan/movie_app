import { images } from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      ToastAndroid.showWithGravity(
        "Login successful!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      router.replace("/(tabs)"); 
    } catch (err) {
      ToastAndroid.showWithGravity(
        "Login failed. Please try again.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      console.error("Login error:", err);
    }
  };

  return (
    <View className="flex-1 bg-dark-200 justify-start items-center">
      <Image source={images.bg} className="absolute top-0 z-0 w-full" resizeMode="cover" />
      <Image source={require("@/assets/icons/logo.png")} className="w-24 h-24 mb-10 mt-20" resizeMode="contain" />
      <View className="w-full flex flex-col justify-center h-3/5">
        <View className="w-full px-8 mt-10">
          <Text className="text-white text-2xl font-bold mb-6 text-center">Log In</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            className="bg-dark-100 text-white rounded-lg text-sm mb-5 p-4"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            className="bg-dark-100 text-white rounded-lg text-sm mb-5 p-4"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={handleLogin} className="bg-light-200 text-white rounded-lg text-sm mb-5 mt-5 p-4">
            <Text className="text-center text-white font-semibold">Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/auth/signup")}>
            <Text className="text-gray-400 text-center mt-4">
              Don’t have an account? <Text className="text-light-200">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;