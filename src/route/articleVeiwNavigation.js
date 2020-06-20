import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ArticlesList from '../screens/ArticlesList'
import ArticleDetail from '../screens/ArticleDetail'
import Color from '../constants/colors'
import HeaderButton from '../shared/HeaderButton'

const Stack = createStackNavigator();


const Articles = () => {
    return (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Platform.OS === 'android' ? Color.primary : '',
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            safeAreaInsets : {
              top : 25
            }
          }}
        >
          <Stack.Screen
            name="Articles"
            component={ArticlesList}
            options={ ({navigation}) => ({
              title: 'Articles',
              headerLeft : () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                            onPress={() => {navigation.toggleDrawer()}}/>
                       </HeaderButtons>),
            })}
          />
          <Stack.Screen
            name="ArticleDetail"
            component={ArticleDetail}
            options={ ({route}) => ({ 
              title:  route.params.articleName
            })
            }
          />
        </Stack.Navigator>
      );
}

export default Articles