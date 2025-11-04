import { describe, expect, it } from 'vitest';

import { parse } from './index';

describe('parse(string)', () => {
  it('should not throw an error', () => {
    expect(() => {
      parse('1m');
    }).not.toThrow();
  });

  it('should preserve s', () => {
    expect(parse('100')).toBe(100);
  });

  it('should convert from m to s', () => {
    expect(parse('1m')).toBe(60);
  });

  it('should convert from h to s', () => {
    expect(parse('1h')).toBe(3600);
  });

  it('should convert d to s', () => {
    expect(parse('2d')).toBe(172800);
  });

  it('should convert w to s', () => {
    expect(parse('3w')).toBe(1814400);
  });

  it('should convert s to s', () => {
    expect(parse('1s')).toBe(1);
  });

  it('should convert ms to s', () => {
    expect(parse('100ms')).toBe(0.1);
  });

  it('should convert y to s', () => {
    expect(parse('1y')).toBe(31557600);
  });

  it('should work with decimals', () => {
    expect(parse('1.5h')).toBe(5400);
  });

  it('should work with multiple spaces', () => {
    expect(parse('1   s')).toBe(1);
  });

  it('should return NaN if invalid', () => {
    expect(Number.isNaN(parse('☃'))).toBe(true);
    expect(Number.isNaN(parse('10-.5'))).toBe(true);
    expect(Number.isNaN(parse('s'))).toBe(true);
  });

  it('should be case-insensitive', () => {
    expect(parse('1.5H')).toBe(5400);
  });

  it('should work with numbers starting with .', () => {
    expect(parse('.5s')).toBe(0.5);
  });

  it('should work with negative integers', () => {
    expect(parse('-100s')).toBe(-100);
  });

  it('should work with negative decimals', () => {
    expect(parse('-1.5h')).toBe(-5400);
    expect(parse('-10.5h')).toBe(-37800);
  });

  it('should work with negative decimals starting with "."', () => {
    expect(parse('-.5h')).toBe(-1800);
  });
});

// long strings

describe('parse(long string)', () => {
  it('should not throw an error', () => {
    expect(() => {
      parse('53 seconds');
    }).not.toThrow();
  });

  it('should convert milliseconds to s', () => {
    expect(parse('53 milliseconds')).toBe(0.053);
  });

  it('should convert msecs to s', () => {
    expect(parse('17 msecs')).toBe(0.017);
  });

  it('should convert sec to s', () => {
    expect(parse('1 sec')).toBe(1);
  });

  it('should convert from min to s', () => {
    expect(parse('1 min')).toBe(60);
  });

  it('should convert from hr to s', () => {
    expect(parse('1 hr')).toBe(3600);
  });

  it('should convert days to s', () => {
    expect(parse('2 days')).toBe(172800);
  });

  it('should convert weeks to s', () => {
    expect(parse('1 week')).toBe(604800);
  });

  it('should convert years to s', () => {
    expect(parse('1 year')).toBe(31557600);
  });

  it('should work with decimals', () => {
    expect(parse('1.5 hours')).toBe(5400);
  });

  it('should work with negative integers', () => {
    expect(parse('-100 seconds')).toBe(-100);
  });

  it('should work with negative decimals', () => {
    expect(parse('-1.5 hours')).toBe(-5400);
  });

  it('should work with negative decimals starting with "."', () => {
    expect(parse('-.5 hr')).toBe(-1800);
  });
});

// invalid inputs

describe('parse(invalid inputs)', () => {
  it('should throw an error, when parse("")', () => {
    expect(() => {
      parse('');
    }).toThrow();
  });

  it('should throw an error, when parseStrict("...>100 length string...")', () => {
    expect(() => {
      parse('▲'.repeat(101));
    }).toThrow();
  });

  it('should throw an error, when parse(undefined)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse(undefined);
    }).toThrow();
  });

  it('should throw an error, when parse(null)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse(null);
    }).toThrow();
  });

  it('should throw an error, when parse([])', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse([]);
    }).toThrow();
  });

  it('should throw an error, when parse({})', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse({});
    }).toThrow();
  });

  it('should throw an error, when parse(NaN)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse(NaN);
    }).toThrow();
  });

  it('should throw an error, when parse(Infinity)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse(Infinity);
    }).toThrow();
  });

  it('should throw an error, when parse(-Infinity)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse(-Infinity);
    }).toThrow();
  });
});
