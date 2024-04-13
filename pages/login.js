import { Card, Form, Alert, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { authenticateUser } from '@/lib/authenticate';
import { getFavourites, getHistory } from '@/lib/userData';
import { favouritesAtom, searchHistoryAtom } from '@/store';

export default function Login(props) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState('');
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // Authenticate the user using authenticateUser function
            await authenticateUser(user, password);
            
            // Update the atoms with the fetched data
            await updateAtoms();
            
            // Redirect to "/favourites" after successful login
            router.push('/favourites');
        } catch (err) {
            // Show warning message if authentication fails
            setWarning(err.message);
        }
    }

    async function updateAtoms() {
        // Fetch and update favourites list
        setFavouritesList(await getFavourites());
        // Fetch and update search history
        setSearchHistory(await getHistory());
    }

    return (
        <>
            <Card bg="light">
                <Card.Body>
                    <h2>Login</h2>
                    Enter your login information below:
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
                <Button variant="primary" className="pull-right" type="submit">Login</Button>
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
