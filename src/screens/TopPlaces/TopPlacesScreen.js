import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


class TopPlacesScreen extends Component {
	render(){
		return(
			<View>
				<TouchableOpacity onPress={alert('Yara, youre cool!')}>
					<View >
						<Icon name={Platform.OS === 'android' ? "md-star" : "ios-star"} size={30} color="#aaa" style={styles.drawerItemIcon}/>
						<Text>Top Places</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}