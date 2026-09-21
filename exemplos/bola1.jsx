import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';

import React, { useEffect, useState } from 'react';

export default function Exemplo6() {
    const [accel, setAccel] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        console.log('Exemplo11 mounted');
        Accelerometer.setUpdateInterval(16);
        const subscription = Accelerometer.addListener((data) => {
            setAccel(data);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const { width, height } = Dimensions.get('window');
    const MARGIN = 20;
    const CIRCLE_SIZE = 60;

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    const minX = MARGIN;
    const maxX = width - MARGIN - CIRCLE_SIZE;
    const minY = MARGIN;
    const maxY = height - MARGIN - CIRCLE_SIZE;

    const mappedX = clamp((( -accel.x + 1 ) / 2) * (maxX - minX) + minX, minX, maxX);
    const mappedY = clamp((( accel.y + 1 ) / 2) * (maxY - minY) + minY, minY, maxY);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Acelerômetro — mova a bolinha</Text>

            <View style={styles.info}>
                <Text>X: {accel.x.toFixed(2)}</Text>
                <Text>Y: {accel.y.toFixed(2)}</Text>
                <Text>Z: {accel.z.toFixed(2)}</Text>
            </View>

            <View style={[styles.ball, { left: mappedX, top: mappedY, width: CIRCLE_SIZE, height: CIRCLE_SIZE, borderRadius: CIRCLE_SIZE / 2 }]} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 30,
        textAlign: 'center',
    },

    info: {
        position: 'absolute',
        top: 80,
        left: 20,
    },

    ball: {
        position: 'absolute',
        backgroundColor: '#ff5252',
    },
    checkOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: '#eef',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});