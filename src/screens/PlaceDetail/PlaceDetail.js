import React, { Component } from "react";
import { View, Image, Text, Button, StyleSheet, TouchableOpacity, Platform, Dimensions } from "react-native";
import { connect } from "react-redux";

import Icon from "react-native-vector-icons/Ionicons";
import { deletePlace } from "../../store/actions/index";


class PlaceDetail extends Component {
	state = {
		viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape"
	};

	constructor(props) {
	super(props);
	Dimensions.addEventListener("change", this.updateStyles);
	};

	updateStyles = (dims) => {
	this.setState({
		viewMode: dims.window.height > 500 ? "portrait" : "landscape"
	});
}

	placeDeletedHandler = () => {
		this.props.onDeletePlace(this.props.selectedPlace.key);
		this.props.navigator.pop();
	}

	render(){
		return(
			<View style = {this.state.viewMode === "portrait" ? styles.portraitContainer : styles.landscapeContainer}>
				<View style = {this.state.viewMode === "portrait" ? styles.portraitContainer : styles.landscapeImageContainer}>
					<Image source={this.props.selectedPlace.image} style = {styles.placeImage}/>
					<Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
				</View>
				<View style = {this.state.viewMode === "portrait" ? styles.deleteButton : styles.landscapeIconContainer}>
					<TouchableOpacity onPress={this.placeDeletedHandler}>
						<View>
							<Icon size={30} name={Platform.OS === 'android' ? "md-trash" : "ios-trash"} color="red"/>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
} 

const styles = StyleSheet.create({
	landscapeContainer:{
		margin: 2,
		flexDirection: "row",
		justifyContent: "flex-start"
	},
	portraitContainer:{
		margin: 22,
	},
	placeImage:{
		height: 200,
		width: "100%"
	},
	placeName:{
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 28
	},
	landscapeImageContainer:{
		width: "70%"
	},
	landscapeIconContainer:{
		alignItems: "center",
  		justifyContent: "center",
  		marginLeft: 24
	},
	deleteButton:{
		alignItems: "center"
	}
});

const mapDispatchToProps = dispatch => {
	return {
		onDeletePlace: key => dispatch(deletePlace(key))
	};
};

export default connect(null, mapDispatchToProps)(PlaceDetail);