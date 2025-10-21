import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

export default function Splash() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.replace("/welcome");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-primary items-center justify-center">
      <Animated.Image
        source={require("@/assets/icons/logo.png")}
        style={{
          width: 150,
          height: 150,
          marginBottom: 24,
          transform: [{ scale: scaleAnim }],
        }}
        resizeMode="contain"
      />
      <Animated.Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          transform: [{ scale: scaleAnim }],
        }}
      >
        MovieApp
      </Animated.Text>
    </View>
  );
}