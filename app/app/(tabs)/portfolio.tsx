import React from 'react';
import { View, Text, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import { GiftIcon } from 'lucide-react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Keep this if you use icons

const transactions = [
    { id: '1', type: 'received', description: 'Sold Data to Tesla Inc', amount: '+4000 DCG', date: '25-05-2025 13:30', icon: 'gift-outline' },
    { id: '2', type: 'received', description: 'Sold Data to Forc Corp', amount: '+3000 DCG', date: '25-05-2025 13:30', icon: 'gift-outline' },
    { id: '3', type: 'sent', description: 'Cash out', amount: '-30000 DCG', date: '25-05-2025 13:30', icon: 'arrow-up-circle-outline' },
];

export default function PortfolioScreen() {
    return (
        <ScreenLayout title="Portfolio">
            <ScrollView className="flex-1 px-2 pt-4 font-gilroy-medium tracking-tight" showsVerticalScrollIndicator={false}>

                <View className="px-[5px] pt-2 bg-[#141414] rounded-3xl">
                    <Text className="text-gray-200 text-base mb-6 mt-1 ml-1 font-gilroy-medium tracking-tight">Your wallet</Text>
                    <ImageBackground
                        source={require('../../assets/bg3.png')}
                        className="rounded-3xl overflow-hidden mb-[5px] px-5 pb-3"
                        resizeMode="cover"
                    >
                        <Image source={require('../../assets/logo.png')} className="w-8 h-8 mt-6 opacity-40" resizeMode="contain" />

                        <View className="pt-10">
                            <Text className="text-white text-4xl mb-1 font-gilroy-medium tracking-tight">32,432 DCG</Text>
                            <Text className="text-white text-xs font-gilroy-medium tracking-tight opacity-80">total balance</Text>
                        </View>
                    </ImageBackground>
                </View>

                <Text className="text-white text-lg mb-3 font-gilroy-bold tracking-tight mt-6">Transactions</Text>

                <View className="mb-4">
                    {transactions.map((item) => (
                        <View key={item.id} className="flex-row items-center justify-between bg-white/5 border border-white/20 backdrop-blur-md p-4 rounded-xl mb-3">
                            <View className="flex-row items-center flex-1 mr-2">
                                <View className="w-10 h-10 bg-white/30 rounded-full mr-3 items-center justify-center">
                                    <GiftIcon size={20} strokeWidth={1.5} color="#fff" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white text-sm font-gilroy-medium tracking-tight">{item.description}</Text>
                                    <Text className="text-gray-400 text-xs font-gilroy-medium tracking-tight">{item.date}</Text>
                                </View>
                            </View>
                            <View className="items-end">
                                <Text className={`text-xl font-gilroy-medium tracking-tight ${item.type === 'received' ? 'text-white' : 'text-red-400'}`}>{item.amount}</Text>
                                <Text className="text-gray-200 text-xs font-gilroy-medium tracking-tight">{item.type}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <TouchableOpacity className="items-end mb-8">
                    <Text className="text-gray-400 text-sm font-gilroy-medium tracking-tight underline">see all</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-white py-4 rounded-lg items-center justify-center mb-6">
                    <Text className="text-black text-base font-gilroy-bold tracking-tight">CASH OUT</Text>
                </TouchableOpacity>

            </ScrollView>
        </ScreenLayout>
    );
}
