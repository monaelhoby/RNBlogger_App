import React from 'react'
import { 
    StyleSheet, 
    FlatList,
    View,
    Platform,
    Alert
} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'


import Block from '../../shared/Block'
import ArticleItem from '../../shared/article/articleItem'
import Button from '../../shared/Button'
import * as ArticleAction from '../../store/actions/articles'
import { Ionicons } from '@expo/vector-icons';
import Color from '../../constants/colors'


const PlacesList = props => {

    const articles = useSelector(state => state.ArticleReducer.userArticles );

    const dispatch = useDispatch();

    const deleteArticle = (id) => {
        Alert.alert('Are you Sure?' , 'Do you realy want delete this Article?' ,
        [{text : 'No', style : 'default'},
        {text : 'yes', style : 'destructive', 
        onPress : () => {dispatch(ArticleAction.deleteArticle(id))}}]
        )
      }
  
    const updateArticle = id  => {
        props.navigation.navigate('AddArticle',{
            articleId : id
        })
    }

    const [isLoading, setLoading] = React.useState(false)

    const loadedArticles = async () => {
        await dispatch(ArticleAction.fetchArticle())
    }

    React.useEffect(() => {
        setLoading(true)
        loadedArticles().then(setLoading(false))
    },[dispatch])  

    return (
      <Block>
          <FlatList
            onRefresh={loadedArticles}
            refreshing={isLoading}
            data={articles}
            keyExtractor = {item => item.id}
            renderItem = { Article =>(
                   <ArticleItem 
                   imageurl = {Article.item.imgLink}
                   title = {Article.item.title}
                   detail = {Article.item.detail}
                   date = {Article.item.date}
                   navigation = {props.navigation}
                   onPress = { () => {
                            props.navigation.navigate("ArticleDetail",{
                                articleName : Article.item.title,
                                articleId : Article.item.id
                            })
                            }
                }
                   >
                  <View style={styles.btns}> 
                    <Button
                        accent variant
                        title={<Ionicons name={Platform.OS === 'android' ?  "md-create" : "ios-create"} size={22} color="white" />}
                        onPress={() => {
                            updateArticle(Article.item.id);
                        }}
                    />
                    <Button
                        secondary variant
                        title={<Ionicons name={Platform.OS === 'android' ?  "md-trash" : "ios-trash"} size={22} color="white" />}
                        onPress={() => deleteArticle(Article.item.id)}
                    />
                   </View> 
                </ArticleItem>
                )
            }
          />
      </Block>
    )
}

export default PlacesList

const styles = StyleSheet.create({
    btns : {
        flexDirection : 'row',
        justifyContent : 'flex-end',
        marginTop : -35,
        marginBottom : 10
    }
})
