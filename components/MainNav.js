import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/router";
import Link from "next/link";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

function MainNav() {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const token = readToken();

    // Make handleSearchSubmit function async
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        const searchField = e.target.search.value;
        const queryString = `title=true&q=${searchField}`;
        router.push(`/artwork?${queryString}`);
        setIsExpanded(false);

        // Update search history using addToHistory and setSearchHistory
        const updatedHistory = await addToHistory(queryString);
        setSearchHistory(updatedHistory);
    };

    const toggleNavbar = () => {
        setIsExpanded(!isExpanded);
    };

    const closeNavbar = () => {
        setIsExpanded(false);
    };

    // Logout function
    const logout = () => {
        setIsExpanded(false); // Collapse the menu
        removeToken(); // Remove the token
        router.push("/login"); // Redirect to the login page
    };

    return (
        <>
            <Navbar expand="lg" className="fixed-top navbar-dark bg-primary" expanded={isExpanded}>
                <Container fluid>
                    <Navbar.Brand>Preet Chakrani</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" onClick={toggleNavbar} />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll onClick={closeNavbar}>
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/"}>Home</Nav.Link>
                            </Link>
                            {token && (
                                <Link href="/search" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link>
                                </Link>
                            )}
                        </Nav>
                        <Form className="d-flex" onSubmit={handleSearchSubmit}>
                            <Form.Control
                                type="search"
                                name="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button type="submit" variant="outline-success">
                                Search
                            </Button>
                        </Form>
                        <Nav>
                            {token ? (
                                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                                    <Link href="/favourites" passHref legacyBehavior>
                                        <NavDropdown.Item active={router.pathname === "/favourites"} onClick={closeNavbar}>
                                            Favourites
                                        </NavDropdown.Item>
                                    </Link>
                                    <Link href="/history" passHref legacyBehavior>
                                        <NavDropdown.Item active={router.pathname === "/history"} onClick={closeNavbar}>
                                            Search History
                                        </NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item onClick={logout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <>
                                    <Link href="/login" passHref legacyBehavior>
                                        <Nav.Link active={router.pathname === "/login"} onClick={closeNavbar}>
                                            Login
                                        </Nav.Link>
                                    </Link>
                                    <Link href="/register" passHref legacyBehavior>
                                        <Nav.Link active={router.pathname === "/register"} onClick={closeNavbar}>
                                            Register
                                        </Nav.Link>
                                    </Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}

export default MainNav;
