import axios from 'axios';
import { AsyncStorage } from 'react-native';

export class AuthService {
	fetch = (url, method = 'GET', data = null) => {

		let tag = url.split('/');
			tag = tag[tag.length - 1]

		if(url.includes('localhost:5000/api/values/meAct')){
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({[tag]: 65});
				}, 1500)
			})
		}

		if(url.includes('localhost:5000/api/values/mePlan')){
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({[tag]: 71});
				}, 1500)
			})
		}

		if(url.includes('localhost:5000/api/values/prodArt1')){
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({[tag]: 'Zewa'});
				}, 1500)
			})
		}

		if(url.includes('localhost:5000/api/values/prodArt2')){
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({[tag]: 'Tork'});
				}, 1500)
			})
		}

		if(url.includes('localhost:5000/api/values/randomSim')){
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({[tag]: (Math.random() * 100).toFixed()});
				}, 1500)
			})
		}

		if(url.includes('localhost:5000/api/values/stringSim')){
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({[tag]: 'hello'});
				}, 1500)
			})
		}

		if(url.includes('localhost:5000/api/values/velAct')){
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({[tag]: 545});
				}, 1500)
			})
		}

		return new Promise((resolve, reject) => {
			axios.get(url)
				 .then((data) => resolve(data))
				 .catch(() => reject('Произошла ошибка'));
		})
	}

	setStorageItem = async (key, value) => {
	  	try {
	    	await AsyncStorage.setItem(key, value);
	  	} catch (error) {
	    	// Error retrieving data
	    	// console.log(error.message);
	  	}
	}

	getStorageItem = async (key) => {
	  	let item = '';
	  	try {
	    	item = await AsyncStorage.getItem(key) || null;
	  	} catch (error) {
	    	// Error retrieving data
	    	// console.log(error.message);
	  	}

	  	return item;
	}

	clearStorageItem = async (key) => {
	  	try {
	    	await AsyncStorage.removeItem(key);
	  	} catch (error) {
	    	// Error retrieving data
	    	// console.log(error.message);
	  	}
	}

    /*
    * Check HTTP status code
    */
    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}