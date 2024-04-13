import { Card, Form, Alert, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '@/lib/authenticate';

export default function Register(props) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [warning, setWarning] = useState('');
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // Register the user using registerUser function
            await registerUser(user, password, password2);
            // Redirect to "/login" after successful registration
            router.push('/login');
        } catch (err) {
            // Show warning message if registration fails
            setWarning(err.message);
        }
    }

    return (
        <>
            <Card bg="light">
                <Card.Body>
                    <h2>Register</h2>
                    Register for an account below:
                </Card.Body>
            </Card>
            <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>User:</Form.Label>
                    <Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control type="password" value={password2} id="password2" name="password2" onChange={e => setPassword2(e.target.value)} />
                </Form.Group>
                <br />
                <Button variant="primary" className="pull-right" type="submit">Register</Button>
            </Form>
            {/* Show error message if any */}
            {warning && (
                <>
                    <br />
                    <Alert variant="danger">{warning}</Alert>
                </>
            )}
        </>
    );
}
