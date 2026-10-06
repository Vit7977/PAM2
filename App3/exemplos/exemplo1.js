import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Gyroscope } from 'expo-sensors';

export default function Exemplo1() {
  useEffect(() => {
    const subscription = Gyroscope.addListener((data) => {
      console.log(data);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View>
      <Text>Giroscópio</Text>
    </View>
  );
}