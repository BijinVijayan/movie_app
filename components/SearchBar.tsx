import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  onPress?: () => void;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
}
const SearchBar = ({
  onPress,
  placeholder,
  value,
  onChangeText,
  autoFocus = false,
}: Props) => {
  return (
    <View className="flex flex-row items-center bg-dark-200 px-5 py-2 rounded-full">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        autoFocus={autoFocus}
        onPress={onPress}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor="#AB8BFF"
        className="flex-1 ml-3 text-white text-base"
      />
    </View>
  );
};

export default SearchBar;
