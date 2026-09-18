"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortName = shortName;
const PREPOSITIONS = new Set(['de', 'do', 'dos', 'da', 'das', 'e']);
const removeAccents = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '');
const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
const isPreposition = (word) => PREPOSITIONS.has(word.toLowerCase());
const MAX_POSITIONS = 6;
const toInitial = (word) => `${removeAccents(word).charAt(0).toUpperCase()}.`;
function shortName(fullName, ...positionArgs) {
    if (typeof fullName !== 'string')
        return undefined;
    const positions = positionArgs.flat().slice(0, MAX_POSITIONS);
    const words = fullName
        .normalize('NFC')
        .split(/\s+/)
        .map(word => word.replace(/[^\p{L}]|[ªº]/gu, ''))
        .filter(Boolean);
    if (words.length === 0)
        return undefined;
    const lastIndex = words.length - 1;
    const isName = (word, index) => index === 0 || index === lastIndex || !isPreposition(word);
    const nameCount = words.filter(isName).length;
    let nameNumber = 0;
    return words
        .map((word, index) => {
        if (!isName(word, index))
            return word.toLowerCase();
        nameNumber++;
        const abbreviate = positions.length
            ? positions.includes(nameNumber)
            : nameNumber > 1 && nameNumber < nameCount;
        return abbreviate ? toInitial(word) : capitalize(word);
    })
        .join(' ');
}
