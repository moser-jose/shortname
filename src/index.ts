const PREPOSITIONS = new Set(['de', 'do', 'dos', 'da', 'das', 'e'])

const removeAccents = (text: string): string => text.normalize('NFD').replace(/[̀-ͯ]/g, '')

const capitalize = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

const isPreposition = (word: string): boolean => PREPOSITIONS.has(word.toLowerCase())

const MAX_POSITIONS = 6

type Positions = Array<number | number[]>

const toInitial = (word: string): string => `${removeAccents(word).charAt(0).toUpperCase()}.`

/**
 * Shortens a full name.
 *
 * Names may be separated by spaces, underscores (`_`) or hyphens (`-`).
 *
 * Without `positions`, the first and last names are kept and every name in
 * between is abbreviated. With `positions`, only the names at those 1-based
 * positions are abbreviated (e.g. `1` is the first name, `2` the second).
 * They can be passed as separate arguments or as an array, up to 6 (extras are ignored).
 * Prepositions (de, do, dos, da, das, e) are never abbreviated nor counted.
 */
export function shortName(fullName: string, ...positionArgs: Positions): string | undefined {
  if (typeof fullName !== 'string') return undefined

  const positions = positionArgs.flat().slice(0, MAX_POSITIONS)

  const words = fullName
    .normalize('NFC')
    .split(/[\s_-]+/)
    .map(word => word.replace(/[^\p{L}]|[ªº]/gu, ''))
    .filter(Boolean)

  if (words.length === 0) return undefined

  const lastIndex = words.length - 1
  // The first and last words are always names, even when they look like a preposition.
  const isName = (word: string, index: number): boolean =>
    index === 0 || index === lastIndex || !isPreposition(word)

  const nameCount = words.filter(isName).length
  let nameNumber = 0

  return words
    .map((word, index) => {
      if (!isName(word, index)) return word.toLowerCase()

      nameNumber++
      const abbreviate = positions.length
        ? positions.includes(nameNumber)
        : nameNumber > 1 && nameNumber < nameCount

      return abbreviate ? toInitial(word) : capitalize(word)
    })
    .join(' ')
}
