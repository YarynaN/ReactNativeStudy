import React, {Component} from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, ActivityIndicator } from "react-native";
import {connect} from "react-redux";

import { addPlace, startAddPlace } from "../../store/actions/index";
import HeadingText from "../../components/UI/HeadingText";
import MainText from "../../components/UI/MainText";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import validate from "../../utility/validation";


class SharePlaceScreen extends Component {
	static navigatorStyle = {
		navBarButtonColor: "green"
	};

	constructor(props){
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}
	componentWillMount(){
		this.reset()
	};

	reset = () => {
		this.setState({
			controls:{
				placeName:{
					value: "",
					valid: false,
					touched: false,
					validationRules: {
						notEmpty: true
					}
				},
				location:{
					value: null,
					valid: false,
					validationRules: {
						inCity: true
					}
				},
				image:{
					value: null,
					valid: false
				}
			}
		});
	};

	componentDidUpdate(){
		if(this.props.placeAdded){
			this.props.navigator.switchToTab({tabIndex: 0});
		};
	};

	onNavigatorEvent = event => {
		if(event.type === "ScreenChangedEvent"){
			if(event.id === "willAppear"){
				this.props.onStartAddPlace();
			}
		}
		if(event.type === "NavBarButtonPress") {
			if(event.id === "sideDrawerToggle") {
				this.props.navigator.toggleDrawer({
					side: "left"
				});
			}
		}
	}

	placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      };
    });
  };

  	locationPickedHandler = location => {
  		this.setState(prevState => {
  			return{
  				controls: {
  					...prevState.controls,
	  				location: {
	  					...prevState.controls.location,
	  					value: location,
	  					valid: validate(location, prevState.controls.location.validationRules)
	  				}
  				}
  			};
  			
  		});
  	};

  	imagePickedHandler = image => {
  		this.setState(prevState => {
  			return{
  				controls: {
  					...prevState.controls,
	  				image: {
	  					value: image,
	  					valid: true
	  				}
  				}
  			};
  			
  		});
  	};

	placeAddedHandler = () => {
		this.props.onAddPlace(this.state.controls.placeName.value, this.state.controls.location.value, this.state.controls.image.value);
		this.reset();
		this.imagePicker.reset();
		this.locationPicker.reset();
	};



	render(){
		let submitButton = (
		<Button
			title="Share the Place!"
			onPress={this.placeAddedHandler}
			disabled={!this.state.controls.placeName.valid || !this.state.controls.location.valid || !this.state.controls.image.valid}/>
		);

		if(this.props.isLoading){
			submitButton = <ActivityIndicator />;
		}

		return(
			<ScrollView>
			<View style={styles.container}>
				<MainText>
					<HeadingText>Share a Place with us</HeadingText>
				</MainText>
				<PickImage onImagePicked={this.imagePickedHandler} ref={ref => (this.imagePicker = ref)}/>
				<PickLocation onLocationPick={this.locationPickedHandler} ref={ref => (this.locationPicker = ref)} />
				<PlaceInput placeData={this.state.controls.placeName} onChangeText = {this.placeNameChangedHandler}/>
				<View style={styles.button}>
		            {submitButton}
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
	}
});

const mapStateToProps = state => {
	return {
		isLoading: state.ui.isLoading,
		placeAdded: state.places.placeAdded
	};
};

const mapDispatchTpProps = dispatch => {
	return {
		onAddPlace: (placeName, location, image) => dispatch (addPlace(placeName, location, image)),
		onStartAddPlace: () => dispatch (startAddPlace())
	};
};


export default connect(mapStateToProps, mapDispatchTpProps)(SharePlaceScreen);