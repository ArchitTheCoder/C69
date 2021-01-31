import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'

export default class BookTransaction extends React.Component {
    constructor() {
        super()
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
        }
    }

    getCameraPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermissions: status === 'granted', buttonState: 'clicked', scanned: false })
    }

    handleBarCodeScanned = async ({ type, data }) => {
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
        })
    }

    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState

        if (buttonState === 'clicked' && hasCameraPermissions) {
            return (
                <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                ></BarCodeScanner>
            )
        } else if (buttonState === 'normal') {
            return (
                <View style={styles.container}>
                    <Text style={styles.displayText}>{
                        hasCameraPermissions === true ? this.state.scannedData : 'Requesting Camera Permissions'
                    }</Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.scanButton}
                            onPress={this.getCameraPermissions}>
                            <Text style={styles.buttonText}>Scan QR Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scanButton: {
        backgroundColor: 'orange',
        padding: 10,
        margin: 10,
    },
    buttonText: {
        fontSize: 20,
        color: 'black'
    },
})