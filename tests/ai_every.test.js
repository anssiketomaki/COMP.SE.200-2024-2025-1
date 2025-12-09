import { describe, it, expect } from 'vitest'
import every from '../src/every.js'

describe('every', () => {
  it('returns true when all elements satisfy the predicate', () => {
    const result = every([2, 4, 6], (value) => value % 2 === 0)
    expect(result).toBe(true)
  })

  it('returns false when at least one element does not satisfy the predicate', () => {
    const result = every([true, 1, null, 'yes'], Boolean)
    expect(result).toBe(false)
  })

  it('returns true for an empty array (vacuous truth)', () => {
    const result = every([], Boolean)
    expect(result).toBe(true)
  })

  it('returns true when array is null or undefined', () => {
    expect(every(null, Boolean)).toBe(true)
    expect(every(undefined, Boolean)).toBe(true)
  })

  it('passes value, index and array to the predicate', () => {
    const received = []

    const array = ['a', 'b', 'c']
    every(array, (value, index, original) => {
      received.push({ value, index, sameArray: original === array })
      return true
    })

    expect(received).toEqual([
      { value: 'a', index: 0, sameArray: true },
      { value: 'b', index: 1, sameArray: true },
      { value: 'c', index: 2, sameArray: true },
    ])
  })

  it('stops iterating once predicate returns false', () => {
    const calls = []
    const array = [1, 2, 3, 4]

    const result = every(array, (value) => {
      calls.push(value)
      return value < 3
    })

    expect(result).toBe(false)
    // should only process values until the first failing one
    expect(calls).toEqual([1, 2, 3])
  })
})
