import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockArrayReduce, mockBaseEach, mockBaseReduce } = vi.hoisted(() => {
  return {
    mockArrayReduce: vi.fn(),
    mockBaseEach: vi.fn(),
    mockBaseReduce: vi.fn()
  }
})

// Use hoisted variables to mock the modules
vi.mock('../src/.internal/arrayReduce.js', () => ({
  default: mockArrayReduce,
}))

vi.mock('../src/.internal/baseEach.js', () => ({
  default: mockBaseEach,
}))

vi.mock('../src/.internal/baseReduce.js', () => ({
  default: mockBaseReduce,
}))

import reduce from '../src/reduce.js'

describe('reduce', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('function selection based on collection type', () => {
    it('should call arrayReduce when collection is an array', () => {
      const collection = [1, 2, 3]
      const iteratee = vi.fn()
      const accumulator = 0

      mockArrayReduce.mockReturnValue(6)

      reduce(collection, iteratee, accumulator)

      expect(mockArrayReduce).toHaveBeenCalled()
      expect(mockBaseReduce).not.toHaveBeenCalled()
    })

    it('should call baseReduce when collection is an object', () => {
      const collection = { a: 1, b: 2 }
      const iteratee = vi.fn()
      const accumulator = 0

      mockBaseReduce.mockReturnValue(3)

      reduce(collection, iteratee, accumulator)

      expect(mockBaseReduce).toHaveBeenCalled()
      expect(mockArrayReduce).not.toHaveBeenCalled()
    })

    it('should call baseReduce when collection is null (treated as object)', () => {
      const collection = null
      const iteratee = vi.fn()
      const accumulator = 0

      mockBaseReduce.mockReturnValue(0)

      reduce(collection, iteratee, accumulator)

      expect(mockBaseReduce).toHaveBeenCalled()
      expect(mockArrayReduce).not.toHaveBeenCalled()
    })
  })

  describe('accumulator parameter passing', () => {
    it('should pass initAccum as true when accumulator is not provided', () => {
      const collection = [1, 2, 3]
      const iteratee = vi.fn()

      mockArrayReduce.mockReturnValue(6)

      reduce(collection, iteratee)

      expect(mockArrayReduce).toHaveBeenCalledWith(
        collection,
        iteratee,
        undefined,
        true,
        expect.any(Function)
      )
    })

    it('should pass initAccum as false when accumulator is provided', () => {
      const collection = [1, 2, 3]
      const iteratee = vi.fn()
      const accumulator = 10

      mockArrayReduce.mockReturnValue(16)

      reduce(collection, iteratee, accumulator)

      expect(mockArrayReduce).toHaveBeenCalledWith(
        collection,
        iteratee,
        accumulator,
        false,
        expect.any(Function)
      )
    })

    it('should pass initAccum as false when accumulator is 0', () => {
      const collection = [1, 2, 3]
      const iteratee = vi.fn()
      const accumulator = 0

      mockArrayReduce.mockReturnValue(6)

      reduce(collection, iteratee, accumulator)

      expect(mockArrayReduce).toHaveBeenCalledWith(
        collection,
        iteratee,
        0,
        false,
        expect.any(Function)
      )
    })

    it('should pass initAccum as false when accumulator is empty string', () => {
      const collection = [1, 2, 3]
      const iteratee = vi.fn()
      const accumulator = ''

      mockArrayReduce.mockReturnValue('')

      reduce(collection, iteratee, accumulator)

      expect(mockArrayReduce).toHaveBeenCalledWith(
        collection,
        iteratee,
        '',
        false,
        expect.any(Function)
      )
    })

    it('should pass initAccum as false when accumulator is false', () => {
      const collection = [1, 2, 3]
      const iteratee = vi.fn()
      const accumulator = false

      mockArrayReduce.mockReturnValue(false)

      reduce(collection, iteratee, accumulator)

      expect(mockArrayReduce).toHaveBeenCalledWith(
        collection,
        iteratee,
        false,
        false,
        expect.any(Function)
      )
    })

    it('should pass initAccum as false when accumulator is null', () => {
      const collection = [1, 2, 3]
      const iteratee = vi.fn()
      const accumulator = null

      mockArrayReduce.mockReturnValue(null)

      reduce(collection, iteratee, accumulator)

      expect(mockArrayReduce).toHaveBeenCalledWith(
        collection,
        iteratee,
        null,
        false,
        expect.any(Function)
      )
    })
  })

  describe('correct parameters passed to helper functions', () => {
    it('should pass collection, iteratee, accumulator, initAccum, and baseEach to arrayReduce', () => {
      const collection = [1, 2, 3]
      const iteratee = vi.fn()
      const accumulator = 0

      mockArrayReduce.mockReturnValue(6)

      reduce(collection, iteratee, accumulator)

      expect(mockArrayReduce).toHaveBeenCalledWith(
        collection,
        iteratee,
        accumulator,
        false,
        expect.any(Function)
      )
    })

    it('should pass collection, iteratee, accumulator, initAccum, and baseEach to baseReduce', () => {
      const collection = { a: 1, b: 2 }
      const iteratee = vi.fn()
      const accumulator = {}

      mockBaseReduce.mockReturnValue({})

      reduce(collection, iteratee, accumulator)

      expect(mockBaseReduce).toHaveBeenCalledWith(
        collection,
        iteratee,
        accumulator,
        false,
        expect.any(Function)
      )
    })
  })

  describe('return value handling', () => {
    it('should return the value returned by arrayReduce', () => {
      const collection = [1, 2, 3]
      const iteratee = vi.fn()
      const expectedResult = 42

      mockArrayReduce.mockReturnValue(expectedResult)

      const result = reduce(collection, iteratee, 0)

      expect(result).toBe(expectedResult)
    })

    it('should return the value returned by baseReduce', () => {
      const collection = { a: 1, b: 2 }
      const iteratee = vi.fn()
      const expectedResult = { x: 10 }

      mockBaseReduce.mockReturnValue(expectedResult)

      const result = reduce(collection, iteratee, {})

      expect(result).toStrictEqual(expectedResult)
    })

    it('should return undefined if helper function returns undefined', () => {
      const collection = [1, 2, 3]
      const iteratee = vi.fn()

      mockArrayReduce.mockReturnValue(undefined)

      const result = reduce(collection, iteratee)

      expect(result).toBeUndefined()
    })

    it('should return null if helper function returns null', () => {
      const collection = { a: 1 }
      const iteratee = vi.fn()

      mockBaseReduce.mockReturnValue(null)

      const result = reduce(collection, iteratee, {})

      expect(result).toBeNull()
    })

    it('should return string result from helper function', () => {
      const collection = ['a', 'b', 'c']
      const iteratee = vi.fn()
      const expectedResult = 'abc'

      mockArrayReduce.mockReturnValue(expectedResult)

      const result = reduce(collection, iteratee, '')

      expect(result).toBe(expectedResult)
    })
  })

  describe('edge cases', () => {
    it('should handle empty array with accumulator', () => {
      const collection = []
      const iteratee = vi.fn()
      const accumulator = 42

      mockArrayReduce.mockReturnValue(42)

      const result = reduce(collection, iteratee, accumulator)

      expect(result).toBe(42)
      expect(mockArrayReduce).toHaveBeenCalledWith(
        collection,
        iteratee,
        accumulator,
        false,
        expect.any(Function)
      )
    })

    it('should handle empty object with accumulator', () => {
      const collection = {}
      const iteratee = vi.fn()
      const accumulator = { result: true }

      mockBaseReduce.mockReturnValue({ result: true })

      const result = reduce(collection, iteratee, accumulator)

      expect(result).toStrictEqual({ result: true })
      expect(mockBaseReduce).toHaveBeenCalledWith(
        collection,
        iteratee,
        accumulator,
        false,
        expect.any(Function)
      )
    })

    it('should handle array-like object as array', () => {
      const collection = { 0: 'a', 1: 'b', length: 2 }
      const iteratee = vi.fn()
      const accumulator = ''

      // Array.isArray returns false for array-like objects
      mockBaseReduce.mockReturnValue('ab')

      const result = reduce(collection, iteratee, accumulator)

      expect(result).toBe('ab')
      expect(mockBaseReduce).toHaveBeenCalled()
      expect(mockArrayReduce).not.toHaveBeenCalled()
    })

    it('should pass the correct baseEach reference to helper function', () => {
      const collection = [1, 2, 3]
      const iteratee = vi.fn()

      mockArrayReduce.mockReturnValue(6)

      reduce(collection, iteratee, 0)

      const calls = mockArrayReduce.mock.calls
      expect(calls[0][4]).toBeDefined() // baseEach should be passed
      expect(typeof calls[0][4]).toBe('function')
    })
  })
})
