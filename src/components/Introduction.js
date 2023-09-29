import React, { useState, useEffect } from 'react';
import {
    Typography,
    Container,
    Button,
    Stack,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

const Introduction = () => {
    const [connectionStatus, setConnectionStatus] = useState(localStorage.getItem('connectionStatus') || 'disconnected');
    const [temperatures, setTemperatures] = useState(JSON.parse(localStorage.getItem('temperatures')) || []);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        localStorage.setItem('connectionStatus', connectionStatus);
    }, [connectionStatus]);

    useEffect(() => {
        localStorage.setItem('temperatures', JSON.stringify(temperatures));
    }, [temperatures]);

    const connectToDevice = () => {
        setConnectionStatus('connecting');
        setTimeout(async () => {
            try {
                const response = await fetch('http://localhost:8000/fetch_temperature');
                if (response.ok) {
                    setConnectionStatus('connected');
                    const data = await response.json();
                    const newTemperature = data.temperature;
                    const currentTime = new Date().toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true,
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    });
                    setTemperatures((prevTemperatures) => [
                        ...prevTemperatures,
                        { temperature: newTemperature, time: currentTime },
                    ]);
                    localStorage.setItem(
                        'temperatures',
                        JSON.stringify([
                            ...JSON.parse(localStorage.getItem('temperatures')),
                            { temperature: newTemperature, time: currentTime },
                        ])
                    );
                    scrollToTable();
                    startFetchingTemperature();
                } else {
                    setConnectionStatus('disconnected');
                }
            } catch (error) {
                setConnectionStatus('disconnected');
                console.error('Error connecting to the device:', error);
            }
        }, 1500);
    };

    const startFetchingTemperature = () => {
        const id = setInterval(async () => {
            try {
                const response = await fetch('http://localhost:8000/fetch_temperature');
                if (response.ok) {
                    const data = await response.json();
                    const newTemperature = data.temperature;
                    const currentTime = new Date().toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true,
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    });
                    setTemperatures((prevTemperatures) => [
                        ...prevTemperatures,
                        { temperature: newTemperature, time: currentTime },
                    ]);
                    localStorage.setItem(
                        'temperatures',
                        JSON.stringify([
                            ...JSON.parse(localStorage.getItem('temperatures')),
                            { temperature: newTemperature, time: currentTime },
                        ])
                    );
                    if (connectionStatus === 'disconnected') {
                        setConnectionStatus('connected');
                    }
                } else {
                    setConnectionStatus('disconnected');
                }
            } catch (error) {
                setConnectionStatus('disconnected');
                console.error('Error fetching temperature:', error);
            }
        }, 60000);
        setIntervalId(id);
    };

    const disconnectToDevice = () => {
        setConnectionStatus('disconnected');
        if (intervalId !== null) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
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
                <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
                    <Button variant="contained" color="success" sx={{ color: 'white', width: '200px', fontWeight: 'bold' }}>
                        Connected<span style={{ marginLeft: '5px' }}>&#10004;</span>
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={disconnectToDevice}
                        sx={{ color: 'white', width: '300px', fontWeight: 'bold' }}
                    >
                        Disconnect to Device
                    </Button>
                </Stack>
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

    const renderTable = () => {
        if (temperatures.length > 0) {
            return (
                <TableContainer
                    sx={{
                        width: '100%',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        backgroundColor: 'rgba(255, 165, 0, 0.9)',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Table>
                        <TableHead
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            }}
                        >
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Temperature
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Time
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {temperatures.map((entry, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        backgroundColor:
                                            entry.temperature >= 300
                                                ? 'red'
                                                : 'inherit',
                                        color:
                                            entry.temperature >= 300
                                                ? 'white'
                                                : 'inherit',
                                    }}
                                >
                                    <TableCell>{entry.temperature}</TableCell>
                                    <TableCell>{entry.time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }
    };

    const scrollToTable = () => {
        const table = document.getElementById('temperature-table');
        if (table) {
            table.scrollIntoView({ behavior: 'smooth' });
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
                <div style={{ width: '60%' }} id="temperature-table">{renderTable()}</div>
            </Stack>
        </Container>
    );
};

export default Introduction;
