import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";

const startTabs = () => {
	Promise.all([
		Icon.getImageSource("md-map", 30),
		Icon.getImageSource("share-alt", 30)
	]).then(sources => {
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
			          icon: sources[0],
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
			          icon: sources[1],
			          testID: 'SECOND_TAB_BAR_BUTTON'
			        }
			      }
			    }
			  }]
			}
		}
	});
	});
	
}

export default startTabs;
