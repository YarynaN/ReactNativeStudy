import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/auth/Auth';

//register screens
Navigation.registerComponent("awesome-places.AuthScreen", () => AuthScreen);

//start app
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
  root: {
    stack: {
      children: [{
        component: {
          name: 'awesome-places.AuthScreen',
          passProps: {
            text: 'LogIn'
          }
        }
      }],
      options: {
        topBar: {
          title: {
            text: 'LogIn'
          }
        }
      }
    }
  }
});
});