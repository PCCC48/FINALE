import React from "react";
import { useRouter } from "next/router";
import { useAtom } from 'jotai';
import { searchHistoryAtom } from "@/store";
import { removeFromHistory } from "@/lib/userData"; // Importing the function
import { Card, ListGroup, Button } from "react-bootstrap";
import styles from '@/styles/History.module.css';

const History = () => {
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    // Return null if searchHistory is undefined
    if (!searchHistory) return null;

    // Parse the history data into a structured format
    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    // Handle clicking on a history item
    const historyClicked = (e, index) => {
        e.stopPropagation();
        const query = searchHistory[index];
        router.push(`/artwork?${query}`);
    };

    // Handle removing a history item
    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation();
        // Remove the history item asynchronously
        const updatedHistory = await removeFromHistory(searchHistory[index]);
        // Update the search history state with the new history
        setSearchHistory(updatedHistory);
    };

    return (
        <div>
            {parsedHistory.length === 0 ? (
                <Card>
                    <Card.Body>
                        <h4>Nothing Here</h4>
                        Try searching for some artwork.
                    </Card.Body>
                </Card>
            ) : (
                <ListGroup>
                    {parsedHistory.map((historyItem, index) => (
                        <ListGroup.Item
                            key={index}
                            className={styles.historyListItem}
                            onClick={(e) => historyClicked(e, index)}
                        >
                            {Object.keys(historyItem).map((key, i) => (
                                <span key={i}>
                                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                                </span>
                            ))}
                            <Button
                                className="float-end"
                                variant="danger"
                                size="sm"
                                onClick={(e) => removeHistoryClicked(e, index)}
                            >
                                &times;
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default History;

