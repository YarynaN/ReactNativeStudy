import { AsyncStorage } from 'react-native';

import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import App from '../../../App';

export const tryAuth = (authData, authMode) => {
	return dispatch => {
		dispatch(uiStartLoading());
		let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAZnUQvcYSvNbmWLGgDblsZuwIU8PGeMwU"
		if (authMode === "signup"){
			url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAZnUQvcYSvNbmWLGgDblsZuwIU8PGeMwU"
		} 
		fetch(url,{
			method: "POST",
			body: JSON.stringify({
				email: authData.email,
				password: authData.password,
				returnSecureToken: true
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.catch(err => {
			console.log(err);
			alert('Authentication failed. Please, try again!');
			dispatch(uiStopLoading());
		})
		.then(res => res.json())
		.then(parsedRes => {
			dispatch(uiStopLoading());
			if(!parsedRes.idToken){
				alert('Authentication failed. Please, try again!');
			} else {
				dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
				startMainTabs();
			}
			console.log(parsedRes);
		});
	};
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
	return dispatch => {
		const now = new Date();
		const expiryDate = now.getTime() + expiresIn * 1000;
		dispatch(authSetToken(token, expiryDate));
		AsyncStorage.setItem("rns:auth:token", token);
		AsyncStorage.setItem("rns:auth:expiryDate", expiryDate.toString());
		AsyncStorage.setItem("rns:auth:refreshToken", refreshToken);
	};
};

export const authSetToken = (token, expiryDate) => {
	return {
		type: AUTH_SET_TOKEN,
		token: token,
		expiryDate: expiryDate
	};
};

export const authGetToken = () => {
	return (dispatch, getState) => {
		const promise = new Promise((resolve, reject) => {
			const token = getState().auth.token;
			const expiryDate = getState().auth.expiryDate;
			if(!token || new Date(expiryDate) <= new Date()){
				let fetchedToken;
				AsyncStorage.getItem("rns:auth:token")
				.catch(err => reject())
				.then(tokenFromStorage => {
					fetchedToken = tokenFromStorage;
					if(!tokenFromStorage){
						reject();
						return;
					}
					return AsyncStorage.getItem("rns:auth:expiryDate");
				})
				.then(expiryDate => {
					const parsedExpiryDate = new Date(parseInt(expiryDate));
					const now = new Date;
					if (parsedExpiryDate > now) {
						dispatch(authSetToken(fetchedToken));
						resolve(fetchedToken);
					} else {
						reject();
					}
				})
				.catch(err => reject());
				} else {
				resolve(token);
			}
		});
		return promise
		.catch(err => {
			return AsyncStorage.getItem("rns:auth:refreshToken")
				.then(refreshToken => {
					return fetch("https://securetoken.googleapis.com/v1/token?key=AIzaSyAZnUQvcYSvNbmWLGgDblsZuwIU8PGeMwU",{
						method: "POST",
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						body: "grant_type=refresh_token&refresh_token=" + refreshToken
					});
				})
				.then(res => res.json())
				.then(parsedRes => {
					if(parsedRes.id_token){
						console.log("Refresh token worked!");
						dispatch(authStoreToken(parsedRes.id_token, parsedRes.expires_in, parsedRes.refresh_token));
						return parsedRes.id_token;
					} else {
						dispatch(authClearStorage());
					}
				});
		})
		.then(token => {
			if(!token){
				throw(new ERROR());
			} else {
				return token;
			}
		});
	};
};

export const authAutoSignIn = () => {
	return dispatch => {
		dispatch(authGetToken())
		.then(token => {
			startMainTabs();
		})
		.catch(err => console.log("Failed to catch token!"));
	};
};

export const authClearStorage = () => {
	return dispatch => {
		AsyncStorage.removeItem("rns:auth:token");
		AsyncStorage.removeItem("rns:auth:expiryDate");
		return AsyncStorage.removeItem("rns:auth:refreshToken");
	}
};

export const authLogOut = () => {
	return dispatch => {
		dispatch(authClearStorage())
		.then(() => {
			App();
		});
		dispatch(authRemoveToken());
	};
};

export const authRemoveToken = () => {
	return {
		type: AUTH_REMOVE_TOKEN
	};
};