export const logger = (message: string, level: 'info' | 'error' = 'info') => {
    console[level](`[${new Date().toISOString()}]: ${message}`);
};
