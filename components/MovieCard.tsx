import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%] mb-3">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text numberOfLines={1} className="text-sm font-bold mt-2 text-white">{title}</Text>
        <View className="flex-row items-center justify-start gap-x-1 mt-1">
            <Image
                source={icons.star}
                className="size-4"
            />
            <Text className="text-white text-xs font-bold uppercase">{Math.round(vote_average/2)}</Text>
        </View>
        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-sm text-light-300 font-medium">{release_date?.split('-')[0]}</Text>
          {/* <Text className="text-sm font-medium text-light-300 uppercase">Movie</Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
