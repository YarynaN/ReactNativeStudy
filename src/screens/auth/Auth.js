import React, {Component} from 'react';
import{ View, Text, Button, TextInput, StyleSheet } from 'react-native';

import startTabs from "../MainTabs/startMainTabs";
import DefaultInput from "../../components/UI/DefaultInput";
import HeadingText from "../../components/UI/HeadingText";
import MainText from "../../components/UI/MainText";

class AuthScreen extends Component{
	loginHandler = () => {
		startTabs();
	};


	render () {
		return(
			<View style={styles.container}>
			<MainText>
				<HeadingText style={styles.textHeader}>Please Log In</HeadingText>
			</MainText>
				<Button title="Switch to LogIn"/>
				<View style={styles.inputContainer}>
					<DefaultInput placeholder="Your e-mail Adress" style={styles.input} />
					<DefaultInput placeholder="Password" style={styles.input} />
					<DefaultInput placeholder="Confirm Password" style={styles.input}/>
				</View>
				<Button title="Submit" onPress={this.loginHandler}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	inputContainer:{
		width: "80%"
	},
	input:{
		backgroundColor: "#eee",
		borderColor: "#bbb"
	}
});

export default AuthScreen;