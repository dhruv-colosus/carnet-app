import { View, Text } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';

export default function LiveScreen() {
    return (
        <ScreenLayout title='Live Data Feed'>
            <View className="flex-1 items-center justify-center">
                <Text className="text-white text-xl font-gilroy-bold">Live Screen</Text>
            </View>
        </ScreenLayout>
    );
} 