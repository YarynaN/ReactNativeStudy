import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';


import PlaceList from "./src/components/PlaceList/PlaceList";
import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail"

export default class App extends Component {

  state = {
    places:[],
    selectedPlace: null
  };


 placeAddedHandler = placeName =>{
   this.setState(prevState => {
      return{
        places: prevState.places.concat(
        {key: Math.random(), 
        name: placeName, 
        image:{uri: "https://www.telegraph.co.uk/content/dam/property/Spark/JLL/Berlin-centre.jpg?imwidth=450"}  })
      };
    });
}

placeDeletedHandler= () =>{
  this.setState(prevState =>{
    return{
      places: prevState.places.filter(place => {
        return place.key !== prevState.selectedPlace.key; 
      }),
      selectedPlace: null
    };
  });
}

modalClosedHandler = () =>{
  this.setState({
    selectedPlace: null
  });
}

placeSeletedHandler = key =>{
  this.setState(prevState => {
    return{
      selectedPlace: prevState.places.find(place => {
        return place.key === key;
      })
    };
  });
}

  render(){
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={this.state.selectedPlace} 
          onItemDeleted={this.placeDeletedHandler} 
          onModalClosed={this.modalClosedHandler}
        />
        <PlaceInput placeAddedHandler={this.placeAddedHandler}/>
        <PlaceList 
          places={this.state.places} 
          onItemSelected={this.placeSeletedHandler}
        />
      </View>
    );

  }
};

const styles = StyleSheet.create({
  container: {
    ///flex: 1,
    padding:25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
