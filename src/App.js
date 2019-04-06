import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, View, Text, Image, Dimensions } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { name as appName } from '../app.json';
import { AuthService } from './utils/AuthService.js';
import { Button } from './components/Button';
import withURL from './hoc/withURL.js';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			error: null,
			data: {
				meAct: null,
				mePlan: null,
				prodArt1: null,
				prodArt2: null,
				randomSim: null,
				stringSim: null,
				velAct: null,
			},
			isLoading: true,
			timer: 0,
		}

		this.auth = new AuthService();
		this.makeRequests();
		this.interval = this.makeInterval();
	}

	makeInterval = () => {
		return setInterval(() => {
			this.setState({timer: this.state.timer + 1})
		}, 1000)
	}

	componentWillUnmount = () => {
		clearInterval(this.interval)
	}

	secToMin = (sec) => {
		let str;
		let time = {hour: Math.floor(sec / 3600), minutes: (Math.floor(sec / 60) % 60), seconds: (sec % 60)};
		str = (time.hour <= 9 ? ("0" + time.hour) : time.hour) + ":" + (time.minutes <= 9 ? ("0" + time.minutes) : time.minutes) + ":" + (time.seconds <= 9 ? ("0" + time.seconds) : time.seconds);
		return str;
	}

	makeRequests = () => {
		const keys = Object.keys(this.state.data);
		const requests = keys.map(k => this.auth.fetch(`${this.props.url}/api/values/${k}`));

		this.setState({ error: null });

		Promise.all(requests).then(values => {
			let { data } = this.state;

			values.forEach(v => {
				data = {...data, ...v}
			});

			this.setState({ error: null, data: data, isLoading: false });
			this.makeRequests();
		}, reason => {
			this.setState({ error: reason, isLoading: false });
		});
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
				<ScrollView>
					<View style={styles.container}>
						<Button 
							text="Изменить сервер"
							size="small"
							onPress={this.props.clearURL}
							style={{ marginBottom: 0 }}
						/>
						{this.state.error &&
							<Button 
								text="Повторить запрос"
								size="small"
								onPress={this.makeRequests}
								style={{ marginTop: 10 }}
							/>
						}
						{this.state.error &&
							<View style={styles.alert}>
								<Text style={styles.alertText}>{this.state.error}</Text>
							</View>
						}
					</View>
					{this.state.isLoading 
						? <ActivityIndicator />
						: (
							<View>
								<View style={styles.dashboard}>
									<View style={styles.dashboardText}>
										<Text style={styles.dashboardTitle}>
											Линия 1
										</Text>
										<Text style={styles.dashboardUntitle}>
											{this.state.data.prodArt1}
										</Text>
									</View>
									
									<View style={styles.textCircle}>
										<Text style={styles.titleNow}>ME</Text> 
										<Text style={styles.titleMouth}>Месяц</Text> 
									</View>
									
									<View style={styles.graphicArea}>
										<ProgressCircle
											percent={this.state.data.meAct}
											radius={70}
											borderWidth={12}
											color={this.state.data.meAct > 71 ? "#00c18b" : "#f80000"}
											bgColor="#000000"
										><Text style={styles.textGrapch}>{this.state.data.meAct}</Text></ProgressCircle>
										<View style={{width: 20}}></View>
										<ProgressCircle
											percent={this.state.data.mePlan}
											radius={70}
											borderWidth={12}
											color={this.state.data.mePlan > 71 ? "#00c18b" : "#f80000"}
											bgColor="#000000"
										><Text style={styles.textGrapch}>{this.state.data.mePlan}</Text></ProgressCircle>
									</View>

									<Text style={styles.speedText}>Скорость</Text>
									<Text style={{fontSize: 40, color: this.state.data.velAct > 500 ? "#00c18b" : "#f80000"}}>
										{this.state.data.velAct}
									</Text>

									<View style={styles.table}>
										<Text style={styles.tableText}>Ошибки</Text>
										<Text style={styles.tableText}>13</Text>
										<Text style={styles.tableText}>0:42:06</Text>
										<Text style={styles.tableText}>11.25%</Text>
									</View>
								
									<Text style={styles.incTableText}>Последняя остановка</Text>
									<View style={styles.table}>
										<Text style={styles.tableTextLast}>401</Text>
										<Text style={styles.tableTextLast}>5</Text>
										<Text style={styles.tableTextLast}>0:12:22</Text>
									</View>
								</View>
							
								<View style={styles.dashboard}>
									<Text style={styles.stop}>СТОИТ {this.secToMin(this.state.timer)}</Text>
									<View style={styles.dashboardText}>
										<Text style={styles.dashboardTitle}>
											Линия 2
										</Text>
										<Text style={styles.dashboardUntitle}>
											Libero
										</Text>
									</View>
									
									<View style={styles.textCircle}>
										<Text style={styles.titleNow}>ME</Text> 
										<Text style={styles.titleMouth}>Месяц</Text> 
									</View>
									
									<View style={styles.graphicArea}>
										<ProgressCircle
											percent={0}
											radius={70}
											borderWidth={12}
											color={0 > 71 ? "#00c18b" : "#f80000"}
											bgColor="#000000"
										><Text style={styles.textGrapch}>{0}</Text></ProgressCircle>
										<View style={{width: 20}}></View>
										<ProgressCircle
											percent={this.state.data.mePlan + 2}
											radius={70}
											borderWidth={12}
											color={this.state.data.mePlan + 2 > 71 ? "#00c18b" : "#f80000"}
											bgColor="#000000"
										><Text style={styles.textGrapch}>{this.state.data.mePlan + 2}</Text></ProgressCircle>
									</View>

									<Text style={styles.speedText}>Скорость</Text>
									<Text style={{fontSize: 40, color: 0 > 500 ? "#00c18b" : "#f80000"}}>
										{0}
									</Text>

									<View style={styles.table}>
										<Text style={styles.tableText}>Ошибки</Text>
										<Text style={styles.tableText}>29</Text>
										<Text style={styles.tableText}>{this.secToMin(6686 + this.state.timer)}</Text>
										<Text style={styles.tableText}>11.25%</Text>
									</View>
								
									<Text style={styles.incTableText}>Последняя остановка</Text>
									<View style={styles.table}>
										<Text style={styles.tableTextLast}>322</Text>
										<Text style={styles.tableTextLast}>3</Text>
										<Text style={styles.tableTextLast}>{this.secToMin(this.state.timer)}</Text>
									</View>
								</View>
							</View>
						)
					}
				</ScrollView>
			</SafeAreaView>
		);
	}
}

export default withURL(App);

const styles = StyleSheet.create({
	area: {
		backgroundColor: '#ffffff',
		height: Dimensions.get('window').height,
	},
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
	},
	dashboard: {
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 20,
		height: 'auto',
		flex: 1,
		margin: 20,
		// width: Dimensions.get('window').width * 0.9,
		backgroundColor: '#000000',
		borderRadius: 15,
	},
	dashboardText: {
		flexDirection: 'row',
	},
	dashboardTitle: {
		color: '#ffffff',
		marginTop: 20,
		fontSize: 30,
		fontWeight: 'bold',
	},
	dashboardUntitle: {
		color: '#ffffff',
		marginTop: 28,
		paddingLeft: 20,
		fontSize: 20,
		fontWeight: 'bold',
	},
	textCircle: {
		flexDirection: 'row',
		marginTop: 10,
		marginRight: 10,
	},
	titleNow: {
		marginBottom: 10,
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 25,
		paddingLeft: 30,
	},
	titleMouth: {
		marginBottom: 10,
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 25,
		paddingLeft: 95,
	},
	graphicArea: {
		flexDirection: 'row',
		marginBottom: 30,
	},
	textGrapch: {
		fontSize: 30, 
		fontWeight: 'bold', 
		color: "#ffffff",
	},
	speedText: {
		fontSize: 20,
		 color: '#ffffff',
	},
	table: {
		flexDirection: 'row',
		borderColor: "#18171f",
		borderWidth: 4,
		width: Dimensions.get('window').width * 0.8,
		marginBottom: 20,
	},
	tableText: {
		paddingRight: 18,
		paddingLeft: 2,
		color: "#ffffff",
		fontSize: 17,
	},
	incTableText: {
		color: "#ffffff",
		fontSize: 25,
		fontWeight: 'bold',
	},
	tableTextLast: {
		paddingRight: 40,
		paddingLeft: 20,
		color: "#ffffff",
		fontSize: 20,
	},
	alert: {
		backgroundColor: '#e8453c',
		padding: 15,
		borderRadius: 6
	},
	alertText: {
		color: '#ffffff',
		textAlign: 'center',
	},
	stop: {
		marginTop: 10,
		fontSize: 40,
		color: "#f80000",
		fontWeight: 'bold',
	},
});