import React from 'react'
import { StyleSheet, ScrollView, Image, View } from 'react-native'
import {useSelector} from 'react-redux'

import Block from '../shared/Block'
import Text from '../shared/text'

const PlaceDetails = ({route}) => {
   
    const articleId = route.params.articleId

    const selectedArticle = useSelector(state => state.ArticleReducer.articles.find(item => item.id === articleId))

//  console.log(selectedArticle)
    return (
      <ScrollView>
        <Block>
            <Image source={{uri : selectedArticle.imgLink}} style={{height : 250}}/>
            <View style={styles.block}>
                <Text  lg bold text={selectedArticle.title}/>
                <Text style={styles.detail} md normal text={selectedArticle.detail}/>
            </View>
        </Block>
     </ScrollView>
    )
}

export default PlaceDetails

const styles = StyleSheet.create({
    block : {
        paddingHorizontal : 8,
        paddingVertical : 20
    },
    detail :{
        lineHeight : 20,
        marginTop : 20
    }
})
