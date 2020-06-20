import React, {useState, useEffect} from 'react';
import { 
    StyleSheet, 
    ActivityIndicator, 
    TouchableWithoutFeedback, 
    Keyboard, 
    View,
    ImageBackground,
    Alert,
    TouchableOpacity
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux'


import Card from '../../shared/card'
import Button from '../../shared/Button'
import Text from '../../shared/text'
import Input from '../../shared/input'
import Color from '../../constants/colors'
import * as AuthAction from '../../store/actions/admin'
import * as UserAction from '../../store/actions/admin'


const Schema = yup.object({
    email: yup.string().email("email invalid").required('email invalid'),
    password: yup.string().required('Password must be more than 6 charachter').min(5)
  });


const Login = ({navigation}) => {

   const [loading, setLoading] = useState(false)

   const [error, setError] = useState('')

   useEffect(() => {
    if(error){
      Alert.alert('An error occured', error, [{text : 'Ok'}])
    }
  },[error])

   const dispatch = useDispatch()

   const handleLogin =  async (email, password) => {
    setLoading(true)
    try{
      await dispatch(AuthAction.Login(email, password))
      navigation.navigate("Profile");
     }catch(err){
      setError(err.message)
      setLoading(false)
     }
   }

    return (
      <ImageBackground 
      source={require('../../../assets/images/bkg.jpg')} 
      style={{width: '100%', height: '100%', flex:1, justifyContent: 'center'}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} behavior="height">
            <Formik
                initialValues={{email: '', password: '' }}
                validationSchema={Schema}
                onSubmit={async (values, actions) => {
                  await handleLogin(values.email, values.password)
                  // actions.resetForm();
                }}
            >
            {props => (
                <Card opacityBkg>
                    <Input
                        email
                        id="email"
                        label="Email"
                        style={styles.input}
                        // defaultValue={props.handleChange('email')}
                        onChangeText={props.handleChange('email')}
                        value={props.values.email}
                        onBlur={props.handleBlur('email')}
                    />
                    <Text style={styles.errorText} text={props.touched.email && props.errors.email}/>
                    
                    <Input
                       id = "password"
                        secure
                        label="Password"
                        style={styles.input}
                        onChangeText={props.handleChange('password')}
                        value={props.values.password}
                        onBlur={props.handleBlur('password')}
                    />
                    <Text style={styles.errorText} text={props.touched.password && props.errors.password}/>
                    
                  <View style={styles.btn}>
                  {
                    loading ? <ActivityIndicator size="small" color={Color.primary}/> :
                    <Button onPress={props.handleSubmit} primary title ='Login' />
                  }
                  </View>
                  <TouchableOpacity activeOpacity={.8} style={styles.alternative}>
                  <Text text="or create account? " secondary md/>
                  <Text text=" Signup " primary md onPress={() => navigation.navigate("SignUp")}/>
                  </TouchableOpacity>
                </Card>
            )}
            </Formik>
            </TouchableWithoutFeedback>
      </ImageBackground>
    )
}


const styles = StyleSheet.create({
    form: {
        margin: 20
      },
      formControl: {
        width: '100%'
      },
      label: {
        fontSize : 14,
        fontWeight : 'bold'
      },
      input: {
        paddingHorizontal: 2,
        paddingVertical: 3,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom : 20
      },
      btn : {
          flexDirection : 'row',
          justifyContent : 'center',
          marginTop : 30
      },
      errorText : {
        color : 'crimson',
        fontStyle:'italic',
        marginBottom:25,
        marginTop : -15,
        fontSize : 12
      },
      alternative : {
        alignItems:'center', 
        marginTop:10,
        flexDirection:'row',
        justifyContent:'center'
      }
})

export default Login
