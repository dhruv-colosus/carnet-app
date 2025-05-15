import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenLayout from '../../components/ScreenLayout';
import { Store } from 'lucide-react-native';
import { ShieldCheck, TrendUp } from 'phosphor-react-native';

// Mock data for potential buyers
const buyerData = [
    {
        id: '1',
        name: 'Tesla Inc',
        description: 'Vehicle performance & driver behavior',
        amount: '1000 DCG',
        trustScore: '98%',
        dataPoints: '158',
        icon: require('../../assets/logo.png')
    },
    {
        id: '2',
        name: 'Ford Corp',
        description: 'Engine performance & maintenance data',
        amount: '850 DCG',
        trustScore: '95%',
        dataPoints: '120',
        icon: require('../../assets/logo.png')
    },
    {
        id: '3',
        name: 'Waymo AI',
        description: 'Location & environmental data',
        amount: '1200 DCG',
        trustScore: '92%',
        dataPoints: '210',
        icon: require('../../assets/logo.png')
    },
    {
        id: '4',
        name: 'Toyota Motors',
        description: 'Fuel usage & emission patterns',
        amount: '750 DCG',
        trustScore: '97%',
        dataPoints: '96',
        icon: require('../../assets/logo.png')
    },
    {
        id: '5',
        name: 'Uber',
        description: 'Route optimization & traffic patterns',
        amount: '950 DCG',
        trustScore: '94%',
        dataPoints: '144',
        icon: require('../../assets/logo.png')
    }
];

// Buyer card component
const BuyerCard = ({ item, onPress }: { item: any, onPress: () => void }) => (
    <TouchableOpacity
        onPress={onPress}
        className="bg-gray-800/30 rounded-xl p-3 mb-3 flex-1 mx-1"
    >
        <View className="flex-row justify-between items-center mb-2">
            <View className="w-12 h-12 bg-white/10 rounded-full items-center justify-center mb-2">
                <Image source={item.icon} className="w-7 h-7 opacity-60" resizeMode="contain" />
            </View>
            <View className='flex-col items-end'>
                <Text className="text-white text-base font-gilroy-medium tracking-tight text-center">{item.name}</Text>
                <Text className="text-green-100 text-xl font-gilroy-bold tracking-tight">{item.amount}</Text>
            </View>
        </View>



        <Text className="text-gray-300 text-xs font-gilroy-medium tracking-tight text-center mb-3" numberOfLines={2}>
            {item.description}
        </Text>


        <View className="flex-row justify-between">
            <View className="flex-row items-center">
                <ShieldCheck size={12} color="#9CA3AF" weight="bold" />
                <Text className="text-gray-400 text-xs ml-1 font-gilroy-medium tracking-tight">{item.trustScore}</Text>
            </View>
            <View className="flex-row items-center">
                <TrendUp size={12} color="#9CA3AF" weight="bold" />
                <Text className="text-gray-400 text-xs ml-1 font-gilroy-medium tracking-tight">{item.dataPoints}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

export default function ShopScreen() {
    const router = useRouter();

    const handleBuyerPress = (id: string) => {
        router.push(`/shop/${id}`);
    };

    const renderBuyerItem = ({ item, index }: { item: any, index: number }) => (
        <BuyerCard
            key={item.id}
            item={item}
            onPress={() => handleBuyerPress(item.id)}
        />
    );

    return (
        <ScreenLayout title="Marketplace">
            <ScrollView className="flex-1 px-2 pt-4" showsVerticalScrollIndicator={false}>
                <Text className="text-white text-5xl tracking-tighter font-gilroy-medium mt-8 mb-5 px-2">
                    Sell your Data to trusted Buyers
                </Text>

                <View className="bg-blue-500/10 rounded-xl p-4 mb-6 mx-1">
                    <View className="flex-row items-center space-x-2">
                        <Text className="text-blue-300 text-lg font-gilroy-medium tracking-tight">
                            Available Marketplace Offers
                        </Text>
                    </View>
                    <Text className="text-gray-300 text-sm font-gilroy-medium mt-2 tracking-tight">
                        Buyers are interested in your vehicle data. Tap to view offers and sell securely.
                    </Text>
                </View>

                <View className="mb-6">
                    {/* Grid layout with 2 columns */}
                    {buyerData.reduce((rows: any[], item, index) => {
                        if (index % 2 === 0) rows.push([item]);
                        else rows[rows.length - 1].push(item);
                        return rows;
                    }, []).map((row, rowIndex) => (
                        <View key={`row-${rowIndex}`} className="flex-row mx-1 mb-3">
                            {row.map((item: any) => (
                                <BuyerCard
                                    key={item.id}
                                    item={item}
                                    onPress={() => handleBuyerPress(item.id)}
                                />
                            ))}
                            {row.length === 1 && <View className="flex-1 mx-1" />} {/* Empty space for odd number of items */}
                        </View>
                    ))}
                </View>

                <View className="h-10" />
            </ScrollView>
        </ScreenLayout>
    );
} 