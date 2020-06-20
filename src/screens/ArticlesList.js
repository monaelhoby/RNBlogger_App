import React from 'react'
import { 
    StyleSheet, 
    FlatList
} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'


import Block from '../shared/Block'
import ArticleItem from '../shared/article/articleItem'
import * as ArticleAction from '../store/actions/articles'
import * as UserAction from '../store/actions/admin'


const PlacesList = props => {
    

    const [isLoading, setLoading] = React.useState(false)

    const articles = useSelector(state => state.ArticleReducer.articles);
    const usersData = useSelector(state => state.User.userArr);

    
    // console.log("OwnerId",usersData)
    const dispatch = useDispatch();
        
    const loadedArticles = async () => {
        //  dispatch(UserAction.fetchUserData())
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
            renderItem = { Article =>{
                const user = usersData.find(arr => arr.id === Article.item.ownerId)
                // console.log( user.photo)
                return (
                   <ArticleItem 
                //    user={user.userName}
                   imageurl = {Article.item.imgLink}
                   title = {Article.item.title}
                   detail = {Article.item.detail}
                   date = {Article.item.date}
                   onPress = {
                       () => {
                        props.navigation.navigate("ArticleDetail",{
                            articleName : Article.item.title,
                            articleId : Article.item.id
                        })
                       }
                    }
                   />
                )}
            }
          />
      </Block>
    )
}

export default PlacesList

const styles = StyleSheet.create({
    
})
