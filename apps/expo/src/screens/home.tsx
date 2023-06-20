import React from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";
import type { inferProcedureOutput } from "@trpc/server";

import type { AppRouter } from "@acme/api";

import { api } from "~/utils/api";

const SignOut = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          void signOut();
        }}
      />
    </View>
  );
};

const PostCard: React.FC<{
  post: inferProcedureOutput<AppRouter["post"]["all"]>[number];
}> = ({ post }) => {
  return (
    <View>
      <Text>{post.title}</Text>
      <Text>{post.content}</Text>
    </View>
  );
};

const CreatePost: React.FC = () => {
  const utils = api.useContext();
  const { mutate } = api.post.create.useMutation({
    async onSuccess() {
      await utils.post.all.invalidate();
    },
  });

  const [title, onChangeTitle] = React.useState("");
  const [content, onChangeContent] = React.useState("");

  return (
    <View>
      <TextInput onChangeText={onChangeTitle} placeholder="Title" />
      <TextInput onChangeText={onChangeContent} placeholder="Content" />
      <TouchableOpacity
        onPress={() => {
          mutate({
            title,
            content,
          });
        }}
      >
        <Text>Publish post</Text>
      </TouchableOpacity>
    </View>
  );
};

export const HomeScreen = () => {
  const postQuery = api.post.all.useQuery();
  const [showPost, setShowPost] = React.useState<string | null>(null);

  return (
    <SafeAreaView>
      <View>
        <Text>
          Create <Text>T3</Text> Turbo
        </Text>

        <View>
          {showPost ? (
            <Text>
              <Text>Selected post:</Text>
              {showPost}
            </Text>
          ) : (
            <Text>Press on a post</Text>
          )}
        </View>

        <FlashList
          data={postQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View />}
          renderItem={(p) => (
            <TouchableOpacity onPress={() => setShowPost(p.item.id)}>
              <PostCard post={p.item} />
            </TouchableOpacity>
          )}
        />

        <CreatePost />
        <SignOut />
      </View>
    </SafeAreaView>
  );
};
