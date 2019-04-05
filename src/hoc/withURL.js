import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ActivityIndicator } from 'react-native';
import { AuthService } from './../utils/AuthService.js';
import { Input } from './../components/Input';
import { Button } from './../components/Button';

const withURL = (WrappedComponent) => {
	class withURLHOC extends Component {
		constructor(props){
			super(props);
			this.state = {
				url: null,
				urlValue: ''
			}
			this.auth = new AuthService();
			this.bootstrap();
		}

		bootstrap() {
			this.auth.getStorageItem('url')
				.then(url => this.setState({ url }))
		}

		onURLChange = (urlValue) => {
			this.setState({ urlValue });
		}

		onSubmit = () => {
			if (!this.state.urlValue) {
				return null;
			}

			const url = this.state.urlValue.replace(/(^\w+:|^)\/\//, '').toLowerCase();

			this.auth.setStorageItem('url', url)
				.then(() => {
					this.bootstrap();
				});
		}

		clearURL = () => {
			this.auth.clearStorageItem('url');
			this.bootstrap();
		}

	    render() {
	    	const { url } = this.state;

	    	if (!url) {
	    		return (
	    			<View style={styles.container}>
	    				<Input 
	    					placeholder="Укажите адрес сервера"
	    					value={this.state.url}
	    					onChangeText={this.onURLChange}
	    					clearButtonMode='always'
	    				/>
	    				<Button 
	    					text="ОК"
	    					onPress={this.onSubmit}
	    				/>
	    			</View>
	    		);
	    	}

	      	return (
	        	<WrappedComponent {...this.state} clearURL={this.clearURL} />
	      	);
	    }
	}

	return withURLHOC;
}

export default withURL;

const styles = StyleSheet.create({
    loading: {
    	flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center'
    },
    container: {
    	flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
    	padding: 20
    }
});