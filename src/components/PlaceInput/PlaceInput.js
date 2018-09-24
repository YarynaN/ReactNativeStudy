import React from "react";
import {
  View, 
  StyleSheet, 
  TextInput,
  Button
} from "react-native";




const placeInput = (props) =>(
	<View style={styles.inputContainer}>
        <TextInput 
          placeholder = "An awesome place"
          value = {props.placeName} 
          onChangeText={props.placeNameChangedHandler}
          style={styles.placeInput}
      />
      <Button 
        title="Add"
        style={styles.placeButton}
        onPress = {props.placeSubmitHandler}
      />
 	</View>
);



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

export default placeInput;