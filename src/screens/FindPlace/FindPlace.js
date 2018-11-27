import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux"

import PlaceList from "../../components/PlaceList/PlaceList"

class FindPlaceScreen extends Component {

	itemSelectedHandler = key =>{
		Navigation.push(this.props.componentId, {
			  component: {
			    name: 'example.PushedScreen',
			    passProps: {
			      text: 'Pushed screen'
			    },
			    options: {
			      topBar: {
			        title: {
			          text: 'Pushed screen title'
			        }
			      }
			    }
			  }
		});
	}

		render(){
			return(
				<View>
					<PlaceList places={this.props.places} onItemSelected/>
				</View>
			);
		}
}

const mapStateToProps = state => {
	return {
		places: state.places.places
	};
};

export default connect(mapStateToProps)(FindPlaceScreen);