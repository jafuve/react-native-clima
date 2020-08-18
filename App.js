import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Keyboard, TouchableWithoutFeedback, Alert
} from 'react-native';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () => {

  const [ busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };


  const [ consultar, guardarConsultar ] = useState(false);
  const [ resultado, guardarResultado ] = useState(false);
  const [ bgcolor, guardarBgcolor ] = useState('rgb(71, 149, 212)');

  const { ciudad, pais } = busqueda;
  // console.log(ciudad, pais);

  useEffect( () => {
    
    const consultarClima = async () => {
      
      if( consultar ){
        
        const appId = 'b82fb44ecaee4b13ac83682313f6d48b';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ ciudad },${ pais }&appid=${ appId }`;
  
        try {
  
          const respuesta = await fetch( url );
          const resultado = await respuesta.json();

          console.log(resultado);

          const { cod } = resultado;
          // console.log("codigo", cod);

          if( cod === 404){
            showAlert();
            return;
          }
            
          guardarResultado( resultado );

          // MODIFICA COLOR
          const kelvin = 273.15;
          const { main } = resultado;
          const actual = main.temp - kelvin;

          if( actual < 10){
            guardarBgcolor( 'rgb( 105, 108, 149 )');
          }else if ( actual >= 10 && actual < 25 ){
            guardarBgcolor( 'rgb(71, 149, 212)');
          }else{
            guardarBgcolor( 'rgb( 178, 28, 61 )');
          }
          
        } catch (error) {
          showAlert();
        }

        guardarConsultar(false);
  
      }

    };

    consultarClima();

  }, [ consultar ] );

  const showAlert = () => {
    Alert.alert(
        'Error',
        'No hay resultados, intenta con otra ciudad o país.',
        [{ text: 'Entendido'}]
    )
  };

  const bgColorApp = {
    backgroundColor: bgcolor
  };


  return (
    <>
      <TouchableWithoutFeedback onPress={ () => hideKeyboard() }>

        <View style={ [ styles.app, bgColorApp ] }>

          <View style={ styles.content }>
            <Clima 
              resultado={ resultado }
            />

            <Formulario 
              busqueda={ busqueda }
              guardarBusqueda={ guardarBusqueda }
              guardarConsultar = {  guardarConsultar }
            />

          </View>

        </View>

      </TouchableWithoutFeedback>
      
    </>
  );
};

const styles = StyleSheet.create({
  
  app: {
    flex: 1,
    justifyContent: 'center'
  },

  content:{
    marginHorizontal: '2.5%'
  }

});

export default App;
