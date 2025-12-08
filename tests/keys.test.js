import { describe, it, expect, vi, beforeEach } from 'vitest'

// Create the mocks with vi.hoisted BEFORE the vi.mock calls run
const { mockIsArrayLike, mockArrayLikeKeys } = vi.hoisted(() => {
  return {
    mockIsArrayLike: vi.fn(),
    mockArrayLikeKeys: vi.fn(),
  }
})

// Use hoisted variables to mock the modules
vi.mock('../src/isArrayLike.js', () => ({
  default: mockIsArrayLike,
}))

vi.mock('../src/.internal/arrayLikeKeys.js', () => ({
  default: mockArrayLikeKeys,
}))

import keys from '../src/keys.js'

describe('keys', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should return an array of own enumerable property names for objects', () => {
    const obj = { a: 1, b: 2, c: 3 }
    mockIsArrayLike.mockReturnValue(false)
    
    const result = keys(obj)
    
    expect(result).toEqual(['a', 'b', 'c'])
    expect(mockIsArrayLike).toHaveBeenCalledWith(obj)
    expect(mockIsArrayLike).toHaveBeenCalledTimes(1)
    expect(mockArrayLikeKeys).not.toHaveBeenCalled()
  })

  it('should call arrayLikeKeys for array-like objects', () => {
    const arrayLike = { 0: 'a', 1: 'b', length: 2 }
    mockIsArrayLike.mockReturnValue(true)
    mockArrayLikeKeys.mockReturnValue(['0', '1'])
    
    const result = keys(arrayLike)
    
    expect(result).toEqual(['0', '1'])
    expect(mockArrayLikeKeys).toHaveBeenCalledWith(arrayLike)
    expect(mockArrayLikeKeys).toHaveBeenCalledTimes(1)
    expect(mockIsArrayLike).toHaveBeenCalledTimes(1)
  })

  it('should handle empty objects', () => {
    const obj = {}
    mockIsArrayLike.mockReturnValue(false)
    
    const result = keys(obj)
    
    expect(result).toEqual([])
    expect(mockIsArrayLike).toHaveBeenCalledTimes(1)
    expect(mockArrayLikeKeys).not.toHaveBeenCalled()
  })

  it('should coerce non-object values to objects', () => {
    const str = 'hi'
    mockIsArrayLike.mockReturnValue(false)
    
    const result = keys(str)
    
    expect(result).toEqual(['0', '1'])
    expect(mockIsArrayLike).toHaveBeenCalledWith(str)
    expect(mockIsArrayLike).toHaveBeenCalledTimes(1)
    expect(mockArrayLikeKeys).not.toHaveBeenCalled()
  })

  it('should handle null values by coercing to empty object', () => {
    mockIsArrayLike.mockReturnValue(false)
    
    const result = keys(null)
    
    expect(result).toEqual([])
    expect(mockIsArrayLike).toHaveBeenCalledTimes(1)
    expect(mockArrayLikeKeys).not.toHaveBeenCalled()
  })

  it('should handle undefined values by coercing to empty object', () => {
    mockIsArrayLike.mockReturnValue(false)
    
    const result = keys(undefined)
    
    expect(result).toEqual([])
    expect(mockIsArrayLike).toHaveBeenCalledTimes(1)
    expect(mockArrayLikeKeys).not.toHaveBeenCalled()
  })

  it('should not include inherited properties', () => {
    function Foo() {
      this.a = 1
      this.b = 2
    }
    Foo.prototype.c = 3
    
    const obj = new Foo()
    mockIsArrayLike.mockReturnValue(false)
    
    const result = keys(obj)
    
    expect(result).toContain('a')
    expect(result).toContain('b')
    expect(result).not.toContain('c')
    expect(mockIsArrayLike).toHaveBeenCalledTimes(1)
    expect(mockArrayLikeKeys).not.toHaveBeenCalled()
  })

  it('should handle arrays', () => {
    const arr = [1, 2, 3]
    mockIsArrayLike.mockReturnValue(true)
    mockArrayLikeKeys.mockReturnValue(['0', '1', '2'])
    
    const result = keys(arr)
    
    expect(result).toEqual(['0', '1', '2'])
    expect(mockIsArrayLike).toHaveBeenCalledTimes(1)
    expect(mockArrayLikeKeys).toHaveBeenCalledTimes(1)
  })

  it('should handle numbers by coercing to object', () => {
    mockIsArrayLike.mockReturnValue(false)
    
    const result = keys(123)
    
    expect(result).toEqual([])
    expect(mockIsArrayLike).toHaveBeenCalledTimes(1)
    expect(mockArrayLikeKeys).not.toHaveBeenCalled()
  })
})
