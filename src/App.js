import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image } from 'react-native';
import { name as appName } from '../app.json';
import { AuthService } from './utils/AuthService.js';
import { Button } from './components/Button';
import withURL from './hoc/withURL.js';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			error: null,
		}

		this.auth = new AuthService();
		this.interval = this.setInterval();
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	setInterval = () => {
		return setInterval(() => {
			console.log(123);
		}, 1000);
	}

	render() {
		return (
			<SafeAreaView style={styles.area}>
				<View style={styles.header}>
					<Image
						style={styles.logo}
						source={require('./images/logo.png')}
					/>
				</View>
				<View style={styles.container}>
					<Button 
						text="Изменить сервер"
						size="small"
						onPress={this.props.clearURL}
					/>
					<Text>123123123</Text>
				</View>
			</SafeAreaView>
		);
	}
}

export default withURL(App);

const styles = StyleSheet.create({
	// area: {
	// 	flex: 1,
	// 	backgroundColor: '#FF5236'
	// },
	logo: {
		width: 120,
		height: 30,
		marginLeft: -10
	},
	header: {
		paddingTop: 12,
		paddingBottom: 12,
		backgroundColor: '#010656',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
    container: {
    	padding: 20,
    	// flex: 1,
    	// justifyContent: 'center',
    	// alignItems: 'center'
    }
});