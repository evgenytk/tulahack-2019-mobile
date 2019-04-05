// import axios from 'axios';
import { AsyncStorage } from 'react-native';

export class AuthService {
	fetch = (url, method, data = null) => {
		// REMOVE THAT!!!!
		if(url.includes('api/test')){
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([1,2,3]);
				}, 1500)
			})
		}

		return new Promise((resolve, reject) => {
			AsyncStorage.getItem('id_token').then((token) => {
				fetch(`http://tester1.evgenytk.ru/${url}`, {
			    	method: method.toUpperCase(),
	      			headers: {
	      	            'Accept': 'application/json',
	      	            'Content-Type': 'application/json',
	      	            'Authorization': 'Bearer ' + token
					},
					body: data ? JSON.stringify(data) : null
			    })
				.then(response => !response.ok 
					? reject(JSON.parse(response.text())) 
					: resolve(JSON.parse(response.text()))
				)
			    .catch(error => reject(error))
			    .done();
			})
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