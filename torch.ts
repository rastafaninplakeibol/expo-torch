import * as React from 'react'
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';

export default function Torch(props: { enabled: boolean }) {
	const [enabled, setEnabled] = useState(props.enabled)
	const [hasPermission, setHasPermission] = useState(false);
	const type = Camera.Constants.Type.back;

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	useEffect(() => {
		setEnabled(props.enabled)
	}, [props])

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	return (
		!enabled ? <View /> : <Camera style={{ width: 1, height: 1 }} type={type} flashMode={'torch'} />
	);
}
