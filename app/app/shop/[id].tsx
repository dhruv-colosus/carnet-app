import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ScreenLayout from '../../components/ScreenLayout';
import { ShieldCheck, TrendUp, Info } from 'phosphor-react-native';

// Mock data for potential buyers (same as in shop.tsx)
const buyerData = [
    {
        id: '1',
        name: 'Tesla Inc',
        description: 'Vehicle performance & driver behavior',
        longDescription: 'Tesla is interested in analyzing vehicle performance metrics and driver behavior patterns to improve their autonomous driving systems. Your data will help train AI models for safer self-driving technology.',
        amount: '1000 DCG',
        trustScore: '98%',
        dataPoints: '158',
        icon: require('../../assets/logo.png'),
        dataCategories: ['Location Data', 'Speed Metrics', 'Acceleration Patterns', 'Braking Behavior']
    },
    {
        id: '2',
        name: 'Ford Corp',
        description: 'Engine performance & maintenance data',
        longDescription: 'Ford is collecting engine performance and maintenance data to improve vehicle reliability and reduce warranty costs. Your data helps identify early signs of component failure and optimize maintenance schedules.',
        amount: '850 DCG',
        trustScore: '95%',
        dataPoints: '120',
        icon: require('../../assets/logo.png'),
        dataCategories: ['Engine Diagnostics', 'Oil Performance', 'Component Wear', 'Maintenance Intervals']
    },
    {
        id: '3',
        name: 'Waymo AI',
        description: 'Location & environmental data',
        longDescription: 'Waymo utilizes location and environmental data to enhance mapping systems and understand how different weather conditions affect autonomous vehicle performance. Your data improves navigation in diverse environments.',
        amount: '1200 DCG',
        trustScore: '92%',
        dataPoints: '210',
        icon: require('../../assets/logo.png'),
        dataCategories: ['GPS Coordinates', 'Weather Conditions', 'Road Surface Quality', 'Traffic Patterns']
    },
    {
        id: '4',
        name: 'Toyota Motors',
        description: 'Fuel usage & emission patterns',
        longDescription: 'Toyota is analyzing fuel consumption and emissions data to develop more efficient and environmentally friendly vehicles. Your data contributes to reducing carbon footprints and optimizing fuel economy.',
        amount: '750 DCG',
        trustScore: '97%',
        dataPoints: '96',
        icon: require('../../assets/logo.png'),
        dataCategories: ['Fuel Consumption', 'Emission Levels', 'Driving Habits', 'Idle Time']
    },
    {
        id: '5',
        name: 'Uber',
        description: 'Route optimization & traffic patterns',
        longDescription: 'Uber is collecting route and traffic data to optimize their navigation algorithms and predict congestion patterns. Your data helps improve ETA predictions and suggest more efficient routes.',
        amount: '950 DCG',
        trustScore: '94%',
        dataPoints: '144',
        icon: require('../../assets/logo.png'),
        dataCategories: ['Route Selection', 'Travel Times', 'Traffic Density', 'Stop Duration']
    }
];

// Data category component
const DataCategory = ({ title }: { title: string }) => (
    <View className="bg-gray-800/50 rounded-full px-3 py-1 mr-2 mb-2">
        <Text className="text-gray-300 text-xs font-gilroy-medium tracking-tight">
            {title}
        </Text>
    </View>
);

// Info row component
const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <View className="flex-row justify-between py-3 border-b border-white/10">
        <Text className="text-gray-400 text-sm font-gilroy-medium tracking-tight">{label}</Text>
        <Text className="text-white text-sm font-gilroy-medium tracking-tight">{value}</Text>
    </View>
);

export default function BuyerDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    // Find the buyer data based on the ID
    const buyer = buyerData.find(item => item.id === id);

    if (!buyer) {
        return (
            <ScreenLayout title="Buyer Not Found">
                <View className="flex-1 items-center justify-center">
                    <Text className="text-white text-xl font-gilroy-medium">Buyer not found</Text>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mt-4 bg-blue-500 px-4 py-2 rounded-lg"
                    >
                        <Text className="text-white font-gilroy-medium">Go Back</Text>
                    </TouchableOpacity>
                </View>
            </ScreenLayout>
        );
    }

    return (
        <ScreenLayout title="Data Offer">
            <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
                {/* Buyer Header with centered layout */}
                <View className="items-center mt-8 mb-6">
                    <View className="w-20 h-20 bg-gray-700 rounded-full items-center justify-center mb-3">
                        <Image source={buyer.icon} className="w-12 h-12 opacity-60" resizeMode="contain" />
                    </View>
                    <Text className="text-white text-2xl font-gilroy-medium tracking-tight text-center">{buyer.name}</Text>
                    <View className="flex-row items-center mt-1">
                        <ShieldCheck size={14} color="#9CA3AF" weight="bold" />
                        <Text className="text-gray-400 text-xs ml-1 font-gilroy-medium tracking-tight">Trust Score: {buyer.trustScore}</Text>
                    </View>
                </View>

                {/* Offer Amount with larger display */}
                <View className="bg-gray-800/30 rounded-xl p-6 mb-5 items-center">
                    <Text className="text-gray-300 text-sm font-gilroy-medium tracking-tight mb-2">Offering</Text>
                    <Text className="text-green-400 text-5xl font-gilroy-medium tracking-tight">{buyer.amount}</Text>
                    <Text className="text-gray-400 text-xs font-gilroy-medium tracking-tight mt-2">for your vehicle data</Text>
                </View>

                {/* Description */}
                <View className="mb-6">
                    <Text className="text-white text-lg font-gilroy-bold tracking-tight mb-3">About this offer</Text>
                    <Text className="text-gray-300 text-base font-gilroy-medium tracking-tight leading-5">
                        {buyer.longDescription}
                    </Text>
                </View>

                {/* Data Categories in a grid */}
                <View className="mb-6">
                    <Text className="text-white text-lg font-gilroy-bold tracking-tight mb-3">Data Categories</Text>
                    <View className="flex-row flex-wrap justify-center">
                        {buyer.dataCategories.map((category, index) => (
                            <DataCategory key={index} title={category} />
                        ))}
                    </View>
                </View>

                {/* Additional Info */}
                <View className="mb-8">
                    <Text className="text-white text-lg font-gilroy-bold tracking-tight mb-3">Details</Text>
                    <View className="bg-gray-800/20 rounded-xl p-4">
                        <InfoRow label="Data Points Required" value={buyer.dataPoints} />
                        <InfoRow label="Offer Valid Until" value="June 15, 2025" />
                        <InfoRow label="Payment Method" value="DCG Tokens" />
                        <InfoRow label="Estimated Delivery" value="Immediate" />
                    </View>
                </View>

                {/* Info Box */}
                <View className="bg-blue-500/10 rounded-xl p-4 mb-6">
                    <View className="flex-row">
                        <View className="mt-1">
                            <Info size={18} color="#60A5FA" weight="fill" />
                        </View>
                        <View className="ml-2 flex-1">
                            <Text className="text-blue-400 text-sm font-gilroy-medium tracking-tight mb-1">
                                Privacy Protected
                            </Text>
                            <Text className="text-gray-300 text-xs font-gilroy-medium tracking-tight">
                                Your data is anonymized and encrypted. You can revoke access at any time from your dashboard.
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <TouchableOpacity className="bg-white py-4 rounded-lg items-center justify-center mb-3">
                    <Text className="text-black text-base font-gilroy-bold tracking-tight">SELL DATA</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.back()}
                    className="py-4 rounded-lg items-center justify-center mb-10"
                >
                    <Text className="text-gray-400 text-base font-gilroy-medium tracking-tight">Cancel</Text>
                </TouchableOpacity>
            </ScrollView>
        </ScreenLayout>
    );
} 