import { images } from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Welcome() {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/(tabs)");
    }
  }, [isLoggedIn]);

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
      <View className="px-5 flex justify-center items-center w-full">
        <Text className="text-white text-3xl font-bold mb-4">
          Welcome to MovieApp
        </Text>
        <Text className="text-gray-400 text-center mb-8">
          Discover and save your favorite movies. Let’s get started!
        </Text>
      </View>

      <View className="flex flex-col justify-center items-center gap-4 h-4/5">
        <TouchableOpacity
          onPress={() => router.push("/auth/signup")}
          className="bg-dark-100 py-3 px-10 rounded-full mb-3"
        >
          <Text className="text-light-200 text-lg font-semibold">
            Create Account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/login")}>
          <Text className="text-gray-300">
            Already have an account?{" "}
            <Text className="text-light-100 text-sm font-semibold">Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
