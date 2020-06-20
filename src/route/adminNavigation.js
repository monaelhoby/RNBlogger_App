import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import Color from '../constants/colors'
import SignupScreen from '../screens/admin/Signup'
import LoginScreen from '../screens/admin/Login'
import StartupScreen from '../screens/admin/StartupScreen'

const Stack = createStackNavigator();


const AdminArticles = () => {
    return (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Platform.OS === 'android' ? Color.primary : ''
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        >
        <Stack.Screen 
          name="Welcome" 
          component={StartupScreen} 
          options = {{
            headerShown: false,
          }}
          />
        <Stack.Screen
          name="SignUp"
          component={SignupScreen}
          options = {{
            headerShown: false,
          }}
         />
        <Stack.Screen
          name = "Login"
          component = {LoginScreen}
          options = {{
            headerShown: false,
          }}
        />
        </Stack.Navigator>
      );
  }

  export default AdminArticles