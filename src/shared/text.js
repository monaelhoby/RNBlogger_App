import React from 'react'
import { StyleSheet, Text } from 'react-native'

import colors from '../constants/colors'

const text = props => {

 const customStyle = [
     styles.text,
     props.style,
     props.sm && styles.small,
     props.md && styles.meduim,
     props.lg && styles.large,
     props.bold && styles.bold,
     props.normal && styles.normal,
     props.xlg && styles.xlarge,
     props.white && styles.color,
     props.secondary && styles.secondary,
     props.primary && styles.primary
 ]

    return (
    <Text style={customStyle} {...props}>{props.text}{props.children}</Text>
    )
}

export default text

const styles = StyleSheet.create({
    bold : {
        fontFamily : 'open-sans-bold' 
    },
    normal : {
        fontFamily : 'open-sans',
    },
    small : {
        fontSize : 12
    },
    meduim : {
        fontSize : 14
    },
    large : {
        fontSize : 16
    },
    xlarge : {
        fontSize : 18
    },
    color : {
        color : 'white'
    },
    secondary : {
        color : colors.secondary
    },
    primary : {
        color : colors.primary
    }
})
