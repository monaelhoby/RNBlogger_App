import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'

import Card from '../card'
import Color from '../../constants/colors'


const articleItem = props => {

    const brief = props.detail.slice(0,70).concat(" ....")



    return (
      <TouchableOpacity activeOpacity={.75} {...props}>
        <Card>
            {/* <Image source={{uri : "'"+props.userImg+"'"}} style={{ height: 50, width : 50}}/> */}
            <Image source={{uri : props.imageurl}} style={{ height: 150 }}/>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.brief}>{brief}</Text> 
            <View style={{flexDirection : 'row', marginTop : 20}}>
                <Text style={{color : Color.secondary}}>Created at : </Text> 
                <Text style={styles.date}>{props.date}</Text>
            </View>
             {props.children}
        </Card>
        </TouchableOpacity>  
    )
}

export default articleItem

const styles = StyleSheet.create({
    title : {
        marginVertical:8,
        marginBottom : 10,
        fontWeight : 'bold',
        fontSize : 16
    },
    date : {
        fontSize : 12,
        fontStyle : 'italic',
    },
    brief : {
        fontSize : 14,
        marginBottom : 5,
        paddingRight : 10,
        lineHeight : 22
    }
})
