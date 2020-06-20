import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import Color from '../constants/colors'
import Text from './text'

const Button = props => {

    const customStyle = [
        props.style,
        styles.button,
        props.accent && styles.accent,
        props.secondary && styles.secondary,
        props.primary && styles.primary,
        props.add && styles.add,
        props.variant && styles.variant
    ]
    return (
        <TouchableOpacity style={customStyle} {...props} activeOpacity={.6}>
            <Text white lg bold text={props.title} />
            {props.children}
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
  button : {
      marginTop : 5,
      marginHorizontal : '5%',
      alignItems:'center',
      paddingVertical : 10,
      paddingHorizontal : 15,
      borderRadius : 5,
      shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
  },
  accent:{
    backgroundColor : Color.accent,
  },
  secondary:{
    backgroundColor : Color.secondary,
  },
  primary : {
    backgroundColor : Color.primary,
  },
  variant:{
    marginHorizontal : '2%',
    paddingVertical : 5,
    paddingHorizontal : 10,
  },
  add : {
    width : '70%',
  }
})
