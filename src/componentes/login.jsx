import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://codepro.servebeer.com/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/productos');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            padding: '20px',
            backgroundColor: '#f0f0f0',
        },
        card: {
            maxWidth: '400px',
            width: '100%',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9',
        },
        title: {
            textAlign: 'center',
            marginBottom: '20px',
            color: '#000',
        },
        error: {
            color: 'red',
            marginBottom: '10px',
        },
        formGroup: {
            marginBottom: '15px',
            color:'#000000',
            marginright:'12px',
            marginRight: '20px',
        },
        input: {
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor:'#ffffff',
            color:'#000000',
            marginRight: '20px',
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            fontSize: '16px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Login</h2>
                <form onSubmit={handleLogin}>
                    <div style={styles.formGroup}>
                        <label>Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    {error && <p style={styles.error}>{error}</p>}
                    <button type="submit" style={styles.button}>
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
