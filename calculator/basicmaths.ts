export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

import * as basicMaths from './basicmaths';

export function calculate(a:number, b:number, operator: string): number | string {
  switch (operator) {
    case '+':
      return basicMaths.add(a, b);
    case '-':
      return basicMaths.subtract(a, b);
    case '*':
      return basicMaths.multiply(a, b);
    default:
      return 'Invalid operator';
  }
}
