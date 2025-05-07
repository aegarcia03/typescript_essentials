jest.mock('../basicmaths');

import * as basicMaths from '../basicmaths';
const { calculate } = jest.requireActual('../basicmaths');  

// test with mocking
describe('Mocking Basic Maths Functions', () => {
    // reset mock after each test
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test('calculate should call add function when operator is +', () => {
        (basicMaths.add as jest.Mock).mockReturnValue(5);

        const result = calculate(2, 3, '+');
        expect(basicMaths.add).toHaveBeenCalledWith(2, 3);
        expect(result).toBe(5);
    });

    test('calculate should call subtract function when operator is -', () => {
        (basicMaths.subtract as jest.Mock).mockReturnValue(2);

        const result = calculate(5, 3, '-');
        expect(basicMaths.subtract).toHaveBeenCalledWith(5, 3);
        expect(result).toBe(2);
    });

    test('calculate should call multiply function when operator is *', () => {
        (basicMaths.multiply as jest.Mock).mockReturnValue(6);

        const result = calculate(2, 3, '*');
        expect(basicMaths.multiply).toHaveBeenCalledWith(2, 3);
        expect(result).toBe(6);
    });

    test('calculate should return "Invalid operator" when operator is invalid', () => {
        const result = calculate(2, 3, '/');
        expect(result).toBe('Invalid operator');
    });
});


// // Why this works
//  Mock before importing anything else.
// calculate keeps the real implementation but will use the mocked functions because they are called via the basicMaths object inside the function.
// You correctly type-cast the mocked functions with as jest.Mock so you can add mockReturnValue.