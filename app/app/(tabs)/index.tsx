import { View, Text, ScrollView, Dimensions } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import { RoadHorizon, Speedometer, ChargingStation, WarningOctagon } from 'phosphor-react-native';
import Svg, { Path, LinearGradient, Stop, Defs } from 'react-native-svg';

const statsData = {
    vehicleName: "Dhruv's Tesla",
    date: "May 2",
    totalMiles: "7,950",
    averageSpeed: "23.5",
    totalAlerts: "5",
};

const { width } = Dimensions.get('window');

const WavyGraph = () => (
    <View className="mb-8 -mt-16 h-40 overflow-hidden">
        <Svg height="160" width={width}>
            <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#3B82F6" stopOpacity="0.3" />
                    <Stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
                </LinearGradient>
            </Defs>
            <Path
                d={`M0,120 C40,100 65,140 90,110 C115,80 140,130 165,100 C190,75 215,110 240,100 C265,90 290,110 315,90 C340,70 365,100 ${width},90 L${width},160 L0,160 Z`}
                fill="url(#grad)"
            />
            <Path
                d={`M0,120 C40,100 65,140 90,110 C115,80 140,130 165,100 C190,75 215,110 240,100 C265,90 290,110 315,90 C340,70 365,100 ${width},90`}
                stroke="#3B82F6"
                strokeWidth="2"
                fill="none"
            />
        </Svg>
        <View className="flex-row justify-between w-full px-4 absolute bottom-2">
            <Text className="text-gray-400 text-xs">mon</Text>
            <Text className="text-gray-400 text-xs">tues</Text>
            <Text className="text-gray-400 text-xs">wed</Text>
            <Text className="text-gray-400 text-xs">thurs</Text>
            <Text className="text-gray-400 text-xs">fri</Text>
        </View>
    </View>
);

const StatRow = ({ Icon, label, value, unit }: { Icon: React.ElementType, label: string, value: string, unit: string }) => (
    <View className="flex-row justify-between items-center pt-10 pb-6 border-b-[1px] border-white/10">
        <View className="flex-col items-start space-x-3">
            <View style={{ opacity: 0.2 }} className="text-blue-400 text-xl font-gilroy-medium">
                <Icon size={24} color="white" weight="bold" />
            </View>
            <Text className="text-gray-300 text-base font-gilroy-medium">{label}</Text>
        </View>
        <View className="flex-row items-baseline space-x-1">
            <Text className="text-white text-6xl font-gilroy-medium tracking-tighter">{value}</Text>
            <Text className="text-gray-300 ml-2 text-lg">{unit}</Text>
        </View>
    </View>
);


export default function StatsScreen() {
    return (
        <ScreenLayout title="Statistics" vehicleName="Dhruv's Tesla">
            <ScrollView className="flex-1 " showsVerticalScrollIndicator={false} >

                <View className="px-4 pt-2 pb-4">
                    <Text className="text-white text-5xl tracking-tighter font-gilroy-medium mt-8 mb-5">
                        Dhruv's Vehicle Overview
                    </Text>

                    <View className="mb-4">
                        <StatRow
                            Icon={RoadHorizon}
                            label="Total miles driven"
                            value={statsData.totalMiles}
                            unit="miles"
                        />
                        <StatRow
                            Icon={Speedometer}
                            label="Average Speed"
                            value={statsData.averageSpeed}
                            unit="mph"
                        />
                        <StatRow
                            Icon={WarningOctagon}
                            label="Total Alerts"
                            value={statsData.totalAlerts}
                            unit="obd"
                        />
                    </View>
                </View>

                <View className="mx-0 px-0">
                    <View className="px-4">
                        <View className="flex-col items-start space-x-3 mt-4">
                            <View style={{ opacity: 0.2 }}>
                                <ChargingStation size={24} color="white" weight="bold" />
                            </View>
                            <Text className="text-gray-300 text-base font-gilroy-medium">Fuel Usage</Text>
                        </View>
                    </View>
                    <WavyGraph />
                </View>


            </ScrollView >
        </ScreenLayout >
    );
}