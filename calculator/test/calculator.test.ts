import { describe, expect, test } from '@jest/globals';
import { calculateInvestment, investmentData, calculationResult } from '../calculator';

describe('Investment Calculator', () => {
  // Test valid input produces correct results
  test('should calculate investment results correctly', () => {
    const testData: investmentData = {
      initial_amount: 1000,
      annual_contribution: 100,
      expected_return: 0.05,
      duration: 3
    };
    
    const results = calculateInvestment(testData);
    
    // Check that results is an array (not an error string)
    expect(Array.isArray(results)).toBeTruthy();
    
    if (Array.isArray(results)) {
      // Results should have 3 years of data
      expect(results.length).toBe(3);
      
      // Verify first year results
      expect(results[0].year).toBe('Year 1');
      // Check if calculations are correct (with some rounding tolerance)
      // Year 1: (1000 * 1.05) + 100 = 1150
      expect(results[0].total_amount).toBeCloseTo(1150, 0);
      expect(results[0].total_contributions).toBe(100);
      expect(results[0].total_interest_earned).toBeCloseTo(50, 0);
      
      // Year 3 results (final year)
      expect(results[2].year).toBe('Year 3');
      // Manual calculation for verification:
      // Year 1: (1000 * 1.05) + 100 = 1150
      // Year 2: (1150 * 1.05) + 100 = 1307.5
      // Year 3: (1307.5 * 1.05) + 100 = 1472.875
      expect(results[2].total_amount).toBeCloseTo(1472.88, 1);
      expect(results[2].total_contributions).toBe(300);
      expect(results[2].total_interest_earned).toBeCloseTo(172.88, 1);
    }
  });
  
  // Test negative initial amount
  test('should return error for negative initial amount', () => {
    const testData: investmentData = {
      initial_amount: -1000,
      annual_contribution: 100,
      expected_return: 0.05,
      duration: 5
    };
    
    const result = calculateInvestment(testData);
    expect(result).toBe('Initial investment amount must be more than zero');
  });
  
  // Test zero or negative duration
  test('should return error for zero duration', () => {
    const testData: investmentData = {
      initial_amount: 1000,
      annual_contribution: 100,
      expected_return: 0.05,
      duration: 0
    };
    
    const result = calculateInvestment(testData);
    expect(result).toBe('No valid amount of years provided');
  });
  
  test('should return error for negative duration', () => {
    const testData: investmentData = {
      initial_amount: 1000,
      annual_contribution: 100,
      expected_return: 0.05,
      duration: -3
    };
    
    const result = calculateInvestment(testData);
    expect(result).toBe('No valid amount of years provided');
  });
  
  // Test negative expected return
  test('should return error for negative expected return', () => {
    const testData: investmentData = {
      initial_amount: 1000,
      annual_contribution: 100,
      expected_return: -0.05,
      duration: 5
    };
    
    const result = calculateInvestment(testData);
    expect(result).toBe('Expected return must be at least zero');
  });
  
  // Test zero expected return
  test('should handle zero expected return', () => {
    const testData: investmentData = {
      initial_amount: 1000,
      annual_contribution: 100,
      expected_return: 0,
      duration: 3
    };
    
    const results = calculateInvestment(testData);
    
    expect(Array.isArray(results)).toBeTruthy();
    
    if (Array.isArray(results)) {
      // With 0% return, we should just have the contributions
      expect(results[2].total_amount).toBe(1300); // 1000 + (3 * 100)
      expect(results[2].total_contributions).toBe(300);
      expect(results[2].total_interest_earned).toBe(0);
    }
  });
  
  // Test edge case with large numbers
  test('should handle large investment values', () => {
    const testData: investmentData = {
      initial_amount: 1000000,
      annual_contribution: 100000,
      expected_return: 0.10,
      duration: 1
    };
    
    const results = calculateInvestment(testData);
    
    expect(Array.isArray(results)).toBeTruthy();
    
    if (Array.isArray(results)) {
      // (1000000 * 1.1) + 100000 = 1200000
      expect(results[0].total_amount).toBeCloseTo(1200000, 0);
      expect(results[0].total_contributions).toBe(100000);
      expect(results[0].total_interest_earned).toBeCloseTo(100000, 0);
    }
  });
  
  // Test negative annual contribution (unusual but could be allowed)
  test('should handle negative annual contributions', () => {
    const testData: investmentData = {
      initial_amount: 10000,
      annual_contribution: -1000,
      expected_return: 0.05,
      duration: 2
    };
    
    const results = calculateInvestment(testData);
    
    expect(Array.isArray(results)).toBeTruthy();
    
    if (Array.isArray(results)) {
      // Year 1: (10000 * 1.05) - 1000 = 9500
      // Year 2: (9500 * 1.05) - 1000 = 8975
      expect(results[1].total_amount).toBeCloseTo(8975, 0);
      expect(results[1].total_contributions).toBe(-2000);
    }
  });
});