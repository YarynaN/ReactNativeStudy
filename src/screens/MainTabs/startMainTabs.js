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
              children: [
              {
                stack: {
                  children: [{
                    component: {
                      name: 'awesome-places.FindPlaceScreen',
                      passProps: {
                        text: 'Find Place'
                      },
                      options: {
                        topBar: {
                          title: {
                            text: 'Find Place',
                          }
                        }
                      }
                    }
                  }],
                  options: {
                    bottomTab: {
                      icon: sources[0]
                    }
                  }
                }
              },
              {
                stack: {
                  children: [{
                    component: {
                      name: 'awesome-places.SharePlaceScreen',
                      passProps: {
                        text: 'Share Place'
                      },
                      options: {
                        topBar: {
                          title: {
                            text: 'Share Place',
                          }
                        }
                      }                      
                    }
                  }],
                  options: {
                    bottomTab: {
                      icon: sources[1]
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
