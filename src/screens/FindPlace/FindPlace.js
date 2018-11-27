import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux"

import PlaceList from "../../components/PlaceList/PlaceList"

class FindPlaceScreen extends Component {

	itemSelectedHandler = key =>{
		Navigation.push(this.props.key, {
		  component: {
		    name: 'awesome-places.PlaceDetailScreen',
		    passProps: {
		      text: 'Place Detail'
		    },
		    options: {
		      topBar: {
		        title: {
		          text: 'Place Detail'
		        }
		      }
		    }
		  }
		});
}

const mapStateToProps = state => {
	return {
		places: state.places.places
	};
};

export default connect(mapStateToProps)(FindPlaceScreen);