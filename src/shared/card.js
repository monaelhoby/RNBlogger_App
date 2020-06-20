import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Card = props => {
    const customStyle = [
        styles.container,
        props.style,
        props.opacityBkg && styles.opacityBkg
    ]
    return (
        <View style={customStyle} {...props}>
            {props.children}
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
   container : {
       paddingVertical : 10,
       paddingHorizontal:10,
       marginVertical:10,
       marginHorizontal : 8,
       marginHorizontal:3,
       shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 5,
        backgroundColor: 'white'
   },
   opacityBkg : {
       backgroundColor : 'rgba(255,255,255,.6)'
   }
})
