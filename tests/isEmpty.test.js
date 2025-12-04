
// vi.hoisted creates the mocks BEFORE the vi.mock calls run
const { mockgetTag, mockisArguments, mockisArrayLike, mockisBuffer, 
    mockisPrototype, mockisTypedArray } = vi.hoisted(() => {
  return {
    mockgetTag: vi.fn(),
    mockisArguments: vi.fn(),
    mockisArrayLike: vi.fn(),
    mockisBuffer: vi.fn(),
    mockisPrototype: vi.fn(),
    mockisTypedArray: vi.fn(),
  }
})

// Mocking the modules using hoisted variables
vi.mock('../src/.internal/getTag.js', () => ({
  default: mockgetTag,
}))
vi.mock('../src/isArguments.js', () => ({
  default: mockisArguments,
}))
vi.mock('../src/isArrayLike.js', () => ({
  default: mockisArrayLike,
}))
vi.mock('../src/isBuffer.js', () => ({
  default: mockisBuffer,
}))
vi.mock('../src/.internal/isPrototype.js', () => ({
  default: mockisPrototype,
}))
vi.mock('../src/isTypedArray.js', () => ({
  default: mockisTypedArray,
}))

// import after setting mocks!
import isEmpty from '../src/isEmpty.js'

describe('tests to exit with true', () => {
  afterEach(() => {
        // Extremely important to RESET mocks queue between tests.
        // Otherwise the queue persists
        vi.resetAllMocks()
    })
    
    test('should return true with null value', () => {

      const value = null

      // Setup the mock returns using the hoisted variable
      mockgetTag.mockReturnValueOnce('[object Null]')
      mockisArguments.mockReturnValueOnce(false)
      mockisArrayLike.mockReturnValueOnce(false)
      mockisBuffer.mockReturnValueOnce(false)
      mockisPrototype.mockReturnValueOnce(false)
      mockisTypedArray.mockReturnValueOnce(false)
    
      // Call the function under test
      const result = isEmpty(value)

      // Assert the final result
      expect(result).toBe(true)

      // Assert verifications of function actions
      expect(mockisArrayLike).toHaveBeenCalledTimes(0)
    })

    test('should return true with number value', () => {

      const value = 1234567890

      // Setup the mock returns using the hoisted variable
      mockgetTag.mockReturnValueOnce('[object Null]')
      mockisArguments.mockReturnValueOnce(false)
      mockisArrayLike.mockReturnValueOnce(false)
      mockisBuffer.mockReturnValueOnce(false)
      mockisPrototype.mockReturnValueOnce(false)
      mockisTypedArray.mockReturnValueOnce(false)
    
      // Call the function under test
      const result = isEmpty(value)

      // Assert the final result
      expect(result).toBe(true)

      // Assert verifications of function actions
      expect(mockisArrayLike).toHaveBeenCalledTimes(1)
      expect(mockgetTag).toHaveBeenCalledTimes(1)
      expect(mockisPrototype).toHaveBeenCalledTimes(1)
    })

    test('should return true with boolean value', () => {

      const value = false

      // Setup the mock returns using the hoisted variable
      mockgetTag.mockReturnValueOnce('[object Null]')
      mockisArguments.mockReturnValueOnce(false)
      mockisArrayLike.mockReturnValueOnce(false)
      mockisBuffer.mockReturnValueOnce(false)
      mockisPrototype.mockReturnValueOnce(false)
      mockisTypedArray.mockReturnValueOnce(false)
    
      // Call the function under test
      const result = isEmpty(value)

      // Assert the final result
      expect(result).toBe(true)

      // Assert verifications of function actions
      expect(mockisArrayLike).toHaveBeenCalledTimes(1)
      expect(mockgetTag).toHaveBeenCalledTimes(1)
      expect(mockisPrototype).toHaveBeenCalledTimes(1)
    })

    test('should return true with null object value', () => {

      const value = Object.create(null)

      // Setup the mock returns using the hoisted variable
      mockgetTag.mockReturnValueOnce('[object Null]')
      mockisArguments.mockReturnValueOnce(false)
      mockisArrayLike.mockReturnValueOnce(false)
      mockisBuffer.mockReturnValueOnce(false)
      mockisPrototype.mockReturnValueOnce(false)
      mockisTypedArray.mockReturnValueOnce(false)
    
      // Call the function under test
      const result = isEmpty(value)

      // Assert the final result
      expect(result).toBe(true)

      // Assert verifications of function actions
      expect(mockisArrayLike).toHaveBeenCalledTimes(1)
      expect(mockgetTag).toHaveBeenCalledTimes(1)
      expect(mockisPrototype).toHaveBeenCalledTimes(1)
    })

    test('should return true for an object with only inherited properties', () => {

      // an object that inherits properties but has no own keys.
      // -> enters for loop but doesn't trigger hasOwnProperty.call if-statement
      const parent = { inheritedKey: 1 };
      const value = Object.create(parent); 
      
      // 2. The mocks must ensure the execution reaches the end.
      mockgetTag.mockReturnValueOnce('[object Object]'); // Forces tag check bypass
      mockisPrototype.mockReturnValueOnce(false); // Forces prototype bypass
      mockisArrayLike.mockReturnValueOnce(false); // Forces array-like bypass

      const result = isEmpty(value);

      expect(result).toBe(true);

      // Assert verifications of function actions
      expect(mockisArrayLike).toHaveBeenCalledTimes(1)
      expect(mockgetTag).toHaveBeenCalledTimes(1)
      expect(mockisPrototype).toHaveBeenCalledTimes(1)
    })
})

describe('tests to trigger if-statements with non-empty map/set, prototype and dict', () => {
    afterEach(() => {
        vi.resetAllMocks()
    })

    test('should return false with non-empty map', () => {

      const value = new Map([
          ["apples", 500],
          ["bananas", 300],
          ["oranges", 200]
        ]);

      // Setup the mock returns using the hoisted variable
      mockgetTag.mockReturnValueOnce('[object Map]')
      mockisArguments.mockReturnValueOnce(false)
      mockisArrayLike.mockReturnValueOnce(false)
      mockisBuffer.mockReturnValueOnce(false)
      mockisPrototype.mockReturnValueOnce(false)
      mockisTypedArray.mockReturnValueOnce(false)
    
      // Call the function under test
      const result = isEmpty(value)

      // Assert the final result
      expect(result).toBe(false)

      // Assert verifications of function actions
      expect(mockisArrayLike).toHaveBeenCalledTimes(1)
      expect(mockgetTag).toHaveBeenCalledTimes(1)
      expect(mockisPrototype).toHaveBeenCalledTimes(0)
    })

    test('should return false with non-empty set', () => {

      const value = new Set(["a","b","c"]);

      // Setup the mock returns using the hoisted variable
      mockgetTag.mockReturnValueOnce('[object Set]')
      mockisArguments.mockReturnValueOnce(false)
      mockisArrayLike.mockReturnValueOnce(false)
      mockisBuffer.mockReturnValueOnce(false)
      mockisPrototype.mockReturnValueOnce(false)
      mockisTypedArray.mockReturnValueOnce(false)
    
      // Call the function under test
      const result = isEmpty(value)

      // Assert the final result
      expect(result).toBe(false)

      // Assert verifications of function actions
      expect(mockisArrayLike).toHaveBeenCalledTimes(1)
      expect(mockgetTag).toHaveBeenCalledTimes(1)
      expect(mockisPrototype).toHaveBeenCalledTimes(0)
    })
    test('should return false with non-empty prototype', () => {

      // Create non-empty prototype
      function DummyCtor() {}
      const value = DummyCtor.prototype;
      // Add two OWN, ENUMERABLE properties to the prototype 
      // This directly affects Object.keys(value).length
      value.key1 = 'data';
      value.key2 = 123;

      // Setup the mock returns using the hoisted variable
      mockgetTag.mockReturnValueOnce('[object Null]')
      mockisArguments.mockReturnValueOnce(false)
      mockisArrayLike.mockReturnValueOnce(false)
      mockisBuffer.mockReturnValueOnce(false)
      mockisPrototype.mockReturnValueOnce(true)
      mockisTypedArray.mockReturnValueOnce(false)
    
      // Call the function under test
      const result = isEmpty(value)

      // Assert the final result
      expect(result).toBe(false)

      // Assert verifications of function actions
      expect(mockisArrayLike).toHaveBeenCalledTimes(1)
      expect(mockgetTag).toHaveBeenCalledTimes(1)
      expect(mockisPrototype).toHaveBeenCalledTimes(1)
    })
    test('should return false with non-empty dict', () => {

      const value = {
        'a': 0,
        'b': 1,
        'c': 2,
        'd': 3,
        'e': 4
      };

      // Setup the mock returns using the hoisted variable
      mockgetTag.mockReturnValueOnce('[object Null]')
      mockisArguments.mockReturnValueOnce(false)
      mockisArrayLike.mockReturnValueOnce(false)
      mockisBuffer.mockReturnValueOnce(false)
      mockisPrototype.mockReturnValueOnce(false)
      mockisTypedArray.mockReturnValueOnce(false)
    
      // Call the function under test
      const result = isEmpty(value)

      // Assert the final result
      expect(result).toBe(false)

      // Assert verifications of function actions
      expect(mockisArrayLike).toHaveBeenCalledTimes(1)
      expect(mockgetTag).toHaveBeenCalledTimes(1)
      expect(mockisPrototype).toHaveBeenCalledTimes(1)
    })
    
})

describe('tests to trigger if-statement with isArrayLike && -statements', () => {
    afterEach(() => {
        vi.resetAllMocks()
    })

    test('should return false with isArrayLike and a string value', () => {

      const value = "stringoftext";

      // Setup the mock returns using the hoisted variable
      mockisArrayLike.mockReturnValueOnce(true)

      mockgetTag.mockReturnValueOnce('[object Null]')
      mockisArguments.mockReturnValueOnce(false)
      mockisBuffer.mockReturnValueOnce(false)
      mockisPrototype.mockReturnValueOnce(false)
      mockisTypedArray.mockReturnValueOnce(false)
    
      // Call the function under test
      const result = isEmpty(value)

      // Assert the final result
      expect(result).toBe(false)

      // Assert verifications of function actions
      expect(mockisArrayLike).toHaveBeenCalledTimes(1)
      expect(mockgetTag).toHaveBeenCalledTimes(0)
      expect(mockisPrototype).toHaveBeenCalledTimes(0)
    })
    
    test('should return false with isArrayLike and when value.splice === function', () => {
      const value = {
        // Add some array-like properties
        0: 'item A',
        1: 'item B',
        length: 2,
        
        // Directly assigning the native Array.prototype.splice method
        // to the object's 'splice' property.
        splice: Array.prototype.splice 
      };

      // Setup the mock returns using the hoisted variable
      mockisArrayLike.mockReturnValueOnce(true)

      mockgetTag.mockReturnValueOnce('[object Null]')
      mockisArguments.mockReturnValueOnce(false)
      mockisBuffer.mockReturnValueOnce(false)
      mockisPrototype.mockReturnValueOnce(false)
      mockisTypedArray.mockReturnValueOnce(false)
    
      // Call the function under test
      const result = isEmpty(value)

      // Assert the final result
      expect(result).toBe(false)

      // Assert verifications of function actions
      expect(mockisArrayLike).toHaveBeenCalledTimes(1)
      expect(mockgetTag).toHaveBeenCalledTimes(0)
      expect(mockisPrototype).toHaveBeenCalledTimes(0)
    })

    test('should return false with isArrayLike and a buffer', () => {

      const value = Buffer.alloc(4);

      // Setup the mock returns using the hoisted variable
      mockisArrayLike.mockReturnValueOnce(true)

      mockgetTag.mockReturnValueOnce('[object Null]')
      mockisArguments.mockReturnValueOnce(false)
      mockisBuffer.mockReturnValueOnce(true)
      mockisPrototype.mockReturnValueOnce(false)
      mockisTypedArray.mockReturnValueOnce(false)
    
      // Call the function under test
      const result = isEmpty(value)

      // Assert the final result
      expect(result).toBe(false)

      // Assert verifications of function actions
      expect(mockisArrayLike).toHaveBeenCalledTimes(1)
      expect(mockgetTag).toHaveBeenCalledTimes(0)
      expect(mockisPrototype).toHaveBeenCalledTimes(0)
    })

    test('should return false with isArrayLike and a typed array Uint8Array', () => {

      const value = new Uint8Array(2);
      value[0] = 13
      value[1] = 2

      // Setup the mock returns using the hoisted variable
      mockisArrayLike.mockReturnValueOnce(true)

      mockgetTag.mockReturnValueOnce('[object Null]')
      mockisArguments.mockReturnValueOnce(false)
      mockisBuffer.mockReturnValueOnce(false)
      mockisPrototype.mockReturnValueOnce(false)
      mockisTypedArray.mockReturnValueOnce(true)
    
      // Call the function under test
      const result = isEmpty(value)

      // Assert the final result
      expect(result).toBe(false)

      // Assert verifications of function actions
      expect(mockisArrayLike).toHaveBeenCalledTimes(1)
      expect(mockgetTag).toHaveBeenCalledTimes(0)
      expect(mockisPrototype).toHaveBeenCalledTimes(0)
    })

    test('should return false with isArrayLike and a typed array Float64Array', () => {

      const value = new Float64Array([3.14, 3.41]);

      // Setup the mock returns using the hoisted variable
      mockisArrayLike.mockReturnValueOnce(true)

      mockgetTag.mockReturnValueOnce('[object Null]')
      mockisArguments.mockReturnValueOnce(false)
      mockisBuffer.mockReturnValueOnce(false)
      mockisPrototype.mockReturnValueOnce(false)
      mockisTypedArray.mockReturnValueOnce(true)
    
      // Call the function under test
      const result = isEmpty(value)

      // Assert the final result
      expect(result).toBe(false)

      // Assert verifications of function actions
      expect(mockisArrayLike).toHaveBeenCalledTimes(1)
      expect(mockgetTag).toHaveBeenCalledTimes(0)
      expect(mockisPrototype).toHaveBeenCalledTimes(0)
    })

    test('should return false with isArrayLike and a typed array Int16Array', () => {

      const value = new Int16Array(3, 7, 13);

      // Setup the mock returns using the hoisted variable
      mockisArrayLike.mockReturnValueOnce(true)

      mockgetTag.mockReturnValueOnce('[object Null]')
      mockisArguments.mockReturnValueOnce(false)
      mockisBuffer.mockReturnValueOnce(false)
      mockisPrototype.mockReturnValueOnce(false)
      mockisTypedArray.mockReturnValueOnce(true)
    
      // Call the function under test
      const result = isEmpty(value)

      // Assert the final result
      expect(result).toBe(false)

      // Assert verifications of function actions
      expect(mockisArrayLike).toHaveBeenCalledTimes(1)
      expect(mockgetTag).toHaveBeenCalledTimes(0)
      expect(mockisPrototype).toHaveBeenCalledTimes(0)
    })

    test('should return false with isArrayLike and a typed array Uint8ClampedArray', () => {

      const value = new Uint8ClampedArray([0, 255]);

      // Setup the mock returns using the hoisted variable
      mockisArrayLike.mockReturnValueOnce(true)

      mockgetTag.mockReturnValueOnce('[object Null]')
      mockisArguments.mockReturnValueOnce(false)
      mockisBuffer.mockReturnValueOnce(false)
      mockisPrototype.mockReturnValueOnce(false)
      mockisTypedArray.mockReturnValueOnce(true)
    
      // Call the function under test
      const result = isEmpty(value)

      // Assert the final result
      expect(result).toBe(false)

      // Assert verifications of function actions
      expect(mockisArrayLike).toHaveBeenCalledTimes(1)
      expect(mockgetTag).toHaveBeenCalledTimes(0)
      expect(mockisPrototype).toHaveBeenCalledTimes(0)
    })
    
    test('should return false with isArrayLike value containing arguments', () => {

      const value = function() { return arguments }(1, 2);

      // Setup the mock returns using the hoisted variable
      mockisArrayLike.mockReturnValueOnce(true)

      mockgetTag.mockReturnValueOnce('[object Arguments]')
      mockisArguments.mockReturnValueOnce(true)
      mockisBuffer.mockReturnValueOnce(false)
      mockisPrototype.mockReturnValueOnce(false)
      mockisTypedArray.mockReturnValueOnce(false)
    
      // Call the function under test
      const result = isEmpty(value)

      // Assert the final result
      expect(result).toBe(false)

      // Assert verifications of function actions
      expect(mockisArrayLike).toHaveBeenCalledTimes(1)
      expect(mockgetTag).toHaveBeenCalledTimes(0)
      expect(mockisPrototype).toHaveBeenCalledTimes(0)
    })
})
