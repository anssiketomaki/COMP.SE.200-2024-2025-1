import reduce from '../src/reduce.js'

const sum = (a, b) => a + b
const swapKeysAndValues = (r,v,k)=>((r[v]??=[]).push(k),r)

test('should return sum when given array of numbers, a sum function and 0 as accumulator', () => {
    expect(reduce([1,2], sum, 0)).toBe(3)
})

test('should return sum when given array of numbers, a sum function and no accumulator', () => {
    expect(reduce([1,2], sum)).toBe(3)
})

test('should return sum plus accumulator when given non-zero accumulator', () => {
    expect(reduce([1,2], sum, 2)).toBe(5)
})

test('should return object with original values as keys and original keys as values', () => {
    expect(reduce({ 'a': 1, 'b': 2, 'c': 1 }, swapKeysAndValues, {})).toStrictEqual({ '1': ['a', 'c'], '2': ['b'] })
})

test('should return accumulator if collection is empty array', () => {
    expect(reduce([], sum, 1)).toBe(1)
})

test('should return accumulator if collection is empty object ', () => {
    expect(reduce({}, swapKeysAndValues, {a: 1})).toStrictEqual({a: 1})

})

test('should return null if collection is empty and no accumulator is given', () => {
    expect(reduce([], swapKeysAndValues)).toBe(undefined)
})
