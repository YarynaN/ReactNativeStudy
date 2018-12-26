import React, {Component} from 'react';
import{ View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native';

import startTabs from "../MainTabs/startMainTabs";
import DefaultInput from "../../components/UI/DefaultInput";
import HeadingText from "../../components/UI/HeadingText";
import MainText from "../../components/UI/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground";
import backgroundImage from "../../assets/background.jpg";

class AuthScreen extends Component{
	state = {
		respStyles: {
			pwContainerDirection: "column",
			pwContainerJustifyContent: "flex-start",
			pwWrapperWidth: "100%"
		}
	}
constructor(props) {
	super(props);
	Dimensions.addEventListener("change", (dims) => {
		this.setState({
			respStyles: {
				pwContainerDirection: Dimensions.get('window').height > 500 ? "column" : "row",
				pwContainerJustifyContent: Dimensions.get('window').height > 500 ? "flex-start" : "space-between",
				pwWrapperWidth: Dimensions.get('window').height > 500 ? "100%" : "45%"
			}
		})
	});
}

	loginHandler = () => {
		startTabs();
	};


	render () {
		let headingText = null;

		if(Dimensions.get('window').height > 500){
			headingText = (
				<MainText>
					<HeadingText style={styles.textHeader}>Please Log In</HeadingText>
				</MainText>
			);
		}
		return(
			<ImageBackground source={backgroundImage} style={styles.backgroundImage}>
				<View style={styles.container}>
					{headingText}
					<ButtonWithBackground color="#29aaf4" onPress={() => alert('Nice To meet you!')}>Switch To LogIn</ButtonWithBackground>
					<View style={styles.inputContainer}>
						<DefaultInput placeholder="Your e-mail Adress" style={styles.input} />
						<View style = {{
							flexDirection: this.state.respStyles.pwContainerDirection,
							justifyContent: this.state.respStyles.pwContainerJustifyContent
						}}>
						<View style = {{
							width: this.state.respStyles.pwWrapperWidth
						}}>
							<DefaultInput placeholder="Password" style={styles.input} />
						</View>
						<View style = {{
							width: this.state.respStyles.pwWrapperWidth
						}}>
							<DefaultInput placeholder="Confirm Password" style={styles.input}/>
						</View>
						</View>
					</View>
					<ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>Submit</ButtonWithBackground>
				</View>
			</ImageBackground>
		); 
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	backgroundImage:{
		width:"100%",
		flex:1
	},
	inputContainer:{
		width: "80%"
	},
	input:{
		backgroundColor: "#eee",
		borderColor: "#bbb"
	}
	// passwordContainer:{
	// 	flexDirection: Dimensions.get('window').height > 500 ? "column" : "row",
	// 	justifyContent: "space-between"
	// },
	// passwordWrapper:{
	// 	width: Dimensions.get('window').height > 500 ?"100%" : "45%"
	//}
});

export default AuthScreen;