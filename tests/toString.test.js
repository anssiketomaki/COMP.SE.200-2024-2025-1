import { describe, it, expect, vi, afterEach } from 'vitest'

// Create the mocks with vi.hoisted BEFORE the vi.mock calls run
const { mockIsSymbol } = vi.hoisted(() => {
  return {
    mockIsSymbol: vi.fn(),
  }
})

// Use hoisted variables to mock the modules
vi.mock('../src/isSymbol.js', () => ({
  default: mockIsSymbol,
}))

import toString from '../src/toString.js'

describe('toString', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should return the string if value is already a string', () => {
    const result = toString('hello')
    
    expect(result).toBe('hello')
    expect(mockIsSymbol).not.toHaveBeenCalled()
  })

  it('should return empty string for null', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const result = toString(null)
    
    expect(result).toBe('')
    expect(mockIsSymbol).toHaveBeenCalledWith(null)
  })

  it('should return empty string for undefined', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const result = toString(undefined)
    
    expect(result).toBe('')
    expect(mockIsSymbol).toHaveBeenCalledWith(undefined)
  })

  it('should preserve the sign of -0', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const result = toString(-0)
    
    expect(result).toBe('-0')
    expect(mockIsSymbol).toHaveBeenCalledWith(-0)
  })

  it('should convert positive zero to "0"', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const result = toString(0)
    
    expect(result).toBe('0')
    expect(mockIsSymbol).toHaveBeenCalledWith(0)
  })

  it('should convert numbers to strings', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const result = toString(42)
    
    expect(result).toBe('42')
    expect(mockIsSymbol).toHaveBeenCalledWith(42)
  })

  it('should convert arrays to comma-separated strings', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const array = [1, 2, 3]
    const result = toString(array)
    
    expect(result).toBe('1,2,3')
    expect(mockIsSymbol).toHaveBeenCalledTimes(array.length)
  })

  it('should handle arrays with null and undefined elements', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const result = toString([1, null, undefined, 4])
    
    expect(result).toContain('1')
    expect(result).toContain('4')
  })

  it('should recursively convert array elements', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const result = toString([[1, 2], [3, 4]])
    
    expect(result).toContain('1,2')
    expect(result).toContain('3,4')
  })

  it('should handle symbols using symbol toString method', () => {
    const symbol = Symbol('test')
    mockIsSymbol.mockReturnValue(true)
    
    const result = toString(symbol)
    
    expect(result).toBe(symbol.toString())
    expect(mockIsSymbol).toHaveBeenCalledWith(symbol)
  })

  it('should convert booleans to strings', () => {
    mockIsSymbol.mockReturnValue(false)
    
    expect(toString(true)).toBe('true')
    expect(toString(false)).toBe('false')
    expect(mockIsSymbol).toHaveBeenCalledWith(true)
    expect(mockIsSymbol).toHaveBeenCalledWith(false)
  })

  it('should convert objects to "[object Object]"', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const result = toString({ a: 1 })
    
    expect(result).toBe('[object Object]')
    expect(mockIsSymbol).toHaveBeenCalledWith({ a: 1 })
  })

  it('should handle empty arrays', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const result = toString([])
    
    expect(result).toBe('')
    expect(mockIsSymbol).not.toHaveBeenCalled()
  })

  it('should handle arrays with single element', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const result = toString([42])
    
    expect(result).toBe('42')
  })

  it('should convert negative numbers to strings', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const result = toString(-42)
    
    expect(result).toBe('-42')
    expect(mockIsSymbol).toHaveBeenCalledWith(-42)
  })

  it('should handle floating point numbers', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const result = toString(3.14)
    
    expect(result).toBe('3.14')
    expect(mockIsSymbol).toHaveBeenCalledWith(3.14)
  })

  it('should handle Infinity', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const result = toString(Infinity)
    
    expect(result).toBe('Infinity')
    expect(mockIsSymbol).toHaveBeenCalledWith(Infinity)
  })

  it('should handle -Infinity', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const result = toString(-Infinity)
    
    expect(result).toBe('-Infinity')
    expect(mockIsSymbol).toHaveBeenCalledWith(-Infinity)
  })

  it('should handle NaN', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const result = toString(NaN)
    
    expect(result).toBe('NaN')
    expect(mockIsSymbol).toHaveBeenCalledWith(NaN)
  })

  it('should handle nested arrays', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const result = toString([1, [2, [3, 4]]])
    
    expect(result).toContain('1')
    expect(result).toContain('2')
  })

  it('should handle array with string elements', () => {
    mockIsSymbol.mockReturnValue(false)
    
    const result = toString(['a', 'b', 'c'])
    
    expect(result).toBe('a,b,c')
    expect(mockIsSymbol).not.toHaveBeenCalled()
  })
})
