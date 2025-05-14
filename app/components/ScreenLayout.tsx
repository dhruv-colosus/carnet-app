import { ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';

type ScreenLayoutProps = {
    children: React.ReactNode;
    title?: string;
    vehicleName?: string;
};

export default function ScreenLayout({ children, title, vehicleName }: ScreenLayoutProps) {
    const [currentDate, setCurrentDate] = useState<string>("");

    useEffect(() => {
        const updateDate = () => {
            const date = new Date();
            const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            setCurrentDate(formattedDate);
        };

        updateDate();
        const timer = setInterval(updateDate, 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        <ImageBackground
            source={require('../assets/bg2.png')}
            className="flex-1"
            resizeMode="cover"
        >
            <SafeAreaView className="flex-1 px-3">
                <View className="flex-row justify-between items-center pt-6">
                    <View className="flex-row items-center">
                        {title && (
                            <Text className="font-gilroy-semibold text-white text-2xl ml-4">
                                {title}
                            </Text>
                        )}
                    </View>
                    <View className="items-end mr-4 border-r-[1px] border-white pr-2">
                        <Text className="font-gilroy-medium text-white text-base">
                            {vehicleName || "Dhruv's Tesla"}
                        </Text>
                        <Text className="font-gilroy-medium text-white text-sm">
                            {currentDate}
                        </Text>
                    </View>

                </View>
                <View className="flex-1">
                    {children}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
} 