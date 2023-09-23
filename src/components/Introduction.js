// src/components/Introduction.js
import React, { useState } from 'react';
import { Typography, Container, Button, Stack, CircularProgress } from '@mui/material';

const Introduction = () => {
    const [connectionStatus, setConnectionStatus] = useState('disconnected');

    const connectToDevice = async () => {
        // Simulate an API call (replace with your actual API call)
        setConnectionStatus('connecting');

        // Simulate a delay for the API call (remove in production)
        setTimeout(() => {
            // Replace with your logic to check if the connection was successful
            const connectionSuccessful = true;

            if (connectionSuccessful) {
                setConnectionStatus('connected');
            } else {
                // Handle connection failure
                // You can display an error message or retry button here
                setConnectionStatus('disconnected');
            }
        }, 2000);
    };

    const renderButton = () => {
        if (connectionStatus === 'connecting') {
            return (
                <Button variant="contained" color="primary" disabled sx={{ color: 'white', width: '200px', fontWeight: 'bold' }}>
                    <CircularProgress size={24} sx={{ color: 'white', marginRight: '8px' }} />
                    Connecting...
                </Button>
            );
        } else if (connectionStatus === 'connected') {
            return (
                <Button variant="contained" color="success" disabled sx={{ color: 'white', width: '200px', fontWeight: 'bold' }}>
                    Connected<span style={{ marginLeft: '5px' }}>&#10004;</span>
                </Button>
            );
        } else {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={connectToDevice}
                    sx={{ color: 'white', width: '200px', fontWeight: 'bold' }}
                >
                    Connect to Device
                </Button>
            );
        }
    };

    return (
        <Container maxWidth="md">
            <Stack spacing={5}
                sx={{
                    flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '48px 32px', backgroundColor: '#FFA500'
                }}
            >
                <Typography variant="h4" sx={{ color: 'white' }}>
                    Arduino Gas Sensor Introduction
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                    Arduino gas sensors are electronic devices used to detect and measure the presence of various gases in the surrounding environment. They are commonly used in a wide range of applications, including air quality monitoring, industrial safety, and environmental monitoring.
                    These sensors work by detecting changes in electrical conductivity or other properties when they come into contact with specific gases. Depending on the type of gas sensor, they can detect gases such as carbon dioxide (CO2), carbon monoxide (CO), methane (CH4), and more.
                    Arduino gas sensors are popular among hobbyists and professionals alike because they are relatively easy to interface with Arduino microcontrollers and other development boards. This makes them a valuable tool for creating projects that require gas detection and monitoring.
                    With the data collected from gas sensors, you can build applications that trigger alarms, display real-time gas concentration, log historical data, or take corrective actions to ensure safety and environmental quality.
                    To get started with Arduino gas sensors, you'll need a compatible sensor module, an Arduino board, and some programming skills to read and interpret the sensor data. The possibilities are vast, from indoor air quality monitoring to gas leak detection in industrial settings.
                    Explore the potential of Arduino gas sensors in your projects, and use the button below to learn more or get started!
                </Typography>
                <img
                    src="images/arduino-architecture.jpeg"
                    alt="Gas Sensor"
                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
                {renderButton()}
            </Stack>
        </Container>
    );
};

export default Introduction;
