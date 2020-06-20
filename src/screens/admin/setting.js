import React from 'react'
import { 
    StyleSheet, 
    View, 
    ScrollView ,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'

import Input from '../../shared/input'
import Card from '../../shared/card'
import Block from '../../shared/Block'
import ImagePicker from '../../shared/imagePicker'
import Button from '../../shared/Button'
import Color from '../../constants/colors'
import * as UserAction from '../../store/actions/setting'

const addArticle = (props) => {
  
    const dispatch = useDispatch()

    

    const [photo, setPhoto] = React.useState( '')
    const [userName, setUserName] = React.useState('')

    const onImageTaken = imgPath => {
      setPhoto(imgPath)
    }

    const handleSubmit = () => {
      // dispatch(UserAction.insertUSerDate(userName, photo))
      dispatch(UserAction.fetchUserData())
      props.navigation.navigate("Articles")
        // console.log(photo, userName)
    }
   
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
          label="User Name"
          onChangeText={text => setUserName(text)}
          value={userName}
        />
        <ImagePicker imageTake={onImageTaken}/>
        <View style={styles.btn}>
            <Button accent  title="Save" 
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
