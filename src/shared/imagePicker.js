import React, {useState} from 'react';
import { View, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

import Colors from '../constants/colors';
import Button from '../shared/Button'

const ImgPicker = props => {

  const [imagePicked, setImagePicked] = useState('')

  var uuid = Math.ceil(Math.random()*10)

  const uploadImageServer = async (uri, imageName) => {
      try {const response = await fetch(uri);
      const blob = await response.blob();
  
      var ref = firebase.storage().ref().child("images/" + imageName);
      // console.log(blob)
      return ref.put(blob);
      }catch(err){
        console.log(err)
      }
    }

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
        return;
    }
    const image = await ImagePicker.launchCameraAsync({
        allowsEditing : true,
        aspect : [16, 9],
        quality : .5
    });
    if (!image.cancelled) {
      const imageName = "test-image"+uuid
      uploadImageServer(image.uri, imageName)
    }
    // uploadImageServer(image.uri, "test-image")
    setImagePicked(image.uri)
    props.imageTake(image.uri)
    // console.log(image);
    

  };

  const uploadImage =   async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: .5,
    });
    if (!image.cancelled) {
      const imageName = "test-image"+uuid
      uploadImageServer(image.uri, imageName)
    }
    // console.log(image);
    setImagePicked(image.uri)
    props.imageTake(image.uri)
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {
           imagePicked ?<Image style={styles.image} source={{uri : imagePicked}}/> : <Text style={styles.text}>No image picked yet.</Text>
        }
        
        <Image style={styles.image} />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Button
            title="Take Image"
            secondary
            onPress={takeImageHandler}
        />
        <Button
            title="Upload Image"
            primary
            onPress={uploadImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom : 15
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical:30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  text:{
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    position : 'absolute'
  }
});

export default ImgPicker;
