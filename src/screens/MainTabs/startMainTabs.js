import { Navigation } from "react-native-navigation";
//import placeImage from ".../src/assets/berlin_1.jpg";


const startTabs = () => {
	Navigation.setRoot({
		root: {
			bottomTabs: {
			  children: [{
			    stack: {
			      children: [{
			        component: {
			          name: 'awesome-places.FindPlaceScreen',
			          passProps: {
			            text: 'Find Place'
			          }
			        }
			      }],
			      options: {
			        bottomTab: {
			          title: 'Find Place',
			          //icon: require("../assets/berlin_1.jpg"),
			          testID: 'FIRST_TAB_BAR_BUTTON'
			        }
			      }
			    }
			  },
			  {
			    component: {
			      name: 'awesome-places.SharePlaceScreen',
			      passProps: {
			        text: 'Share Place'
			      },
			      options: {
			        bottomTab: {
			          title: 'Share Place',
			          //icon: require("../assets/berlin_1.jpg"),
			          testID: 'SECOND_TAB_BAR_BUTTON'
			        }
			      }
			    }
			  }]
			}
		}
	});
}

export default startTabs;
