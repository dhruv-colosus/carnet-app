import { View, Text } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';

export default function ShopScreen() {
    return (
        <ScreenLayout>
            <View className="flex-1 items-center justify-center">
                <Text className="text-white text-xl font-gilroy-bold">Shop Screen</Text>
            </View>
        </ScreenLayout>
    );
} 