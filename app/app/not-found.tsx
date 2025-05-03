import { Link, Stack } from 'expo-router';
import { View } from 'react-native';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops! Not Found' }} />
            <View className="flex-1 bg-gray-900 justify-center items-center">
                <Link href="/" className="text-2xl underline text-white">
                    Go back to Home screen!
                </Link>
            </View>
        </>
    );
}
