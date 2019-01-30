import React, {Component} from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";

import DefaultInput from "../UI/DefaultInput";

const placeInput = props => (
      <DefaultInput 
      placeholder="Place Name" 
      value={props.placeData.value} 
      valid={props.placeData.valid}
      onChangeText={props.onChangeText}
      />
    );

export default placeInput;
