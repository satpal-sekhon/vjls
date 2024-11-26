import React, { useEffect, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import theme from '../../theme';
import Geolocation from '@react-native-community/geolocation';
import { launchCamera, ImagePickerResponse, CameraOptions } from 'react-native-image-picker';
import axios from 'axios';
import config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PunchButton: React.FC = () => {
    const [isPunchedIn, setIsPunchedIn] = useState(false);
    const [isPunching, setIsPunching] = useState(false);

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location Permission",
                    message: "This app needs access to your location.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
            return true; // Assume permission is granted for simplicity
        }
    };

    const requestCameraPermission = async (): Promise<boolean> => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Camera Permission",
                    message: "This app needs access to your camera.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
            // For iOS, you should ideally check using react-native-permissions,
            // but for simplicity, we'll assume permission is granted.
            return true;
        }
    };

    const handleTogglePunch = async () => {
        const hasLocationPermission = await requestLocationPermission();
        if (!hasLocationPermission) {
            Alert.alert("Permission Denied", "Location permission is required to punch in.");
            return;
        }

        const hasCameraPermission = await requestCameraPermission();
        if (!hasCameraPermission) {
            Alert.alert("Camera Permission Denied", "Camera access is required to take a selfie.");
            return;
        }

        const cameraOptions: CameraOptions = {
            mediaType: 'photo',
            cameraType: 'front',
            saveToPhotos: false,
        };

        const getCurrentDateTime = (): string => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
        
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };

        launchCamera(cameraOptions, async (response: ImagePickerResponse) => {
            if (response.errorCode) {
                Alert.alert("Camera Error", response.errorMessage);
                return;
            } else if (response.assets && response.assets.length > 0) {
                let image = response.assets[0] as any;
                const prefix = isPunchedIn ? 'out' : 'in';
                setIsPunching(true);

                try {
                    const location = await new Promise((resolve, reject) => {
                        Geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
                    }) as any;
    
                    const formData = new FormData();
                    formData.append(`${prefix}_image`, {
                        name: image.fileName,
                        type: image.type,
                        uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
                    });
    
                    formData.append(`${prefix}_lat`, location.coords.latitude.toString());
                    formData.append(`${prefix}_long`, location.coords.longitude.toString());
                    formData.append(`time`, getCurrentDateTime());
                    formData.append(`${prefix}_location`, JSON.stringify(location));
                    
                    const userToken = await AsyncStorage.getItem('@userToken');
                    
                    const response = await axios.post(`${config.apiEndpoint}punch/${prefix}`, formData, {
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                            'Authorization': `Bearer ${userToken}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    let { data } = response.data;
                    if (prefix === 'in') {
                        await AsyncStorage.setItem('@punchInfo', JSON.stringify(data));
                    } else {
                        await AsyncStorage.removeItem('@punchInfo');
                    }
    
                    setIsPunchedIn((prevState) => !prevState);
                    setIsPunching(false);
                } catch (error) {
                    setIsPunching(false);
                    if (axios.isAxiosError(error) && error.response?.status) {
                        console.log('error',error)

                        Alert.alert(error.response.data.message || 'Something went wrong!');
                    } else {
                        Alert.alert("Error", `Failed to punch ${prefix}.`);
                    }
                    //Alert.alert("Error", "Failed to punch out.");
                }
            }
        });
    };

    useEffect(()=>{
        const checkPunchStatus = async () => {
            try {
                const punchInfo = await AsyncStorage.getItem('@punchInfo');
                if (punchInfo) {
                    setIsPunchedIn(true);
                } else {
                    setIsPunchedIn(false);
                }
            } catch (error) {
                console.error('Error retrieving punch status:', error);
                Alert.alert('Error', 'Failed to retrieve punch status.');
            }
        };

        checkPunchStatus();
    }, [])


    return (<View style={styles.buttonContainer}>

        {!isPunchedIn ? (
            <Button
                mode="contained"
                onPress={handleTogglePunch}
                style={[styles.button, { backgroundColor: theme.colors.secondary }]}
                labelStyle={{ color: theme.colors.white }}
                icon={() => <SimpleLineIcons name="energy" size={20} color={theme.colors.white} />}
                disabled={isPunching}
            >
                {isPunching ? `Please wait` : `Punch In`}
            </Button>
        ) : (
            <Button
                mode="outlined"
                onPress={handleTogglePunch}
                style={[styles.button, { backgroundColor: theme.colors.secondary }]}
                labelStyle={{ color: theme.colors.white }}
                icon={() => <SimpleLineIcons name="clock" size={20} color={theme.colors.white} />}
                disabled={isPunching}
            >
                {isPunching ? `Please wait` : `Punch Out`}
            </Button>
        )}
    </View>);
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 8,
    },
    preview: {
        flex: 1,
    },
});

export default PunchButton;
