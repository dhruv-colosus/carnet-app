import { View, Text } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';

export default function PortfolioScreen() {
    return (
        <ScreenLayout>
            <View className="flex-1 items-center justify-center">
                <Text className="text-white text-xl font-gilroy-bold">Portfolio Screen</Text>
            </View>
        </ScreenLayout>
    );
} 