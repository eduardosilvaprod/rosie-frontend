import React, { useState } from 'react';
import { settingsApi } from '../services/settings';
import { Box, Button, Typography, Paper } from '@mui/material';

export const SettingsTest: React.FC = () => {
    const [result, setResult] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<string>('');

    const clearState = () => {
        setResult('');
        setError('');
        setLoading('');
    };

    const handleTest = async (
        action: () => Promise<any>,
        endpoint: string
    ) => {
        clearState();
        setLoading(endpoint);
        try {
            const response = await action();
            setResult(`${endpoint} Success:\n${JSON.stringify(response, null, 2)}`);
            console.log(`${endpoint} Response:`, response);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setError(`${endpoint} Error: ${errorMessage}`);
            console.error(`${endpoint} Error:`, err);
        } finally {
            setLoading('');
        }
    };

    const testEndpoints = [
        {
            name: 'Get Company Settings',
            action: () => settingsApi.getCompanySettings()
        },
        {
            name: 'Get Invoice Number Settings',
            action: () => settingsApi.getInvoiceNumberSettings()
        },
        {
            name: 'Get Service Items',
            action: () => settingsApi.getBillingDefaults()
        }
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Settings API Test
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                {testEndpoints.map((endpoint) => (
                    <Button
                        key={endpoint.name}
                        variant="contained"
                        onClick={() => handleTest(endpoint.action, endpoint.name)}
                        disabled={!!loading}
                    >
                        {loading === endpoint.name ? 'Testing...' : `Test ${endpoint.name}`}
                    </Button>
                ))}
            </Box>

            {error && (
                <Paper sx={{ p: 2, mb: 2, bgcolor: '#ffebee' }}>
                    <Typography color="error" whiteSpace="pre-wrap">
                        {error}
                    </Typography>
                </Paper>
            )}

            {result && (
                <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
                    <Typography component="pre" whiteSpace="pre-wrap">
                        {result}
                    </Typography>
                </Paper>
            )}
        </Box>
    );
};