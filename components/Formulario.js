import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from 'react-native';

import { Picker } from '@react-native-community/picker';

const Formulario = ({ busqueda, guardarBusqueda, guardarConsultar }) => {

    const { pais, ciudad } = busqueda;

    const [ animacionboton ] = useState( new Animated.Value(1) );

    const getWeather = () => {
        
        if( pais.trim() === '' || ciudad.trim() === '' ){
            return showAlert();
        }
        
        guardarConsultar(true);

    };

    const showAlert = () => {
        Alert.alert(
            'Error',
            'Agrega una ciudad y pais para la búsqueda',
            [{ text: 'Entendido'}]
        )
    };

    const animacionEntrada = () => {
        Animated.spring( animacionboton, { 
            toValue: .75,
            useNativeDriver: true,
         } ).start();
    };

    const animacionSalida = () => {
        Animated.spring( animacionboton, { 
            toValue: 1, 
            friction: 4,
            tension: 30,
            useNativeDriver: true,
         } ).start();
    };

    const estiloAnimacion = {
        transform: [ { scale: animacionboton } ]
    };

    return (
        <>
            <View style={ styles.Formulario }>

                <View>

                    <TextInput 
                        value={ ciudad }
                        style={ styles.input }
                        onChangeText={ ciudad => guardarBusqueda({ ...busqueda, ciudad }) }
                        placeholder= "Ciudad"
                        placeholderTextColor= '#666'
                    />

                </View>

                <View>

                    <Picker 
                        selectedValue={ pais }
                        itemStyle={{ height: 120, backgroundColor: '#FFF' }}
                        onValueChange={ pais => guardarBusqueda( { ...busqueda, pais }) }
                     >
                        <Picker.Item label='-- Seleccione un país --' value="" />
                        <Picker.Item label='Estados Unidos' value="US" />
                        <Picker.Item label='México' value="MX" />
                        <Picker.Item label='Argentina' value="AR" />
                        <Picker.Item label='Colombia' value="CO" />
                        <Picker.Item label='Costa Rica' value="CR" />
                        <Picker.Item label='España' value="ES" />
                        <Picker.Item label='Guatemala' value="GT" />
                    </Picker>

                </View>

                <TouchableWithoutFeedback 
                    onPressIn={ () => animacionEntrada() }
                    onPressOut={ () => animacionSalida() }
                    onPress={ () => getWeather() }
                >
                    <Animated.View 
                        style={ [ styles.btnSearch, estiloAnimacion ] }
                    >
                        <Text style={ styles.textSearch }>Buscar clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>


            </View>
        </>
    );

};

const styles = StyleSheet.create({

    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },

    btnSearch:{
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },

    textSearch: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }

});

export default Formulario;
