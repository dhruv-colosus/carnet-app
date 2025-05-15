import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ScreenLayout from '../../components/ScreenLayout';
import { ShieldCheck, Info, CheckSquare, Square } from 'phosphor-react-native';

interface DataItem {
    name: string;
    value: number;
}

interface BuyerDataItem {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    trustScore: string;
    icon: any;
    dataItems: DataItem[];
}

interface SelectedItems {
    [key: number]: boolean;
}

interface DataCheckboxItemProps {
    item: DataItem;
    isSelected: boolean;
    onToggle: () => void;
}

const buyerData: BuyerDataItem[] = [
    {
        id: '1',
        name: 'Tesla Inc',
        description: 'Vehicle performance & driver behavior',
        longDescription: 'Tesla is interested in analyzing vehicle performance metrics and driver behavior patterns to improve their autonomous driving systems. Your data will help train AI models for safer self-driving technology.',
        trustScore: '98%',
        icon: require('../../assets/logo.png'),
        dataItems: [
            { name: 'Location Data', value: 250 },
            { name: 'Speed Metrics', value: 300 },
            { name: 'Acceleration Patterns', value: 250 },
            { name: 'Braking Behavior', value: 200 }
        ]
    },
    {
        id: '2',
        name: 'Ford Corp',
        description: 'Engine performance & maintenance data',
        longDescription: 'Ford is collecting engine performance and maintenance data to improve vehicle reliability and reduce warranty costs. Your data helps identify early signs of component failure and optimize maintenance schedules.',
        trustScore: '95%',
        icon: require('../../assets/logo.png'),
        dataItems: [
            { name: 'Engine Diagnostics', value: 200 },
            { name: 'Oil Performance', value: 200 },
            { name: 'Component Wear', value: 250 },
            { name: 'Maintenance Intervals', value: 200 }
        ]
    },
    {
        id: '3',
        name: 'Waymo AI',
        description: 'Location & environmental data',
        longDescription: 'Waymo utilizes location and environmental data to enhance mapping systems and understand how different weather conditions affect autonomous vehicle performance. Your data improves navigation in diverse environments.',
        trustScore: '92%',
        icon: require('../../assets/logo.png'),
        dataItems: [
            { name: 'GPS Coordinates', value: 350 },
            { name: 'Weather Conditions', value: 250 },
            { name: 'Road Surface Quality', value: 300 },
            { name: 'Traffic Patterns', value: 300 }
        ]
    },
    {
        id: '4',
        name: 'Toyota Motors',
        description: 'Fuel usage & emission patterns',
        longDescription: 'Toyota is analyzing fuel consumption and emissions data to develop more efficient and environmentally friendly vehicles. Your data contributes to reducing carbon footprints and optimizing fuel economy.',
        trustScore: '97%',
        icon: require('../../assets/logo.png'),
        dataItems: [
            { name: 'Fuel Consumption', value: 200 },
            { name: 'Emission Levels', value: 150 },
            { name: 'Driving Habits', value: 200 },
            { name: 'Idle Time', value: 200 }
        ]
    },
    {
        id: '5',
        name: 'Uber',
        description: 'Route optimization & traffic patterns',
        longDescription: 'Uber is collecting route and traffic data to optimize their navigation algorithms and predict congestion patterns. Your data helps improve ETA predictions and suggest more efficient routes.',
        trustScore: '94%',
        icon: require('../../assets/logo.png'),
        dataItems: [
            { name: 'Route Selection', value: 250 },
            { name: 'Travel Times', value: 200 },
            { name: 'Traffic Density', value: 250 },
            { name: 'Stop Duration', value: 250 }
        ]
    }
];

// Checkbox item component
const DataCheckboxItem = ({ item, isSelected, onToggle }: DataCheckboxItemProps) => (
    <TouchableOpacity
        className="flex-row items-center justify-between py-3 border-b border-white/10"
        onPress={onToggle}
    >
        <View className="flex-row items-center">
            {isSelected ? (
                <CheckSquare size={22} color="#60A5FA" weight="fill" />
            ) : (
                <Square size={22} color="#9CA3AF" weight="regular" />
            )}
            <Text className="text-white text-base font-gilroy-medium tracking-tight ml-3">
                {item.name}
            </Text>
        </View>
        <Text className="text-green-100 text-base font-gilroy-medium tracking-tight">
            {item.value} DCG
        </Text>
    </TouchableOpacity>
);

export default function BuyerDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    // Find the buyer data based on the ID
    const buyer = buyerData.find(item => item.id === id);

    // State for tracking selected data items
    const [selectedItems, setSelectedItems] = useState<SelectedItems>({});

    // Calculate total DCG based on selected items
    const totalDCG = buyer ? buyer.dataItems
        .filter((_, index) => selectedItems[index])
        .reduce((sum, item) => sum + item.value, 0) : 0;

    // Toggle selection for an item
    const toggleItem = (index: number) => {
        setSelectedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Handle sell data action
    const handleSellData = () => {
        console.log(`Selling data for total of ${totalDCG} DCG`);
    };

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
                    <View className="w-20 h-20 bg-white/10 rounded-full items-center justify-center mb-3">
                        <Image source={buyer.icon} className="w-12 h-12 opacity-60" resizeMode="contain" />
                    </View>
                    <Text className="text-white text-2xl font-gilroy-medium tracking-tight text-center">{buyer.name}</Text>
                    <View className="flex-row items-center mt-1">
                        <ShieldCheck size={14} color="#9CA3AF" weight="bold" />
                        <Text className="text-gray-400 text-xs ml-1 font-gilroy-medium tracking-tight">Trust Score: {buyer.trustScore}</Text>
                    </View>
                </View>

                {/* Description */}
                <View className="mb-6">
                    <Text className="text-white text-lg font-gilroy-bold tracking-tight mb-3">About this offer</Text>
                    <Text className="text-gray-300 text-base font-gilroy-medium tracking-tight leading-5">
                        {buyer.longDescription}
                    </Text>
                </View>

                {/* Selectable Data Items */}
                <View className="mb-6">
                    <Text className="text-white text-lg font-gilroy-bold tracking-tight mb-3">Select Data to Sell</Text>
                    <View className="bg-gray-800/20 rounded-xl p-4">
                        {buyer.dataItems.map((item, index) => (
                            <DataCheckboxItem
                                key={index}
                                item={item}
                                isSelected={!!selectedItems[index]}
                                onToggle={() => toggleItem(index)}
                            />
                        ))}
                    </View>
                </View>

                {/* Total Amount Display */}
                <View className="bg-gray-800/20 rounded-xl p-6 mb-5 items-center">
                    <Text className="text-gray-300 text-sm font-gilroy-medium tracking-tight mb-2">Total Earnings</Text>
                    <Text className="text-green-100 text-5xl font-gilroy-medium tracking-tight">{totalDCG} DCG</Text>
                    <Text className="text-gray-400 text-xs font-gilroy-medium tracking-tight mt-2">for selected data</Text>
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
                <TouchableOpacity
                    className={`py-4 rounded-lg items-center justify-center mb-3 ${totalDCG > 0 ? 'bg-white' : 'bg-white/40'}`}
                    onPress={handleSellData}
                    disabled={totalDCG === 0}
                >
                    <Text className={`text-base font-gilroy-bold tracking-tight ${totalDCG > 0 ? 'text-black' : 'text-gray-600'}`}>
                        SELL DATA FOR {totalDCG} DCG
                    </Text>
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