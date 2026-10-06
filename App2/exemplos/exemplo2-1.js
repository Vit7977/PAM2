import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Gyroscope, Accelerometer } from 'expo-sensors';

export default function Exemplo21() {
    const [dadosA, setDadosA] = useState({x: 0, y: 0, z: 0,});
    const [dadosG, setDadosG] = useState({x: 0, y: 0, z: 0,});

  useEffect(() => {
    const subscription = Gyroscope.addListener((data) => {
        Accelerometer.addListener((data) => {
            if(!(data.x == 0 && data.y == 0 && data.z == 0)){
                setDadosA(data);
            }
        })

        if(!(data.x == 0 && data.y == 0 && data.z == 0)){
            setDadosG(data);
        }
    });
    

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
        <View style={{ alignItems: 'center',}}>

            <Text style={styles.title}>Giroscópio</Text>

            <Text style={styles.valor}>
                X: {dadosG.x.toFixed(2)}
            </Text>

            <Text style={styles.valor}>
                Y: {dadosG.y.toFixed(2)}
            </Text>

            <Text style={styles.valor}>
                Z: {dadosG.z.toFixed(2)}
            </Text>
        </View>
        <View style={{ alignItems: 'center',}}>

            <Text style={styles.title}>Acelerometro</Text>

            <Text style={styles.valor}>
                X: {dadosA.x.toFixed(2)}
            </Text>

            <Text style={styles.valor}>
                Y: {dadosA.y.toFixed(2)}
            </Text>

            <Text style={styles.valor}>
                Z: {dadosA.z.toFixed(2)}
            </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25
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