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

const sum = (a, b) => a + b
const swapKeysAndValues = (r,v,k)=>((r[v]??=[]).push(k),r)

describe('reduce', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
    it('should return sum when given array of numbers, a sum function and 0 as accumulator', () => {
        mockArrayReduce.mockReturnValue(3)

        expect(reduce([1,2], sum, 0)).toBe(3)
    })

    it('should return sum when given array of numbers, a sum function and no accumulator', () => {
        mockArrayReduce.mockReturnValue(3)

        expect(reduce([1,2], sum)).toBe(3)
    })

    it('should return sum plus accumulator when given non-zero accumulator', () => {
        mockArrayReduce.mockReturnValue(5)

        expect(reduce([1,2], sum, 2)).toBe(5)
    })

    it('should return object with original values as keys and original keys as values', () => {
        mockBaseReduce.mockReturnValue({ '1': ['a', 'c'], '2': ['b'] })

        expect(reduce({ 'a': 1, 'b': 2, 'c': 1 }, swapKeysAndValues, {})).toStrictEqual({ '1': ['a', 'c'], '2': ['b'] })
    })

    it('should return accumulator if collection is empty array', () => {
        mockArrayReduce.mockReturnValue(1)

        expect(reduce([], sum, 1)).toBe(1)
    })

    it('should return accumulator if collection is empty object ', () => {
        mockBaseReduce.mockReturnValue({ a: 1 })

        expect(reduce({}, swapKeysAndValues, {a: 1})).toStrictEqual({a: 1})
    })

    it('should return null if collection is empty and no accumulator is given', () => {
        mockArrayReduce.mockReturnValue(undefined)

        expect(reduce([], swapKeysAndValues)).toBe(undefined)
    })
})
