import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';

//register screens
Navigation.registerComponent("awesome-places.AuthScreen", () => AuthScreen);
Navigation.registerComponent("awesome-places.SharePlaceScreen", () => SharePlaceScreen);
Navigation.registerComponent("awesome-places.FindPlaceScreen", () => FindPlaceScreen);

//start app
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'awesome-places.AuthScreen',
            options: {
              topBar: {
                title: {
                  text: 'Login',
                }
              }
            }
          }
        }]
      }
    }
  });

/*
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [{
          stack: {
            children: [{
              component: {
                name: 'awesome-places.AuthScreen',
                passProps: {
                  text: 'This is tab 1'
                }
              }
            }],
            options: {
              bottomTab: {
                title: 'Tab 1',
                //icon: require('../images/one.png'),
                testID: 'FIRST_TAB_BAR_BUTTON'
              }
            }
          }
        },
        {
          component: {
            name: 'awesome-places.AuthScreen',
            passProps: {
              text: 'This is tab 2'
            },
            options: {
              bottomTab: {
                title: 'Tab 2',
                //icon: require('../images/two.png'),
                testID: 'SECOND_TAB_BAR_BUTTON'
              }
            }
          }
        }]
      }
    }
  });*/

});
