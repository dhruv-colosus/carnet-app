import { View, Text, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRef, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export default function Index() {
    const router = useRouter();
    const translateX = useSharedValue(0);
    const [swiped, setSwiped] = useState(false);

    const handleSwipe = () => {
        setSwiped(true);
        router.push('/(tabs)/live');
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../assets/bg1.png')}
                className="flex-1 w-full h-full justify-between py-8 "
                resizeMode="cover"
            >
                <View className="mt-16 ml-6 flex-row items-center">
                    <Image source={require('../assets/logo.png')} className="w-8 h-8 mr-2" resizeMode="contain" />
                    <Text className="text-white text-2xl font-gilroy-semibold tracking-wider">CARNET</Text>
                </View>

                <View className="flex-1 justify-end px-8 pb-40">
                    <Text className="text-gray-300 text-xl font-gilroy-light mb-1 tracking-tighter ">Welcome Back, <Text className="font-gilroy-semibold text-white">Dhruv !</Text></Text>
                    <Text className="text-white text-5xl font-gilroy-regular leading-none tracking-tighter">
                        Ready to drive{"\n"}into the <Text className="font-gilroy-semibold text-white">data</Text>{"\n"}economy?
                    </Text>
                </View>

                <View className="mb-10 px-6">
                    <GestureDetector
                        gesture={Gesture.Pan()
                            .onUpdate((e) => {
                                if (e.translationX > 0) {
                                    translateX.value = Math.min(e.translationX, width - 100);
                                }
                            })
                            .onEnd((e) => {
                                if (e.translationX > width * 0.4) {
                                    translateX.value = withSpring(width - 100, {}, () => runOnJS(handleSwipe)());
                                } else {
                                    translateX.value = withSpring(0);
                                }
                            })}
                    >
                        <Animated.View
                            className="flex-row items-center bg-[#1B1B1B] rounded-full overflow-hidden"
                            style={{ height: 64 }}
                        >
                            <Animated.View
                                className="bg-white w-16 h-16 rounded-full items-center justify-center m-2"
                                style={animatedStyle}
                            >
                                <Text className="text-2xl">→</Text>
                            </Animated.View>
                            <View className="flex-1 items-center">
                                <Text className="text-white text-lg ">Let's Drive</Text>
                            </View>
                            <View className="flex-row mr-6">
                                <Text className="text-white text-2xl font-gilroy-regular opacity-20">&gt;</Text>
                                <Text className="text-white text-2xl font-gilroy-regular opacity-60">&gt;</Text>
                                <Text className="text-white text-2xl font-gilroy-regular opacity-100">&gt;</Text>
                            </View>
                        </Animated.View>
                    </GestureDetector>
                </View>
            </ImageBackground>
        </GestureHandlerRootView>
    );
}
