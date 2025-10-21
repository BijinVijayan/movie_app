import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrendingCards = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 mr-2 relative">
        <Image
          source={{ uri: poster_url }}
          className="w-full h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-14 -left-4 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-6xl">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text numberOfLines={2} className="text-light-200 text-sm mt-3 font-bold">{title}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCards;
