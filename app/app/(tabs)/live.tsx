import { View, Text, Image, ScrollView } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import { useEffect, useState } from 'react';

export default function LiveScreen() {
    const userId = 'dhruv';
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [liveData, setLiveData] = useState({
        speed: 14.5,
        engineTemp: 67,
        alerts: 5,
        rpm: 3245,
        fuel: 54,
        location: {
            lat: 12.96,
            lon: 77.60
        },
        status: 'moving'
    });

    useEffect(() => {
        // Use localhost for development
        async function fetchData() {
            setLoading(true);
            try {
                // For React Native, ensure proper protocol and add necessary headers
                const res = await fetch('http://localhost:8000/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error(`Server error: ${res.status}`);
                }

                const text = await res.text();
                console.log('Raw response:', text);

                try {
                    const data = JSON.parse(text);
                    console.log('Response data:', data);
                    setConnected(true);
                    setError('');
                    // Update liveData with the fetched data if needed
                    // setLiveData({...});
                } catch (parseError) {
                    console.log('Response is not JSON:', text);
                    setError('Invalid data format received');
                    setConnected(false);
                }
            } catch (error: any) {
                console.error('Error fetching data:', error);
                setConnected(false);
                setError(error.message || 'Failed to connect to server');
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        // Set up polling for real-time updates
        const interval = setInterval(fetchData, 10000); // Poll every 10 seconds

        // Cleanup on unmount
        return () => clearInterval(interval);

    }, [userId]);

    return (
        <ScreenLayout title='Live Data Feed'>
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-6"
            >
                <View className="flex-1 mt-6 gap-2">
                    {loading && (
                        <View className="bg-blue-500/80 rounded-xl p-3 mb-2">
                            <Text className="text-white font-gilroy-medium text-center">Loading live data...</Text>
                        </View>
                    )}

                    {!connected && !loading && (
                        <View className="bg-red-500/80 rounded-xl p-3 mb-2">
                            <Text className="text-white font-gilroy-medium text-center">
                                {error || 'Unable to connect to server'}
                            </Text>
                            <Text className="text-white font-gilroy-regular text-xs text-center mt-1">
                                Please check your connection and try again
                            </Text>
                        </View>
                    )}

                    <View className="bg-white/20 backdrop-blur-lg rounded-3xl p-5 h-36 flex-row justify-between items-center">
                        <View>
                            <View className="flex-row items-center mb-1">
                                <Text className="text-white text-base font-gilroy-medium tracking-tighter">Vehicle Location</Text>
                                <View className="bg-[#20275a] rounded-full px-2 ml-2">
                                    <Text className="text-white text-[8px] p-1 font-gilroy-medium">{liveData.status}</Text>
                                </View>
                            </View>
                            <Text className="text-white mt-10 text-4xl font-gilroy-medium tracking-tighter">
                                {liveData.location.lat.toFixed(2)} N, {liveData.location.lon.toFixed(2)} E
                            </Text>
                        </View>
                        <Image
                            source={require('../../assets/cartesla.png')}
                            className="w-32 rounded-lg"
                            resizeMode="contain"
                        />
                    </View>

                    <View className="flex-row gap-2">
                        {/* Speed Card */}
                        <View className="bg-white backdrop-blur-lg rounded-3xl p-5 flex-1 h-60 overflow-hidden">
                            <View className="flex-row justify-between items-s">
                                <Text className="text-black text-base font-gilroy-medium tracking-tighter">Speed</Text>
                                <Text className="text-black text-3xl font-gilroy-medium tracking-tighter">{liveData.speed} mph</Text>
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
                            <Text className="text-white text-2xl text-center font-gilroy-medium tracking-tighter mt-1">{liveData.engineTemp}° C</Text>
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
                                    <Text className="text-black text-2xl font-gilroy-medium tracking-tighter mt-1">{liveData.alerts}</Text>
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
                                    <Text className="text-black text-2xl font-gilroy-medium tracking-tighter mt-1">{liveData.rpm.toLocaleString()}</Text>
                                </View>
                                <View className="flex-1 items-center justify-center mt-2">
                                    <Image
                                        source={require('../../assets/rpm-meter.png')}
                                        className="w-80 h-80 absolute"
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Right Side - 1 big block */}
                        <View className="bg-white backdrop-blur-lg rounded-3xl px-5 py-4 flex-1 overflow-hidden">
                            <View className="flex-row justify-between items-start">
                                <Text className="text-black text-base font-gilroy-medium tracking-tighter">Fuel</Text>
                                <Text className={`text-${liveData.fuel > 30 ? 'green-500' : 'red-500'} text-[30px] font-gilroy-medium tracking-tighter`}>{liveData.fuel}%</Text>
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
            </ScrollView>
        </ScreenLayout>
    );
} 