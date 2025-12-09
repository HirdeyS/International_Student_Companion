import { useEffect, useState } from "react";

export default function useFetch(asyncCallback, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;

        async function fetchData() {
            try {
                const result = await asyncCallback();
                if (mounted) setData(result);
            } catch (err) {
                if (mounted) setError(err.message);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchData();
        return () => (mounted = false);
    }, deps);

    return { data, loading, error};
}