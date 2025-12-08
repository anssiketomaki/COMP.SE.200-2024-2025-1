import { describe, it, expect, vi } from 'vitest'
import map from '../src/map.js'

describe('map', () => {
  it('should create an array of values by running each element through iteratee', () => {
    const array = [4, 8]
    const iteratee = (n) => n * n
    
    const result = map(array, iteratee)
    
    expect(result).toEqual([16, 64])
  })

  it('should pass value, index, and array to iteratee', () => {
    const array = [1, 2, 3]
    const iteratee = vi.fn((value, index, arr) => value + index)
    
    map(array, iteratee)
    
    expect(iteratee).toHaveBeenCalledWith(1, 0, array)
    expect(iteratee).toHaveBeenCalledWith(2, 1, array)
    expect(iteratee).toHaveBeenCalledWith(3, 2, array)
    expect(iteratee).toHaveBeenCalledTimes(3)
  })

  it('should handle empty array', () => {
    const array = []
    const iteratee = vi.fn((n) => n * 2)
    
    const result = map(array, iteratee)
    
    expect(result).toEqual([])
    expect(iteratee).not.toHaveBeenCalled()
  })

  it('should handle null array', () => {
    const iteratee = vi.fn((n) => n * 2)
    
    const result = map(null, iteratee)
    
    expect(result).toEqual([])
    expect(iteratee).not.toHaveBeenCalled()
  })

  it('should handle undefined array', () => {
    const iteratee = vi.fn((n) => n * 2)
    
    const result = map(undefined, iteratee)
    
    expect(result).toEqual([])
    expect(iteratee).not.toHaveBeenCalled()
  })

  it('should transform array of strings', () => {
    const array = ['a', 'b', 'c']
    const iteratee = (str) => str.toUpperCase()
    
    const result = map(array, iteratee)
    
    expect(result).toEqual(['A', 'B', 'C'])
  })

  it('should transform array of objects', () => {
    const array = [{ value: 1 }, { value: 2 }, { value: 3 }]
    const iteratee = (obj) => obj.value * 2
    
    const result = map(array, iteratee)
    
    expect(result).toEqual([2, 4, 6])
  })

  it('should preserve array length', () => {
    const array = [1, 2, 3, 4, 5]
    const iteratee = (n) => n + 10
    
    const result = map(array, iteratee)
    
    expect(result.length).toBe(5)
  })

  it('should call iteratee in correct order', () => {
    const array = [1, 2, 3]
    const callOrder = []
    const iteratee = (value) => {
      callOrder.push(value)
      return value
    }
    
    map(array, iteratee)
    
    expect(callOrder).toEqual([1, 2, 3])
  })

  it('should handle iteratee that returns different types', () => {
    const array = [1, 'two', true, null]
    const iteratee = (value) => typeof value
    
    const result = map(array, iteratee)
    
    expect(result).toEqual(['number', 'string', 'boolean', 'object'])
  })

  it('should create a new array, not mutate original', () => {
    const array = [1, 2, 3]
    const iteratee = (n) => n * 2
    
    const result = map(array, iteratee)
    
    expect(array).toEqual([1, 2, 3])
    expect(result).not.toBe(array)
  })

  it('should handle large arrays', () => {
    const array = Array.from({ length: 1000 }, (_, i) => i)
    const iteratee = (n) => n * 2
    
    const result = map(array, iteratee)
    
    expect(result.length).toBe(1000)
    expect(result[0]).toBe(0)
    expect(result[999]).toBe(1998)
  })
})
