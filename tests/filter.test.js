import filter from '../src/filter.js'

// Mock data for testing
const MOCK_USER_DATA = [
  { user: 'Arthur', active: true, age: 34, role: 'Admin' },
  { user: 'Fred', active: false, age: 28, role: 'Editor' },
  { user: 'Barney', active: true, age: 45, role: 'Contributor' },
  { user: 'Wilma', active: true, age: 22, role: 'Viewer' },
  { user: 'Betty', active: false, age: 51, role: 'Editor' },
  { user: 'Pebbles', active: true, age: 19, role: 'Viewer' },
  { user: 'Dino', active: false, age: 10, role: 'Viewer' },
  { user: 'Bamm-Bamm', active: true, age: 30, role: 'Admin' },
  { user: 'Gazoo', active: true, age: 105, role: 'Contributor' },
  { user: 'Rubble', active: false, age: 41, role: 'Editor' },
  { user: 'Flint', active: true, age: 38, role: 'Admin' },
  { user: 'George', active: true, age: 60, role: 'Contributor' },
  { user: 'Jane', active: false, age: 27, role: 'Viewer' },
  { user: 'Judy', active: true, age: 33, role: 'Editor' },
  { user: 'Elroy', active: false, age: 16, role: 'Viewer' },
  { user: 'Astro', active: true, age: 5, role: 'Viewer' },
  { user: 'Cogswell', active: false, age: 72, role: 'Admin' },
  { user: 'Spacely', active: true, age: 55, role: 'Contributor' },
  { user: 'Rosie', active: true, age: 40, role: 'Editor' },
  { user: 'Orbitty', active: false, age: 7, role: 'Viewer' },
];

function generateTestArray(length) {
  if (length <= MOCK_USER_DATA.length) {
    return MOCK_USER_DATA.slice(0, length);
  }
  let result = [];
  for (let i = 0; i < length; i++) {
    result.push({ ...MOCK_USER_DATA[i % MOCK_USER_DATA.length] }); 
  }
  return result;
}

describe('Basic small tests', () => {

    test('should return one labeled object out of array', () => {
        const inputArray = [
            { 'user': 'barney', 'active': true }
         ]
        const inputCopy = [...inputArray]
        
        const result = filter(inputArray, ({ active }) => active)
        expect(result).not.toBe(inputCopy)
        expect(inputArray).toEqual(inputCopy)
        expect(result.length).toEqual(1)
        expect(result).toEqual([{ 'user': 'barney', 'active': true }])
    })

    test('should return empty list when input list is empty', () => {
        const inputArray = []
        const inputCopy = [...inputArray]
        
        const result = filter(inputArray, ({ active }) => active)
        expect(result).not.toBe(inputCopy)
        expect(inputArray).toEqual(inputCopy)
        expect(result.length).toEqual(1)
        expect(result).toEqual([[]])
    })

    test('should return empty list when input list is null', () => {
        const inputArray = null
        
        const result = filter(inputArray, ({ active }) => active)
        expect(result.length).toEqual(1)
        expect(result).toEqual([[]])
    })
})

describe('Mock data testsing for filter.js', () => {

    test('should return one labeled object out of array', () => {
        const inputArray = generateTestArray(1000)
        const inputCopy = [...inputArray]
        
        const result = filter(inputArray, ({age}) => age < 10)
        expect(result).not.toBe(inputCopy)
        expect(inputArray).toEqual(inputCopy)
        expect(result.length).toEqual(100)
        expect(result[0]).toEqual({ user: 'Astro', active: true, age: 5, role: 'Viewer' })
        expect(result[1]).toEqual({ user: 'Orbitty', active: false, age: 7, role: 'Viewer' })
        expect(result[98]).toEqual({ user: 'Astro', active: true, age: 5, role: 'Viewer' })
        expect(result[99]).toEqual({ user: 'Orbitty', active: false, age: 7, role: 'Viewer' })
    })

    test('should return one labeled object out of array', () => {
        const inputArray = generateTestArray(100)
        // Change "Arthur's" name midpack of the whole array
        inputArray[40].user = "testsubject";
        const inputCopy = [...inputArray]
        
        const result = filter(inputArray, ({user}) => user == "testsubject")
        expect(result).not.toBe(inputCopy)
        expect(inputArray).toEqual(inputCopy)
        expect(result.length).toEqual(1)
        expect(result[0]).toEqual({ user: 'testsubject', active: true, age: 34, role: 'Admin' })
    })

    test('should return all non-falsy objects', () => {
        const inputArray = generateTestArray(1000)

        // falsifying 3 objects midpack
        inputArray[250] = null;
        inputArray[500] = undefined;
        inputArray[750] = "";
        
        const inputCopy = [...inputArray]
        
        const result = filter(inputArray, (item) => item)
        expect(result).not.toBe(inputCopy)
        expect(inputArray).toEqual(inputCopy)
        expect(result.length).toEqual(997)
    })
})
