import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';
import { readToken } from '@/lib/authenticate';

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];

export default function RouteGuard(props) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [favourites, setFavourites] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    // Memoize the updateAtoms function using useCallback
    const updateAtoms = useCallback(async () => {
        try {
            const newFavourites = await getFavourites();
            const newSearchHistory = await getHistory();

            setFavourites(newFavourites);
            setSearchHistory(newSearchHistory);

            console.log("Atoms updated successfully");
        } catch (error) {
            console.error("Error updating atoms:", error);
        }
    }, [setFavourites, setSearchHistory]);

    // Memoize the authCheck function using useCallback
    const authCheck = useCallback((url) => {
        console.log(`Auth check for URL: ${url}`);
        const path = url.split('?')[0];
        const isPublicPath = PUBLIC_PATHS.includes(path);
        
        if (!isPublicPath && !isAuthenticated()) {
            console.log("User not authenticated, redirecting to login");
            setAuthorized(false);
            router.push('/login');
        } else {
            console.log("User authenticated or accessing public path");
            setAuthorized(true);
        }
    }, [router, setAuthorized]);

    // Define the useEffect hook with updated dependencies
    useEffect(() => {
        console.log("RouteGuard mounted");
        
        // Invoke updateAtoms() to populate the atoms
        updateAtoms();

        // Perform an auth check on initial load
        authCheck(router.pathname);

        // Listen for route changes and perform an auth check
        router.events.on('routeChangeComplete', authCheck);

        // Unsubscribe from event listener when component unmounts
        return () => {
            console.log("RouteGuard unmounted");
            router.events.off('routeChangeComplete', authCheck);
        };
    }, [router.pathname, router.events, authCheck, updateAtoms]);

    // Function to check if the user is authenticated
    function isAuthenticated() {
        const token = readToken();
        console.log(`isAuthenticated check: token ${token ? "exists" : "doesn't exist"}`);
        return token !== null;
    }

    // Render children only if the user is authorized
    return <>{authorized && props.children}</>;
}
