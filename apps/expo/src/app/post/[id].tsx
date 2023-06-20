import { SafeAreaView, Text, View } from "react-native";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

import { api } from "~/utils/api";

const Post: React.FC = () => {
  const { id } = useSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.post.byId.useQuery({ id });

  if (!data) return <SplashScreen />;

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: data.title }} />
      <View>
        <Text>{data.title}</Text>
        <Text>{data.content}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Post;
