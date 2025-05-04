import { View, Text, Image } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';

export default function LiveScreen() {
    return (
        <ScreenLayout title='Live Data Feed'>
            <View className="flex-1 mt-6 gap-2">

                <View className="bg-white/20 backdrop-blur-lg rounded-3xl p-5 h-36 flex-row justify-between items-center">
                    <View>
                        <View className="flex-row items-center mb-1">
                            <Text className="text-white text-base font-gilroy-medium tracking-tighter">Vehicle Location</Text>
                            <View className="bg-[#20275a] rounded-full px-2 ml-2">
                                <Text className="text-white text-[8px] p-1 font-gilroy-medium">moving</Text>
                            </View>
                        </View>
                        <Text className="text-white mt-10 text-4xl font-gilroy-medium tracking-tighter">12.96 N, 77.60 E</Text>
                    </View>
                    <Image
                        source={require('../../assets/cartesla.png')}
                        className="w-32  rounded-lg"
                        resizeMode="contain"
                    />
                </View>

                <View className="flex-row gap-2">
                    {/* Speed Card */}
                    <View className="bg-white backdrop-blur-lg rounded-3xl p-5 flex-1 h-60 overflow-hidden">
                        <View className="flex-row justify-between items-s">
                            <Text className="text-black text-base font-gilroy-medium tracking-tighter">Speed</Text>
                            <Text className="text-black text-3xl font-gilroy-medium tracking-tighter">14.5 mph</Text>
                        </View>
                        <View className="h-52 w-full items-center justify-center mt-4 self-center">
                            <Image
                                source={require('../../assets/speed.png')}
                                className="w-56 h-56 absolute"
                                resizeMode="contain"
                            />
                        </View>
                    </View>


                    <View className="bg-white/20 rounded-3xl p-5 w-28 h-60 overflow-hidden relative">
                        <Text className="text-white text-sm font-gilroy-medium tracking-tighter">Eng Temp.</Text>
                        <Text className="text-white text-2xl text-center font-gilroy-medium tracking-tighter mt-1">67° C</Text>
                        <View className="flex-1 items-center justify-end">
                            <Image
                                source={require('../../assets/thermo.png')}
                                className="h-44 top-3 absolute"

                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>

                <View className="flex-row gap-2">
                    {/* Left Column - 2 blocks stacked */}
                    <View className="gap-2">
                        {/* Alerts Card */}
                        <View className="bg-white backdrop-blur-lg rounded-3xl px-4 py-2 w-36 h-36 overflow-hidden">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-back text-base font-gilroy-medium tracking-tighter">Alerts</Text>
                                <Text className="text-black text-2xl font-gilroy-medium tracking-tighter mt-1">5</Text>
                            </View>
                            <View className="flex-1 items-center justify-center mt-2">
                                <Image
                                    source={require('../../assets/alerts.png')}
                                    className="w-44 h-44 absolute -bottom-15"
                                    resizeMode="contain"
                                />
                            </View>
                        </View>

                        <View className="bg-white relative backdrop-blur-lg rounded-3xl px-4 py-2 w-36 h-36 overflow-hidden">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-back text-base font-gilroy-medium tracking-tighter">RPM</Text>
                                <Text className="text-black text-2xl font-gilroy-medium tracking-tighter mt-1">3,245</Text>
                            </View>
                            <View className="flex-1 items-center justify-center mt-2">
                                <Image
                                    source={require('../../assets/rpm-meter.png')}
                                    className="w-80 h-80 absolute "
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Right Side - 1 big block */}
                    <View className="bg-white backdrop-blur-lg rounded-3xl px-5 py-4 flex-1 overflow-hidden">
                        <View className="flex-row justify-between items-start">
                            <Text className="text-black text-base font-gilroy-medium tracking-tighter">Fuel</Text>
                            <Text className="text-green-500 text-[30px] font-gilroy-medium tracking-tighter">54%</Text>
                        </View>
                        <View className="flex-1 items-center justify-center">
                            <Image
                                source={require('../../assets/petrol.png')}
                                className="w-56 h-56 absolute -bottom-9"
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScreenLayout>
    );
} 