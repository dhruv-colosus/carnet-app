import { Stack } from 'expo-router';
import { View } from 'react-native';
import "../global.css"
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded, fontError] = useFonts({
        'Gilroy-Bold': require('../assets/fonts/Gilroy-Bold.ttf'),
        'Gilroy-SemiBold': require('../assets/fonts/Gilroy-SemiBold.ttf'),
        'Gilroy-Regular': require('../assets/fonts/Gilroy-Regular.ttf'),
        'Gilroy-Medium': require('../assets/fonts/Gilroy-Medium.ttf'),
        'Gilroy-Light': require('../assets/fonts/Gilroy-Light.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <View className="flex-1 bg-black">
                <Stack screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'transparent' }
                }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="+not-found" />
                </Stack>
            </View>
        </GestureHandlerRootView>

    );
}
