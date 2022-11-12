import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { Text, View } from "../components/Themed";

export default function TabTwoScreen() {
	// const requestPermission = async () => {
	// 	const authStatus = await messaging().requestPermission();
	// 	const enabled =
	// 		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
	// 		authStatus === messaging.AuthorizationStatus.PROVISIONAL;

	// 	if (enabled) {
	// 		console.log("Authorization status:", authStatus);
	// 	}
	// };

	// useEffect(() => {
	// 	//@ts-ignore
	// 	if (requestPermission()) {
	// 		messaging()
	// 			.getToken()
	// 			.then((token) => {
	// 				console.log(token);
	// 			});
	// 	}
	// }, []);

	return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
