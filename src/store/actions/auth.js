import { TRY_AUTH } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs'

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
			if(parsedRes.error){
				alert('Authentication failed. Please, try again!');
			} else {
				startMainTabs();
			}
			console.log(parsedRes);
		});
	};
};

