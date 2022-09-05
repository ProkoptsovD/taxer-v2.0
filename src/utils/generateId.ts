export const generateId = (length: number = 5, max: number = 9): string => {
    let id = '';

    for(let i = 0; i < length; i += 1) {
        id += getRandomNumber(max);
    }

    return id;
};

function getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max) + 1;
}