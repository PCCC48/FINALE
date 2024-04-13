import { useAtom } from "jotai";
import { useEffect } from "react";
import { favouritesAtom } from "@/store";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

const Favourites = () => {
    // Use the useAtom hook to get the favouritesList from the favouritesAtom
    const [favouritesList] = useAtom(favouritesAtom);

    // Log the favouritesList for debugging purposes
    useEffect(() => {
        console.log(favouritesList);
    }, [favouritesList]);

    // Render the component
    return (
        <div>
            {favouritesList === undefined ? null : (
                favouritesList.length === 0 ? (
                    <Card>
                        <Card.Body>
                            <h4>Nothing Here</h4>
                            Try adding some new artwork to the list.
                        </Card.Body>
                    </Card>
                ) : (
                    <Row className="gy-4">
                        {favouritesList.map((objectID) => (
                            <Col lg={3} key={objectID}>
                                <ArtworkCard objectID={objectID} />
                            </Col>
                        ))}
                    </Row>
                )
            )}
        </div>
    );
};

export default Favourites;
