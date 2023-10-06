import { useEffect, useState } from 'react';

export const useFetch = ({ url, method = 'GET', headers }) => {
	const [dataUrl, setDataUrl] = useState(url);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [controller, setController] = useState(null);
    const [bodyRequest, setBodyRequest] = useState();

	useEffect(() => {
		const abortController = new AbortController();
		setController(abortController);
		setLoading(true);
		if (method === 'GET') {
			fetch(url, { method, headers, signal: abortController.signal })
				.then((res) => res.json())
				.then((data) => setData(data))
				.catch((error) => {
					if (error.name === 'AbortError') {
						console.log('Request aborted');
					}
				})
				.finally(() => setLoading(false));
		} else if (method === 'POST' || method === 'PUT') {
			fetch(url, {
				method,
				body: JSON.stringify(bodyRequest),
				headers,
				signal: abortController.signal,
			})
				.then((response) => response.json())
				.then((data) => {
					setData(data);
					setError(null);
					setLoading(false);
				})
				.catch((error) => {
					if (error.name !== 'AbortError') {
						setError(error);
						setLoading(false);
					}
				})
				.finally(() => setLoading(false));
		}

		return () => abortController.abort();
	}, [bodyRequest]);

	const handleCancelRequest = () => {
		if (controller) {
			controller.abort();
			setError('Request aborted');
		}
	};

	return {
		data,
		loading,
		error,
		handleCancelRequest,
		setDataUrl,
        setBodyRequest,
	};
};
