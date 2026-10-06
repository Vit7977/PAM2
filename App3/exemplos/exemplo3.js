import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Gyroscope } from 'expo-sensors';

export default function Exemplo3() {
  const [angulo, setAngulo] = useState(0);

  useEffect(() => {
    const subscription = Gyroscope.addListener((data) => {
      setAngulo((valorAtual) => valorAtual + data.z);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giroscópio</Text>

      <View
        style={[
          styles.cubo,
          {
            transform: [
              {
                rotate: `${angulo}deg`,
              },
            ],
          },
        ]}
      >
        <Text style={styles.texto}>CUBO</Text>
      </View>

      <Text style={styles.valor}>
        Ângulo: {angulo.toFixed(2)}°
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
    marginBottom: 60,
  },

  cubo: {
    width: 150,
    height: 150,
    backgroundColor: 'steelblue',
    alignItems: 'center',
    justifyContent: 'center',
  },

  texto: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  valor: {
    marginTop: 60,
    fontSize: 18,
  },
});