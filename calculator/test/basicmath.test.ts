import { add, subtract, multiply, calculate } from '../basicmaths';
import * as basicMaths from '../basicmaths';


describe('Basic Maths Functions', () => {
    // test add function
    test('add function', () => {
        expect(add(2, 3)).toBe(5);
        expect(add(-1, -1)).toBe(-2);
        expect(add(0, 0)).toBe(0);
    });
    // test subtract function
    test('subtract function', () => {
        expect(subtract(5, 3)).toBe(2);
        expect(subtract(-1, -1)).toBe(0);
        expect(subtract(0, 0)).toBe(0);
    });
    // test multiply function
    test('multiply function', () => {
        expect(multiply(2, 3)).toBe(6);
        expect(multiply(-1, -1)).toBe(1);
        expect(multiply(0, 5)).toBe(0);
    });
    // test calculate function
    test('calculate function', () => {
        expect(calculate(2, 3, '+')).toBe(5);
        expect(calculate(5, 3, '-')).toBe(2);
        expect(calculate(2, 3, '*')).toBe(6);
        expect(calculate(2, 3, '/')).toBe('Invalid operator');
    });
});