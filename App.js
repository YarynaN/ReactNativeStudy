import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer'
import configureStore from './src/store/configureStore';

const store = configureStore();

//register screens
Navigation.registerComponent("awesome-places.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("awesome-places.SharePlaceScreen", () => SharePlaceScreen, store, Provider);
Navigation.registerComponent("awesome-places.FindPlaceScreen", () => FindPlaceScreen, store, Provider);
Navigation.registerComponent("awesome-places.PlaceDetailScreen", () => PlaceDetailScreen, store, Provider);
Navigation.registerComponent("awesome-places.SideDrawer", () => SideDrawer, store, Provider);

const App = () => Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: "Login"
  }
});

// Start an App
export default App;

App();


