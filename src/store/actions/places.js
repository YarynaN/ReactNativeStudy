import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';


export const addPlace = (placeName, location, image) => {
	return dispatch => {
		dispatch(uiStartLoading());
		fetch("https://us-central1-reactnative-cour-1549562975674.cloudfunctions.net/storeImage", {
			method: "POST",
			body: JSON.stringify({
				image: image.base64
			})
		})
		.catch(err => {
			console.log(err);
			dispatch(uiStopLoading());
		})
		.then(res => res.json())
		.then(parsedRes => {
			const placeData = {
				name: placeName,
				location: location,
				image: parsedRes.imageUrl
			};
			return fetch("https://reactnative-cour-1549562975674.firebaseio.com/places.json", {
				method: "POST",
				body: JSON.stringify(placeData)
			})
		})
		.then(res => res.json())
		.then(parsedRes => {
			console.log(parsedRes);
			dispatch(uiStopLoading());
		})
		.catch(err => {
			console.log(err);
			alert("Whoops! Something went wrong, try again!");
			dispatch(uiStopLoading());
		});
	};
};

export const getPlaces = () => {
	return dispatch => {
		fetch("https://reactnative-cour-1549562975674.firebaseio.com/places.json")
		.then(res => res.json())
		.then(parsedRes => {
			const places = [];
			for(let key in parsedRes){
				places.push({
					...parsedRes[key],
					image: {
						uri: parsedRes[key].image
					},
					key: key
				})
			}
			dispatch (setPlaces(places))
		})
		.catch(err => {
			console.log(err);
			alert("Whoops! Something went wrong, try again!")
		});
	};
};

export const setPlaces = places => {
	return {
		type: SET_PLACES,
		places: places
	};
};

export const deletePlace = (key) => {
	return dispatch => {
		dispatch(removePlace(key));
		fetch("https://reactnative-cour-1549562975674.firebaseio.com/places/" + key + ".json", {
			method: "DELETE"
		})
		.then(res => res.json())
		.then(parsedRes => {
			console.log('DONE')
		})
		.catch(err => err => {
			console.log(err);
			alert("Whoops! Something went wrong, try again!")
		});
	};
};

export const removePlace = (key) => {
	return {
		type: REMOVE_PLACE,
		key: key
	};
};