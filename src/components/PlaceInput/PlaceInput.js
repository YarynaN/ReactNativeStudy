import React, {Component} from "react";
import {
  View, 
  StyleSheet, 
  TextInput,
  Button,
  Text
} from "react-native";

export default class PlaceInput extends Component {
  state = {
    placeName : ""
  }

  placeNameChangedHandler = (val) => {
    this.setState({
      placeName: val
    })
  }

  placeSubmitHandler = () => {
    if(this.state.placeName.trim() === ""){
      return;
    } 
    this.props.onPlaceAdded(this.state.placeName)
  }

  render (){
    return (
      <View style={styles.inputContainer}>
      <TextInput 
          placeholder = "An awesome place"
          value = {this.state.placeName}
          onChangeText = {this.placeNameChangedHandler}
          style={styles.placeInput}
      />
      <Button 
        title="Add"
        style={styles.placeButton}
        onPress = {this.placeSubmitHandler}
      />
      </View>
    )
  }
}



const styles = StyleSheet.create({
 inputContainer: {
    ///flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"

  }
});
