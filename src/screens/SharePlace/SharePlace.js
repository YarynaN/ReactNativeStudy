import React, {Component} from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image} from "react-native";
import {connect} from "react-redux";

import { addPlace } from "../../store/actions/index";
import DefaultInput from "../../components/UI/DefaultInput";
import HeadingText from "../../components/UI/HeadingText";
import MainText from "../../components/UI/MainText";
import imagePlaceHolder from "../../assets/berlin_1.jpg";

class SharePlaceScreen extends Component {
	constructor(props){
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}

	onNavigatorEvent = event => {
		if(event.type === "NavBarButtonPress") {
			if(event.id === "sideDrawerToggle") {
				this.props.navigator.toggleDrawer({
					side: "left"
				});
			}
		}
	}

	placeAddedHandler = placeName => {
		this.props.onAddPlace(placeName);
	}

	render(){
		return(
			<ScrollView>
			<View style={styles.container}>
				<MainText>
					<HeadingText>Share a Place with us</HeadingText>
				</MainText>
				<View style={styles.placeholder}>
					<Image source={imagePlaceHolder} style={styles.previewImage}/>
				</View>
				<View style={styles.button}>
					<Button title="Pick Image"/>
				</View>
				<View style={styles.placeholder}>
					<Text>Map</Text>
				</View>
				<View style={styles.button}>
					<Button title="Locate Me"/>
				</View>
				<DefaultInput placeholder="Place Name"/>
				<View style={styles.button}>
					<Button title="Share The Place"/>
				</View>
			</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		alignItems: "center"
	},
	placeholder:{
		borderWidth: 1,
		borderColor: "black",
		backgroundColor: "#eee",
		width: "80%",
		height: 150
	},
	button:{
		margin: 8
	},
	previewImage:{
		width: "100%",
		height: "100%"
	},
});

const mapDispatchTpProps = dispatch => {
	return {
		onAddPlace:(placeName) => dispatch (addPlace(placeName))
	};
};


export default connect(null, mapDispatchTpProps)(SharePlaceScreen);