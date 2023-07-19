// import React from "react"
// import { Text, View } from "react-native"

import { Stack, useRouter } from "expo-router"
import { Box, Button, Heading } from "native-base"

const PostsIndex = () => {
    const router = useRouter()
    return (
        <Box>
            <Heading>All posts</Heading>
            <Button onPress={() => router.push("./posts/addPost")}>
                Add Post
            </Button>
        </Box>
    )
}

export default PostsIndex
