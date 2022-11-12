import { StyleSheet } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Pressable, Platform } from "react-native";
import { RootTabScreenProps } from "../types";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function TabOneScreen({
	navigation,
}: RootTabScreenProps<"TabOne">) {
	const [expoPushToken, setExpoPushToken] = useState<any>("");
	const [notification, setNotification] = useState<any>(false);
	const notificationListener = useRef<any>();
	const responseListener = useRef<any>();

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token)
		);

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response);
			});

		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current
			);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "space-around",
				backgroundColor: "white",
			}}>
			<Text style={{ color: "black", fontSize: 30, fontWeight: "bold" }}>
				Local Notifications
			</Text>

			<Pressable
				onPress={async () => {
					await schedulePushNotification();
				}}
				style={{
					backgroundColor: "gray",
					padding: 10,
					borderRadius: 5,
				}}>
				<Text>Press to schedule a notification</Text>
			</Pressable>
		</View>
	);
}

async function schedulePushNotification() {
	await Notifications.scheduleNotificationAsync({
		content: {
			title: "You've have been credited with 1000$ 🤑",
			body: "Nigga stop dreaming 😂😂😂😂😂😂",
			data: { data: "goes here" },
		},
		trigger: { seconds: 2 },
	});
}

async function registerForPushNotificationsAsync() {
	let token;

	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		alert("Must use physical device for Push Notifications");
	}

	return token;
}
