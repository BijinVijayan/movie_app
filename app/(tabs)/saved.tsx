import { images } from "@/constants/images";
import { getSavedMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useFocusEffect } from "@react-navigation/native";
import { Link } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Save = () => {
  const {
    data: savedMovies,
    loading,
    error,
    refetch,
  } = useFetch(() => getSavedMovies("123426"));

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (!savedMovies && loading)
    return (
      <SafeAreaView className="bg-primary flex-1 items-center justify-center">
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="bg-primary w-full flex-1">
      <Image
        source={images.bg}
        className="absolute top-0 z-0 w-full"
        resizeMode="cover"
      />
      <View className="flex-1 px-5 mt-16">
        <Text className="text-white text-lg mb-6 font-bold">Saved Movies</Text>

        <FlatList
          data={savedMovies}
          renderItem={({ item }) => (
            <Link href={`/movies/${item?.movie_id}`} asChild>
              <TouchableOpacity className="w-[30%] mb-3">
                <Image
                  source={{
                    uri: item?.poster_url
                      ? `https://image.tmdb.org/t/p/w500${item.poster_url}`
                      : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
                  }}
                  className="w-full h-52 rounded-lg"
                  resizeMode="cover"
                />
                <Text
                  numberOfLines={1}
                  className="text-sm font-bold mt-2 text-white"
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            </Link>
          )}
          keyExtractor={(item) => item.movie_id.toString()}
          contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 0 }}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            paddingBottom: 10,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Save;
