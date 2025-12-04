import { describe } from 'vitest'
import defaultTo from '../src/defaultTo.js'

describe('tests to return default', () =>{
    test('should return int value when it is determined', () => {
        expect(defaultTo(1, 10)).toBe(1)
    })
    test('should return float value and not react to default being undefined', () => {
        expect(defaultTo(3.14, undefined)).toBe(3.14)
    })
    test('should return string value and not react to default being NaN', () => {
        expect(defaultTo("nonEmpty", NaN)).toBe("nonEmpty")
    })
    test('should return value when default is undefined', () => {
        expect(defaultTo(1, null)).toBe(1)
    })
})

describe('tests to return default', () =>{
    test('should return default when value is undefined', () => {
        expect(defaultTo(undefined, 1)).toBe(1)
    })

    test('should return default when value is null', () => {
        expect(defaultTo(null, 1)).toBe(1)
    })

    test('should return default when given zero as value', () => {
        expect(defaultTo(0, 10)).toBe(0)
    })
})