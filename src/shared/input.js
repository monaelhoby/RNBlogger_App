import React, { Component } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import * as Icon from "@expo/vector-icons";

import colors from "../constants/colors";
import Text from '../shared/text'

export default class Input extends Component {
  state = {
    toggleSecure: false
  };

  renderToggle() {
    const { secure, rightLabel } = this.props;
    const { toggleSecure } = this.state;

    if (!secure) return null;

    return (
      <Text
        style={styles.toggle}
        onPress={() => this.setState({ toggleSecure: !toggleSecure })}
      >
        {rightLabel ? (
          rightLabel
        ) : (
          <Icon.Ionicons
            size={22}
            color={colors.gray}
            name={!toggleSecure ? "md-eye" : "md-eye-off"}
          />
        )}
      </Text>
    );
  }

  renderRight() {
    const { rightLabel, rightStyle, onRightPress } = this.props;

    if (!rightLabel) return null;

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}
      >
        {rightLabel}
      </Button>
    );
  }

  render() {
    const { email, phone, number, secure, error, style, ...props } = this.props;

    const { toggleSecure } = this.state;
    const isSecure = toggleSecure ? false : secure;

    const inputStyles = [
      styles.input,
      error && { borderColor: colors.accent },
      style
    ];

    const inputType = email
      ? "email-address"
      : number
      ? "numeric"
      : phone
      ? "phone-pad"
      : "default";

    return (
    <View style={styles.formControl}>
        <Text lg bold text={this.props.label}/>
        <TextInput
          style={inputStyles}
          secureTextEntry={isSecure}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={inputType}
          {...props}
        />
        {this.renderToggle()}
        {this.renderRight()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toggle: {
    position: "absolute",
    alignItems: "flex-end",
    right: 0,
    top:20
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
    marginBottom : 20,
    marginTop : 10
  },
});
