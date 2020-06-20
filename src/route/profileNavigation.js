import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import AddArticle from '../screens/addArticle'
import AdminScreens from '../screens/admin/adminArticles'
import ArticleDetail from '../screens/ArticleDetail'
import Color from '../constants/colors'
import HeaderButton from '../shared/HeaderButton'

const Stack = createStackNavigator();


const UserArticles = () => {
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
          name="userArticles"
          component={AdminScreens}
          options={ ({navigation}) => ({
            title: 'Your Articles',
            headerRight : () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Add"
                  iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                  onPress={() => {
                    navigation.navigate('AddArticle',{articleId : 'articleId'});
                  }}
                />
              </HeaderButtons>
            ),
            headerLeft : () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
              onPress={() => {navigation.toggleDrawer()}}/>
              </HeaderButtons>)
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
          <Stack.Screen
            name="AddArticle"
            component={AddArticle}
            options={ ({route}) => ({
              title: route.params.articleId !== "articleId" ? "Update Article" : 'Add Article'
            })
            }
          />
        </Stack.Navigator>
      );
}

export default UserArticles