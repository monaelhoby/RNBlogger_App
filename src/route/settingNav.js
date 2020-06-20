import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import Color from '../constants/colors'
import Setting from '../screens/admin/setting'

const Stack = createStackNavigator();


const UserSetting = () => {
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
          name="UserSetting"
          component={Setting}
          options = {{
            title : "Setting"
          }}
         />
        </Stack.Navigator>
      );
  }

  export default UserSetting