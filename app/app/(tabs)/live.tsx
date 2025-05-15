import { View, Text, Image } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import { useEffect, useState } from 'react';

export default function LiveScreen() {
    const userId = 'dhruv';
    const [connected, setConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
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
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 200);



        const ws = new WebSocket(`${process.env.EXPO_PUBLIC_API_URL_WS}/live?userid=${userId}`);
        console.log(`${process.env.EXPO_PUBLIC_API_URL_WS}/live?userid=${userId}`);

        ws.onopen = () => {
            console.log('WebSocket connected');
            setConnected(true);
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Received live data:', data);

                // Update state with live data
                setLiveData({
                    speed: Math.round(data.speed_kmph * 0.621371), // Convert km/h to mph
                    engineTemp: Math.round(data.engine_temp_c),
                    alerts: liveData.alerts,
                    rpm: data.engine_rpm,
                    fuel: Math.round(data.fuel_level_pct),
                    location: {
                        lat: data.lat,
                        lon: data.lon
                    },
                    status: data.speed_kmph > 0 ? 'moving' : 'stationary'
                });
            } catch (err) {
                console.warn('Failed to parse message', event.data);
            }
        };

        ws.onerror = (error: any) => {
            console.error('WebSocket error:', error.message);
            setConnected(false);
        };

        ws.onclose = (e) => {
            console.log(`WebSocket closed (code=${e.code}, reason=${e.reason})`);
            setConnected(false);
        };

        // Cleanup on unmount
        return () => {
            clearTimeout(timer);
            ws.close();
        };

    }, [userId]);

    // Placeholder component for loading state
    const Placeholder = ({ className }: { className: string }) => (
        <View className={`bg-black/5 rounded-lg animate-pulse ${className}`} />
    );

    return (
        <ScreenLayout title='Live Data Feed'>
            <View className="flex-1 mt-6 gap-2">
                {!connected && !isLoading && (
                    <View className="bg-red-500/80 rounded-xl p-3 mb-2">
                        <Text className="text-white font-gilroy-medium text-center">Unable to connect to server</Text>
                    </View>
                )}

                <View className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 h-36 flex-row justify-between items-center">
                    <View>
                        <View className="flex-row items-center mb-1">
                            <Text className="text-white text-base font-gilroy-medium tracking-tighter">Vehicle Location</Text>
                            {isLoading ? (
                                <Placeholder className="w-16 h-4 ml-2" />
                            ) : (
                                <View className="bg-[#20275a] rounded-full px-2 ml-2">
                                    <Text className="text-white text-[8px] p-1 font-gilroy-medium">{liveData.status}</Text>
                                </View>
                            )}
                        </View>
                        {isLoading ? (
                            <View className="mt-10">
                                <Placeholder className="w-48 h-12" />
                            </View>
                        ) : (
                            <Text className="text-white mt-10 text-4xl font-gilroy-medium tracking-tighter">
                                {liveData.location.lat.toFixed(2)} N, {liveData.location.lon.toFixed(2)} E
                            </Text>
                        )}
                    </View>
                    <Image
                        source={require('../../assets/cartesla.png')}
                        className="w-32 rounded-lg"
                        resizeMode="contain"
                    />
                </View>

                <View className="flex-row gap-2">
                    {/* Speed Card */}
                    <View className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 flex-1 h-60 overflow-hidden">
                        <View className="flex-row justify-between items-s">
                            <Text className="text-white text-base font-gilroy-medium tracking-tighter">Speed</Text>
                            {isLoading ? (
                                <Placeholder className="w-24 h-8" />
                            ) : (
                                <Text className="text-white text-3xl font-gilroy-medium tracking-tighter">{liveData.speed} mph</Text>
                            )}
                        </View>
                        <View className="h-52 w-full items-center justify-center mt-4 self-center">
                            <Image
                                source={require('../../assets/speed.png')}
                                className="w-56 h-56 absolute"
                                resizeMode="contain"
                            />
                        </View>
                    </View>

                    <View className="bg-white/10 rounded-3xl p-5 w-28 h-60 overflow-hidden relative">
                        <Text className="text-white text-sm font-gilroy-medium tracking-tighter">Eng Temp.</Text>
                        {isLoading ? (
                            <Placeholder className="w-16 h-8 mt-1 self-center" />
                        ) : (
                            <Text className="text-white text-2xl text-center font-gilroy-medium tracking-tighter mt-1">{liveData.engineTemp}° C</Text>
                        )}
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
                        <View className="bg-white/10 backdrop-blur-lg rounded-3xl px-4 py-2 w-36 h-36 overflow-hidden">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-white text-base font-gilroy-medium tracking-tighter">Alerts</Text>
                                {isLoading ? (
                                    <Placeholder className="w-8 h-8" />
                                ) : (
                                    <Text className="text-white text-2xl font-gilroy-medium tracking-tighter mt-1">{liveData.alerts}</Text>
                                )}
                            </View>
                            <View className="flex-1 items-center justify-center mt-2">
                                <Image
                                    source={require('../../assets/alerts.png')}
                                    className="w-44 h-44 absolute -bottom-15"
                                    resizeMode="contain"
                                />
                            </View>
                        </View>

                        <View className="bg-white/10 relative backdrop-blur-lg rounded-3xl px-4 py-2 w-36 h-36 overflow-hidden">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-white text-base font-gilroy-medium tracking-tighter">RPM</Text>
                                {isLoading ? (
                                    <Placeholder className="w-16 h-8" />
                                ) : (
                                    <Text className="text-white text-2xl font-gilroy-medium tracking-tighter mt-1">{liveData.rpm.toLocaleString()}</Text>
                                )}
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
                    <View className="bg-white/10 backdrop-blur-lg rounded-3xl px-5 py-4 flex-1 overflow-hidden">
                        <View className="flex-row justify-between items-start">
                            <Text className="text-white text-base font-gilroy-medium tracking-tighter">Fuel</Text>
                            {isLoading ? (
                                <Placeholder className="w-16 h-8" />
                            ) : (
                                <Text className="text-white text-[30px] font-gilroy-medium tracking-tighter">{liveData.fuel}%</Text>
                            )}
                        </View>
                        <View className="flex-1 items-center justify-center">
                            <Image
                                source={require('../../assets/fuel2.png')}
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