import { Tabs } from 'expo-router';
import { ChartNoAxesColumn, PiggyBank, Radio, Store } from "lucide-react-native";
import { View, StatusBar, ImageBackground, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useMemo } from 'react';

const styles = StyleSheet.create({
    tabLabel: {
        letterSpacing: -0.5, // Adjust this value to tighten/loosen tracking
    },
});

export default function TabLayout() {
    // Create tab background component once to prevent re-renders
    const TabBackground = useMemo(() => {
        return (
            <BlurView
                tint="dark"
                intensity={10}
                className="absolute inset-0"
            />
        );
    }, []);

    return (
        <ImageBackground
            source={require('../../assets/bg2.png')}
            className="flex-1"
            resizeMode="cover"
        >
            <View className="flex-1 mb-4">
                <StatusBar barStyle="light-content" />
                <Tabs
                    initialRouteName="index"
                    screenOptions={{
                        tabBarActiveTintColor: '#ffffff',
                        tabBarInactiveTintColor: '#3A3D4A',
                        tabBarStyle: {
                            backgroundColor: 'transparent',
                            paddingTop: 10,
                            borderTopWidth: 0,
                            position: 'relative',
                            height: 80,
                        },
                        tabBarBackground: () => TabBackground,
                        headerShown: false,
                        tabBarLabelStyle: styles.tabLabel,
                    }}
                >

                    <Tabs.Screen
                        name="live"
                        options={{
                            title: 'Live',
                            tabBarIcon: ({ color }) => <Radio size={24} color={color} />,
                        }}
                    />
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: 'Stats',
                            tabBarIcon: ({ color }) => <ChartNoAxesColumn size={24} color={color} strokeWidth={3} />,
                        }}
                    />

                    <Tabs.Screen
                        name="shop"
                        options={{
                            title: 'Shop',
                            tabBarIcon: ({ color }) => <Store size={24} color={color} />,
                        }}
                    />
                    <Tabs.Screen
                        name="portfolio"
                        options={{
                            title: 'Portfolio',
                            tabBarIcon: ({ color }) => <PiggyBank size={24} color={color} />,
                        }}
                    />
                </Tabs>
            </View>
        </ImageBackground>
    );
}
