import React from 'react'
import { StyleSheet, Text, View, ImagePropTypes } from 'react-native'

const Block = props => {
    return (
        <View style={styles.container} {...props}>
            {props.children}
        </View>
    )
}

export default Block

const styles = StyleSheet.create({
   container : {
       flex : 1,
       justifyContent : 'center',
       alignContent : 'center'
   }
})
