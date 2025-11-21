import every from '../src/every.js'

console.log("every is: ", every)
every([1, 2, 3], x => x)


// Predicate function to use as a parameter for every
function testPredicate(listValue, i, valueList) {
    if(!listValue){return false}
    return true
}

// all used falsy and truthy values
const falsyValues = [false, "", 0, 0n, null, undefined, NaN]
const truthyValues = [true, "nonEmpty", 1, -1, 100000, -99999, 3.14, -3.14, 1n, -99n, {"ob":"ject"}, new Date(), testPredicate]

test('should return true when given empty list', () => {
    expect(every([], testPredicate)).toBe(true)
})

test('should return false when given one-item-list with falsy value', () => {
    expect(every([false], testPredicate)).toBeFalsy()
})

test('should return true for all truthy values used in this test file', () => {
    expect(every(truthyValues, testPredicate)).toBe(true)
})

test('should return false for all falsy values used in this test file', () => {
    expect(every(falsyValues, testPredicate)).toBeFalsy()
})

test('should return true when given big list with truthy returning values', () => {
    let truth = Array(1000).fill(truthyValues).flat()
    expect(every(truth, testPredicate)).toBe(true)
})

test('should return false when given big list with 2 falsy returning values', () => {
    let trueWithTwoFalsy = Array(999).fill(truthyValues).flat()
    trueWithTwoFalsy.concat(0)
    trueWithTwoFalsy[500] = ""

    expect(every(trueWithTwoFalsy, testPredicate)).toBe(false)

})
// test('should return true when custom predicate returns only truthy values', () => {

// });
// test('should return false when custom predicate returns one falsy value within truthy values', () => {

// });
// test('should return false when custom predicate returns only falsy values', () => {

// });
