import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Gyroscope } from 'expo-sensors';

export default function Exemplo2() {
  const [dados, setDados] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    const subscription = Gyroscope.addListener((data) => {
      console.log(data);

      setDados(data);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giroscópio</Text>

      <Text style={styles.valor}>
        X: {dados.x.toFixed(2)}
      </Text>

      <Text style={styles.valor}>
        Y: {dados.y.toFixed(2)}
      </Text>

      <Text style={styles.valor}>
        Z: {dados.z.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  valor: {
    fontSize: 22,
    marginVertical: 8,
  },
});