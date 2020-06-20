import React from 'react'
import { Platform, SafeAreaView, Text, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView,DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux'


import Color from '../constants/colors'
import ArticlesNavigation from './articleVeiwNavigation'
import adminNavigation from './adminNavigation'
import userArticles from './profileNavigation'
import UserSetting from './settingNav'
import * as Authactions from '../store/actions/admin'
import * as userAction from '../store/actions/setting'

const Drawer = createDrawerNavigator();


const CustomDrawerContent = props => {

  const iconLabel = props => {
    return (
      <View style={{flexDirection : 'row'}}>
        <Ionicons name={Platform.OS === 'android' ? "md-log-out" : "ios-log-out"} size={24} color={Color.primary} />
        <Text style={{marginLeft : 10}}>Logout</Text>
      </View>
    )
  }

  const dispatch = useDispatch()
  return (
    <DrawerContentScrollView {...props}>
     <SafeAreaView forceInset={{top : 'always', horizontal : 'never'}}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={iconLabel}
        onPress={() =>{
          dispatch(Authactions.Logout())
          props.navigation.navigate('Articles')
        }}
      />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

const DrawerNav = () => {
  
  const usersData = useSelector(state => state.User.userArr);
  const AuthUser = useSelector(state => state.auth.userId)
const user = usersData.find(arr => arr.id === AuthUser)

console.log("route", user)


  const isSignIn = useSelector(state => !!state.auth.token)

  return (
      <Drawer.Navigator 
        initialRouteName="Articles"
        drawerContent={props => <CustomDrawerContent {...props} />}
      >  
      {
        isSignIn ? (
        <>
        <Drawer.Screen 
          name={user ? user.userName  : " "} 
          component={userArticles}
          options = {{
                drawerIcon: () => (
                  user ?
                  <Image
                    source={{uri : "'"+user.photo+"'"}}
                    // fadeDuration={0}
                    style={{width: 20, height: 20}}
                  /> : <Text></Text>
                )
              }}
        />
        <Drawer.Screen 
          name="Articles" 
          component={ArticlesNavigation} 
          options = {{
            drawerIcon: () => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-albums' : 'ios-albums'}
                size={23}
                color={Color.primary}
              />
            )
          }}
          />
          <Drawer.Screen 
          name="Profile" 
          component={userArticles} 
          options = {{
            drawerIcon: () => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-person' : 'ios-person'}
                size={23}
                color={Color.primary}
              />
            )
          }}
          />
          <Drawer.Screen 
          name="Setting" 
          component={UserSetting} 
          options = {{
            drawerIcon: () => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-settings' : 'ios-settings'}
                size={23}
                color={Color.primary}
              />
            )
          }}
          />
          </>
        ): (
        <Drawer.Screen 
          name="Admin" 
          component={adminNavigation} 
          options = {{
            drawerIcon: () => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-person' : 'ios-person'}
                size={23}
                color={Color.primary}
              />
            )
          }}
          />
          )
      }
      </Drawer.Navigator>
  )}

  const NavigationDrawer = () => {
    return (
      <NavigationContainer>
        <DrawerNav />
      </NavigationContainer>
    )
  }
  
  

export default NavigationDrawer



