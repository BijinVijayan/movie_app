import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const options = [
  {
    title: "Account Details",
    icon: icons.account,
  },
  {
    title: "Notifications",
    icon: icons.notifcations,
  },
  {
    title: "Privacy Settings",
    icon: icons.lock,
  },
  {
    title: "Help & Support",
    icon: icons.help,
  },
  {
    title: "Settings",
    icon: icons.settings,
  },
  {
    title: "Logout",
    icon: icons.logout,
  },
];

const Profile = () => {
  const { username, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await logout(); // now valid
              router.replace("/welcome");
            } catch (err) {
              console.error(err);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const settingsOptions = (iconName: any, name: string) => {
    const onPress = () => {
      if (name === "Logout") {
        handleLogout();
      } else {
        console.log(`${name} pressed`);
      }
    };

    return (
      <TouchableOpacity className="mb-4" onPress={onPress}>
        <View className="flex p-6 px-5 bg-dark-200 rounded-xl items-center justify-between flex-row">
          <View className="flex-row items-center gap-2.5">
            <Image source={iconName} className="w-8 h-8" resizeMode="contain" />
            <Text className="text-white text-sm">{name}</Text>
          </View>
          <Image
            source={icons.arrow_setting}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="bg-primary w-full flex-1">
      <Image
        source={images.bg}
        className="absolute top-0 z-0 w-full"
        resizeMode="cover"
      />
      <View className="flex-1 px-3 mt-14">
        <Image
          source={images.profile}
          className="w-32 h-32 rounded-full self-center mb-6"
          resizeMode="cover"
        />
        <Text className="text-white text-2xl font-bold text-center">
          {username}
        </Text>

        <View className="p-3 py-5 mt-4 flex-1 rounded-xl mb-16">
          <FlatList
            data={options}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <View>{settingsOptions(item?.icon, item?.title)}</View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};


export default Profile;
