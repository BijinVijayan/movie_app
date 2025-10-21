import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCards from "@/components/TrendingCards";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies = [],
    loading: movieLoading,
    error: movieError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const loading = movieLoading || trendingLoading;
  const error = movieError || trendingError;

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute top-0 z-0 w-full"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          paddingBottom: 10,
        }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 100,
        }}
        renderItem={({ item }) => <MovieCard {...item} />}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View className="items-center mt-20">
              <Image source={icons.logo} className="w-12 h-10 mb-5" />
            </View>

            {/* Search */}
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie..."
            />

            {/* Loading / Error */}
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-5 self-center"
              />
            )}
            {error && (
              <Text className="text-white text-center my-5">
                {error?.message || "Something went wrong"}
              </Text>
            )}

            {/* Trending */}
            {!loading && !error && trendingMovies && trendingMovies?.length > 0 && (
              <View className="mt-8">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCards movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  contentContainerStyle={{ paddingRight: 10 }}
                />
              </View>
            )}

            {/* Latest Header */}
            <Text className="text-lg text-white font-bold mt-10 mb-3">
              Latest Movies
            </Text>
          </>
        }
      />
    </View>
  );
}