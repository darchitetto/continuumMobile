import React from 'react';
import {
	AlertIOS,
	PushNotificationIOS,
	StyleSheet,
	View,
	Button
} from 'react-native';


export default class PushNotifications extends React.Component{
	componentWillMount() {
		PushNotificationIOS.addEventListener('notification', this.onNotification);
	}

	componentWillUnmount() {
		PushNotificationIOS.removeEventListener('notification', this.onNotification());
	}

	sendNotification = () => {
		require('RCTDeviceEventEmitter').emit('remoteNotificationReceived', {
			aps: {
				alert: 'Sample notification',
				badge: '+',
				sound: 'default',
				category: 'REACT_NATIVE'
			},
		});
		PushNotificationIOS.presentLocalNotification({
			'alertBody': 'Build Failure',
		});

		PushNotificationIOS.scheduleLocalNotification({
			'fireDate': Date.now(),
			'alertBody': 'Build Failure',
			'applicationIconBadgeNumber': 2,
		});
		PushNotificationIOS.setApplicationIconBadgeNumber(+1)
	}

	onNotification = () => {
		AlertIOS.alert(
			'Notification Received',
			'Build Failed',
			[{
				text: 'Dismiss',
				onPress: null,
			}]
		);
	}

	render(){
		PushNotificationIOS.requestPermissions();
		return (
			<View style={styles.baseView}>
				<Button title="Set Badge Number" onPress={() => {PushNotificationIOS.setApplicationIconBadgeNumber(42)}}/>
				<Button title="Clear Badge Number" onPress={() => {PushNotificationIOS.setApplicationIconBadgeNumber(0)}}/>
				<Button title="Send fake notification" onPress={() => {this.sendNotification()}}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	baseView: {
		top: 56,
	},
	button: {
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonLabel: {
		color: 'blue',
	},
	text: {
		top: 100,
	},
});