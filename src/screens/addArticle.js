import React from 'react'
import { 
    StyleSheet, 
    View, 
    ScrollView ,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'

import Input from '../shared/input'
import Card from '../shared/card'
import Block from '../shared/Block'
import Text from '../shared/text'
import Button from '../shared/Button'
import Color from '../constants/colors'
import * as ArticleAction from '../store/actions/articles'

const addArticle = (props) => {

  const articleId = props.route.params.articleId 

  const editArticle = useSelector(state => 
    state.ArticleReducer.userArticles.find(article => article.id === articleId))
    // Date
    const formatDate = date => {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return date.getDate() + "/" + (date.getMonth()+1) +  "/" + date.getFullYear() + "at" + strTime;
    }
    const insertDate = new Date();
    
    const date = formatDate(insertDate);
    const [title, setTitle] = React.useState(editArticle ? editArticle.title : '')
    const [imgLink, setImgLink] = React.useState(editArticle ? editArticle.imgLink : '')
    const [detail, setDetail] = React.useState(editArticle ? editArticle.detail : '')

    const dispatch = useDispatch()

    const handleSubmit = React.useCallback(() => {
        
      if(editArticle){
        dispatch(ArticleAction.updateArticle(articleId,title,imgLink, detail ))
      }else{
        dispatch(ArticleAction.insertArticle(date, title,imgLink, detail ))
      }
      props.navigation.navigate("userArticles")
    },[dispatch,title,imgLink, detail])

    return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior="height"
    keyboardVerticalOffset={20}
    onPress={Keyboard.dismiss}
    >
    <Block>
     <ScrollView>
      <Card>
        <Input     
          label="Title"
          onChangeText={text => setTitle(text)}
          value={title}
        />
        <Input     
          label="Image Link"
          onChangeText={text => setImgLink(text)}
          value={imgLink}
        />
        <Input     
          label="Detail"
          multiline
          numberOfLines={4}
          autoCapitalize = "sentences"
          autoCorrect = {true}
          value={detail}
          onChangeText={text => setDetail(text)}
            />
        <View style={styles.btn}>
            <Button accent  title={editArticle ? "Update Article" :"Add Article"} 
            onPress={handleSubmit}/>
        </View>
      </Card>
    </ScrollView>
    </Block>
    </KeyboardAvoidingView>
    )
}

export default addArticle

const styles = StyleSheet.create({
      btn : {
          flexDirection : 'row',
          justifyContent : 'center',
          marginTop : 30
      }
})
