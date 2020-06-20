import React, {useEffect} from 'react'
import { StyleSheet, Text, View, ActivityIndicator, AsyncStorage } from 'react-native'
import {useDispatch} from 'react-redux'

import Color from '../../constants/colors'
import * as AuthActions from '../../store/actions/admin'

const StartupScreen = props => {

    const dispatch = useDispatch()

    useEffect(() => {
        const tryLogin = async () => {
          const userData = await AsyncStorage.getItem('userData');
          if (!userData) {
            props.navigation.navigate('Login');
            return;
          }
          const dateTransformation = JSON.parse(userDate)
          const {token, userId, expiryDate} = dateTransformation
          const expirationDate = new Date(expiryDate)

          if(expirationDate <= new Date() || !token || !userId){
            props.navigation.navigate('Login');
            return
          }
          const expirationTime = expirationDate.getTime() -  new Date().getTime()
          props.navigation.navigate('Articles');
          dispatch(AuthActions.authenticate(userId, token, expirationTime))
        }

        tryLogin()
    },[dispatch]) 

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={Color.primary} />
        </View>
    )
}

export default StartupScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent : 'center',
        alignContent : 'center'
    }
})
