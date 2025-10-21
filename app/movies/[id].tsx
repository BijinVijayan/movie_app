import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import { isMovieSaved, removeSavedMovie, saveMovie } from "@/services/appwrite"; // ⬅️ make sure you have this check function
import useFetch from "@/services/useFetch";
import useSave from "@/services/useSave";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const [isSaved, setIsSaved] = useState(false);

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );
  const { execute, loading: saving, success } = useSave(saveMovie);

  const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 font-normal text-sm">{label}</Text>
      <Text className="text-light-100 font-bold text-sm mt-2">
        {value || "N/A"}
      </Text>
    </View>
  );

  // Check if movie is already saved
  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!id) return;
      const saved = await isMovieSaved(Number(id), "123426");
      // console.log("Is movie saved555555555:", saved);
      setIsSaved(saved);
    };
    checkSavedStatus();
  }, [id]);

  const onSavePress = async () => {
    try {
      if (isSaved && movie) {
        // Remove the saved movie if it's already saved
        await removeSavedMovie("123426", movie as any as Movie);
        setIsSaved(false);
        ToastAndroid.showWithGravity(
          "Movie removed from saved!",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
        return;
      }

      // Otherwise, save the movie
      const result = await execute("123426", movie as any);

      if (result) {
        setIsSaved(true);
        ToastAndroid.showWithGravity(
          "Movie saved successfully!",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      }
    } catch (err) {
      console.error("Error toggling save:", err);
      ToastAndroid.showWithGravity(
        "Failed to update saved movies!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
    }
  };

  if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1 items-center justify-center">
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="relative">
          <Image
            resizeMode="cover"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
          />

          {/* Save Button */}
          <TouchableOpacity
            className={`absolute bottom-6 right-6 rounded-full p-3 ${
              isSaved ? "bg-primary" : "bg-light-200"
            }`}
            onPress={onSavePress}
            disabled={saving}
          >
            <Image source={icons.save} className="size-6" tintColor="#fff" />
          </TouchableOpacity>
        </View>

        {/* Movie Info Section */}
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" • ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>

      {/* Go Back Button */}
      <TouchableOpacity
        className="absolute bottom-6 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
