const validate = (val, rules, connectedValue) => {
	let isValid = true;
	for (let rule in rules) {
		switch(rule) {
			case 'isEmail':
				isValid = isValid && emailValidator(val);
				break;
			case 'minLength':
				isValid = isValid && minLengthValidator(val, rules[rule]);
				break;
			case 'equalTo':
				isValid = isValid && equalToValidator(val, connectedValue[rule]);
				break;
			case "notEmpty":
        		isValid = isValid && notEmptyValidator(val);
        		break;
        	case "inCity":
        		isValid = isValid && inCityValidator(val);
        		break;
			default:
				isValid = true;
		}
	}
	return isValid;
}

const emailValidator = val => {
	return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val);
}

const minLengthValidator = (val, minLength) => {
	return val.length >= minLength;
}

const equalToValidator = (val, checkValue) => {
	return val === checkValue;
}

const notEmptyValidator = val => {
  return val.trim() !== "";
}

const distance = (lat1, lon1, lat2, lon2, unit) => {	
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	if (dist > 1) {
		dist = 1;
	}
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist;
}

const inCityValidator = val => {
	const checkDis = 20;
	const centreLat = 48.922778;
	const centreLon = 24.710472;	

	let selectedDistance = distance(centreLat, centreLon, val.latitude, val.longitude, "K");
	console.log(val);
	console.log(selectedDistance);
	if (selectedDistance > checkDis){
		alert("Sorry you cannot choose this location! Try again in IF")
		return false;
	} else {
		return true;
	}
}


export default validate;