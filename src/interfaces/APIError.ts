interface APIError extends Error {
    status?: number;
    statusText?: string;
}

export default APIError;