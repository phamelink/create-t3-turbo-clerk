import React, { useState } from "react";
import { Image, type ImageSource } from "expo-image";
import { useSignIn } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Center, Heading, VStack } from "native-base";
import { useForm } from "react-hook-form";

import SigninSchema, { type SigninSchemaType } from "~/utils/schemas/signin";
import SignInApple from "~/components/SignInApple";
import SignInGoogle from "~/components/SigninGoogle";

export const SignInSignUpScreen = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <Box flex={1} px="6">
      <Heading my="12" textAlign="left">
        Welcome to this app!
      </Heading>
      {mode === "signin" ? <SignIn /> : null}
      <Center flex={1}>
        <SignInApple />
        <SignInGoogle />
      </Center>
    </Box>
  );
};

const SignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SigninSchema),
  });

  const onSubmit = async (data: SigninSchemaType) => {
    if (!isLoaded || loading) {
      return;
    }
    setLoading(true);

    try {
      const completeSignIn = await signIn.create({
        identifier: data.email,
        password: data.password,
      });
      // This is an important step,
      // This indicates the user is signed in
      // console.log(completeSignIn)
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Heading
        size="md"
        fontWeight="600"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
      >
        Sign in to continue!
      </Heading>
      <VStack space={3} mt="5"></VStack>
    </Box>
  );
};
