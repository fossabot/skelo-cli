// Generated by Qodo Gen

const { getFiles } = require('../lib/skelo-utils');

describe('getFiles', () => {

    // Returns files matching primary patterns when available
    it('should return files matching primary patterns when available', () => {
      const primaryPatterns = '*.js';
      const fallbackPatterns = '*.ts';
      const result = getFiles(primaryPatterns, fallbackPatterns);
      expect(result.length).toBe(1);
    });

    // Throws error when primaryPatterns is null or undefined
    it('should throw error when primaryPatterns is null or undefined', () => {
      expect(() => getFiles(null, '*.ts')).toThrow('Invalid input: `primaryPatterns` must be a string or an array of strings.');
      expect(() => getFiles(undefined, '*.ts')).toThrow('Invalid input: `primaryPatterns` must be a string or an array of strings.');
    });

    // Handles empty string as input for primaryPatterns
    it('should throw an error when primaryPatterns is an empty string', () => {
      const globSync = jest.fn();
      const primaryPatterns = '';
      const fallbackPatterns = '*.ts';
      expect(() => getFiles(primaryPatterns, fallbackPatterns)).toThrow('Invalid input: `primaryPatterns` must be a string or an array of strings.');
    });

    // Throws error when primaryPatterns is neither string nor array
    it('should throw error when primaryPatterns is not a string or array', () => {
      const invalidPrimaryPatterns = 123;
      const fallbackPatterns = '*.ts';
      expect(() => getFiles(invalidPrimaryPatterns, fallbackPatterns)).toThrow('Invalid input: `primaryPatterns` must be a string or an array of strings.');
    });

    // // Throws error when fallbackPatterns is neither string nor array
    // it('should throw error when fallbackPatterns is neither string nor array', () => {
    //   const globSync = jest.fn();
    //   const primaryPatterns = '*.js';
    //   const fallbackPatterns = 123; // Invalid type for fallbackPatterns
    //   expect(() => getFiles(primaryPatterns, fallbackPatterns)).toThrow('Invalid input: `fallbackPatterns` must be a string or an array of strings.');
    // });

    // // Returns empty array when both primary and fallback patterns yield no results
    // it('should return empty array when both primary and fallback patterns yield no results', () => {
    //   const globSync = jest.fn().mockReturnValue([]);
    //   const primaryPatterns = '*.js';
    //   const fallbackPatterns = '*.ts';
    //   const result = getFiles(primaryPatterns, fallbackPatterns);
    //   expect(globSync).toHaveBeenCalledWith(primaryPatterns);
    //   expect(globSync).toHaveBeenCalledWith(fallbackPatterns);
    //   expect(result).toEqual([]);
    // });

    // // Handles empty string as input for fallbackPatterns
    // it('should return an empty array when primary patterns do not match and fallbackPatterns is an empty string', () => {
    //   const globSync = jest.fn().mockReturnValue([]);
    //   const primaryPatterns = '*.nonexistent';
    //   const fallbackPatterns = '';
    //   const result = getFiles(primaryPatterns, fallbackPatterns);
    //   expect(globSync).toHaveBeenCalledWith(primaryPatterns);
    //   expect(result).toEqual([]);
    // });

    // // Handles large number of patterns efficiently
    // it('should handle large number of patterns efficiently', () => {
    //   const globSync = jest.fn().mockImplementation((patterns) => {
    //     if (Array.isArray(patterns)) {
    //       return patterns.map((pattern, index) => `file${index}.js`);
    //     }
    //     return [];
    //   });
    //   const primaryPatterns = Array.from({ length: 1000 }, (_, i) => `pattern${i}.js`);
    //   const fallbackPatterns = Array.from({ length: 1000 }, (_, i) => `fallback${i}.js`);
    //   const result = getFiles(primaryPatterns, fallbackPatterns);
    //   expect(globSync).toHaveBeenCalledWith(primaryPatterns);
    //   expect(result.length).toBe(1000);
    // });

    // // Handles special characters in pattern strings
    // it('should correctly handle special characters in pattern strings', () => {
    //   const globSync = jest.fn().mockReturnValue(['file[1].js', 'file(2).js']);
    //   const primaryPatterns = 'file[1].js';
    //   const fallbackPatterns = 'file(2).js';
    //   const result = getFiles(primaryPatterns, fallbackPatterns);
    //   expect(globSync).toHaveBeenCalledWith(primaryPatterns);
    //   expect(result).toEqual(['file[1].js', 'file(2).js']);
    // });

    // // Ensures no side effects when fallbackPatterns is null
    // it('should return an empty array when primary patterns do not match and fallbackPatterns is null', () => {
    //   const globSync = jest.fn().mockReturnValue([]);
    //   const primaryPatterns = '*.js';
    //   const fallbackPatterns = null;
    //   const result = getFiles(primaryPatterns, fallbackPatterns);
    //   expect(globSync).toHaveBeenCalledWith(primaryPatterns);
    //   expect(result).toEqual([]);
    // });
});
