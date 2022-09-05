const save = (key: string, value: unknown): void => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    } catch (error) {
        console.error(error);
    }
};

const load = (key: string): undefined | string => {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
        console.error(error);
    }
};
export const storage = {
    save,
    load,
};