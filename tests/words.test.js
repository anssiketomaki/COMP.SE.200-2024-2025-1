import { describe, it, expect, vi, afterEach } from 'vitest'

// Create the mocks with vi.hoisted BEFORE the vi.mock calls run
const { mockUnicodeWords } = vi.hoisted(() => {
  return {
    mockUnicodeWords: vi.fn(),
  }
})

// Use hoisted variables to mock the modules
vi.mock('../src/.internal/unicodeWords.js', () => ({
  default: mockUnicodeWords,
}))

import words from '../src/words.js'

describe('words', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should split string into words without pattern', () => {
    mockUnicodeWords.mockReturnValue(['fred', 'barney', 'pebbles'])

    const input = 'fred, barney, & pebbles'
    const result = words(input)

    expect(mockUnicodeWords).toHaveBeenCalledWith(input)
    expect(result).toEqual(['fred', 'barney', 'pebbles'])
  })

  it('should return empty array for empty string', () => {
    const result = words('')

    expect(result).toEqual([])
    expect(mockUnicodeWords).not.toHaveBeenCalled()
  })

  it('should use provided pattern to match words', () => {
    const pattern = /[^, ]+/g
    
    const result = words('fred, barney, & pebbles', pattern)
    
    expect(result).toEqual(['fred', 'barney', '&', 'pebbles'])
  })

  it('should call unicodeWords when string has unicode word patterns', () => {
    mockUnicodeWords.mockReturnValue(['camelCase', 'words'])
    
    const result = words('camelCaseWords')
    
    expect(mockUnicodeWords).toHaveBeenCalledWith('camelCaseWords')
    expect(result).toEqual(['camelCase', 'words'])
  })

  it('should handle camelCase with lowercase followed by uppercase', () => {
    mockUnicodeWords.mockReturnValue(['camel', 'Case'])

    const result = words('camelCase')

    expect(mockUnicodeWords).toHaveBeenCalledWith('camelCase')
    expect(result).toEqual(['camel', 'Case'])
  })

  it('should handle consecutive uppercase letters followed by lowercase', () => {
    mockUnicodeWords.mockReturnValue(['HTML', 'Parser'])

    const result = words('HTMLParser')

    expect(mockUnicodeWords).toHaveBeenCalledWith('HTMLParser')
    expect(result).toEqual(['HTML', 'Parser'])
  })

  it('should handle numbers in strings', () => {
    mockUnicodeWords.mockReturnValue(['version', '2', 'Beta'])

    const result = words('version2Beta')

    expect(mockUnicodeWords).toHaveBeenCalledWith('version2Beta')
    expect(result).toEqual(['version', '2', 'Beta'])
  })

  it('should handle strings with special characters', () => {
    mockUnicodeWords.mockReturnValue(['hello', 'world'])

    const result = words('hello-world')

    expect(mockUnicodeWords).toHaveBeenCalledWith('hello-world')
    expect(result).toEqual(['hello', 'world'])
  })

  it('should handle single word', () => {
    const result = words('hello')

    expect(Array.isArray(result)).toBe(true)
    expect(mockUnicodeWords).not.toHaveBeenCalled()
  })

  it('should handle string with only spaces using custom pattern', () => {
    const pattern = /[^ ]+/g
    
    const result = words('   ', pattern)
    
    expect(result).toEqual([])
  })

  it('should handle custom regex pattern with word boundaries', () => {
    const pattern = /\b\w+\b/g
    
    const result = words('hello world test', pattern)
    
    expect(result).toEqual(['hello', 'world', 'test'])
  })

  it('should return empty array when pattern matches nothing', () => {
    const pattern = /[0-9]+/g
    
    const result = words('no numbers here', pattern)
    
    expect(result).toEqual([])
  })

  it('should detect unicode words with numbers and letters mixed', () => {
    mockUnicodeWords.mockReturnValue(['file1', 'Name'])

    const result = words('file1Name')

    expect(mockUnicodeWords).toHaveBeenCalledWith('file1Name')
    expect(result).toEqual(['file1', 'Name'])
  })

  it('should handle ASCII words when no unicode pattern present', () => {
    const result = words('simple ascii words')

    expect(result).toEqual(['simple', 'ascii', 'words'])
    expect(mockUnicodeWords).not.toHaveBeenCalled()
  })

  it('should default to undefined pattern when not provided', () => {
    mockUnicodeWords.mockReturnValue(['word1', 'word2'])

    const result = words('word1word2')

    expect(mockUnicodeWords).toHaveBeenCalledWith('word1word2')
    expect(result).toEqual(['word1', 'word2'])
  })

  it('should handle pattern with alternation', () => {
    const pattern = /[a-z]+|[A-Z]+/g
    
    const result = words('lowUPPERlow', pattern)
    
    expect(result).toContain('low')
    expect(result).toContain('UPPER')
  })

  it('should handle string with multiple consecutive spaces', () => {
    mockUnicodeWords.mockReturnValue(['word1', 'word2'])

    const input = 'word1    word2'
    const result = words(input)

    expect(mockUnicodeWords).toHaveBeenCalledWith(input)
    expect(result).toContain('word1')
    expect(result).toContain('word2')
  })

  it('should match words with digits at start and end', () => {
    mockUnicodeWords.mockReturnValue(['test123', 'abc'])

    const result = words('test123abc')

    expect(mockUnicodeWords).toHaveBeenCalledWith('test123abc')
    expect(result).toEqual(['test123', 'abc'])
  })
})
