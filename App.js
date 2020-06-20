import React from 'react';
import { StyleSheet, Platform, SafeAreaView, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font'
import {Provider} from 'react-redux'

import Navigator from './src/route/index'
import Store from './src/store/store'
import ApiKeys from './src/constants/apiKey';
import * as Firebase from 'firebase';
import apiKey from './src/constants/apiKey';


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./src/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./src/fonts/OpenSans-Bold.ttf')
  });
};



export default function App() {

  
  const [fontLoaded, setFontLoaded] = React.useState(false);

  // Initialize firebase...
  if (!Firebase.apps.length) {Firebase.initializeApp(apiKey.FirebaseConfig)}

//  !Firebase.apps.length ? Firebase.initializeApp(apiKey.FirebaseConfig) : Firebase.app();


  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={Store}>
      <SafeAreaView style={styles.droidSafeArea} forceInset={{ top: 'never',  bottom: 'never' }}>
      <Navigator />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 25 : 0
},
});
