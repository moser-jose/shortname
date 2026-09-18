import { shortName } from '../index'

describe('shortName', () => {
  test('should format simple first and last name', () => {
    expect(shortName('John Doe')).toBe('John Doe')
  })

  test('should format name with middle name', () => {
    expect(shortName(' John James Doe  ')).toBe('John J. Doe')
  })

  test('should format name with multiple middle names', () => {
    expect(shortName('John James Robert Doe')).toBe('John J. R. Doe')
  })

  test('should handle prepositions correctly', () => {
    expect(shortName('João da Silva')).toBe('João da Silva')
    expect(shortName('Maria do Santos')).toBe('Maria do Santos')
    expect(shortName('Pedro dos Reis')).toBe('Pedro dos Reis')
  })

  test('should handle number in name', () => {
    expect(shortName('Mário Pedro4 António')).toBe('Mário P. António')
    expect(shortName('4MAteus Pereira dos4 Santos')).toBe('Mateus P. dos Santos')
    expect(shortName('Luiz 4de Jesus5 Mateus3 d1e Almeida3')).toBe('Luiz de J. M. de Almeida')
    expect(shortName('Marciano3 3 Âng3elo e3 3 Sim3ão de 3Almeida')).toBe(
      'Marciano A. e S. de Almeida',
    )
    expect(shortName('Julia Ward Howe 1819-1910')).toBe('Julia W. Howe')
    expect(
      shortName('1819 - 435&%$#"!*?=)(/&&%$#"~_:;.;, Julia 56.090º~-."\\,~ Ward Howe 1819-1910'),
    ).toBe('Julia W. Howe')
  })

  test('should handle characters and number in name ', () => {
    expect(
      shortName('1819 - 435&%$#"!*?=)(/&&%$#"~_:;.;, Julia 56.090º~-."\\,~ Ward Howe 1819-1910'),
    ).toBe('Julia W. Howe')
  })

  test('should handle accented characters', () => {
    expect(shortName('José María Rodriguez')).toBe('José M. Rodriguez')
    expect(shortName('António Marta dos Prazeres')).toBe('António M. dos Prazeres')
    expect(shortName('Ângelo de Jesus Mateus de Almeida')).toBe('Ângelo de J. M. de Almeida')
    expect(shortName('Marciâno Ângelo e Simão de Almeida')).toBe('Marciâno A. e S. de Almeida')
    expect(shortName('Moça Ângelo e Simão de Almeida')).toBe('Moça A. e S. de Almeida')
  })

  test('should handle multiple prepositions and middle names', () => {
    expect(shortName('Ana de Maria da Silva Santos')).toBe('Ana de M. da S. Santos')
    expect(shortName(' João  da  4545<. Pedro dos Santos de  João Silveira   ')).toBe(
      'João da P. dos S. de J. Silveira',
    )
    expect(shortName(' de  da João  Pedro dos Santos   Silveira   ')).toBe(
      'De da J. P. dos S. Silveira',
    )
  })

  test('should handle preposition in middle name position', () => {
    expect(shortName('Maria de Silva Pereira')).toBe('Maria de S. Pereira')
    expect(shortName('Carlos da Santos Oliveira')).toBe('Carlos da S. Oliveira')
  })

  test('should handle last preposition in middle names', () => {
    expect(shortName('João Costa de Oliveira Martins')).toBe('João C. de O. Martins')
    expect(shortName('Ana Lima e Silva Ferreira')).toBe('Ana L. e S. Ferreira')
  })

  test('should handle single name', () => {
    expect(shortName('John')).toBe('John')
  })

  test('should handle empty string', () => {
    expect(shortName('')).toBeUndefined()
  })

  test('should handle numbers', () => {
    expect(shortName('343434343434')).toBeUndefined()
  })
  test('should keep accents in a single name', () => {
    expect(shortName('josé')).toBe('José')
  })

  test('should return undefined for non-string input', () => {
    expect(shortName(undefined as unknown as string)).toBeUndefined()
    expect(shortName(null as unknown as string)).toBeUndefined()
    expect(shortName(123 as unknown as string)).toBeUndefined()
  })

  describe('positions', () => {
    test('should abbreviate only the given position', () => {
      expect(shortName('Jorge Pedro André dos Santos', 1)).toBe('J. Pedro André dos Santos')
      expect(shortName('Jorge Pedro André dos Santos', 2)).toBe('Jorge P. André dos Santos')
    })

    test('should abbreviate several positions', () => {
      expect(shortName('Jorge Pedro André dos Santos', 1, 2, 3)).toBe('J. P. A. dos Santos')
      expect(shortName('Jorge Pedro André dos Santos', 1, 4)).toBe('J. Pedro André dos S.')
    })

    test('should never abbreviate nor count prepositions', () => {
      expect(shortName('Pedro de Sousa André', 2)).toBe('Pedro de S. André')
      expect(shortName('Pedro de Sousa André', 1, 2, 3)).toBe('P. de S. A.')
    })

    test('should ignore invalid or out of range positions', () => {
      expect(shortName('John James Doe', 0, -1, 9, 1.5)).toBe('John James Doe')
    })

    test('should abbreviate the last name when asked', () => {
      expect(shortName('John Doe', 2)).toBe('John D.')
    })

    test('should accept an array of positions', () => {
      expect(shortName('Jorge Pedro André dos Santos', [1, 2, 3])).toBe('J. P. A. dos Santos')
      expect(shortName('Jorge Pedro André dos Santos', [1], 4)).toBe('J. Pedro André dos S.')
      expect(shortName('Jorge Pedro André e Santos', [])).toBe('Jorge P. A. e Santos')
    })

    test('should use at most 6 positions', () => {
      const name = 'Ana Bia Caio Davi Fred Gil Hugo Ivo'
      expect(shortName(name, 1, 2, 3, 4, 5, 6, 7)).toBe('A. B. C. D. F. G. Hugo Ivo')
      expect(shortName(name, [1, 2, 3, 4, 5, 6, 7])).toBe('A. B. C. D. F. G. Hugo Ivo')
    })
  })
})
