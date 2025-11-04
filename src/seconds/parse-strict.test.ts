import { describe, expect, it } from 'vitest';

import { parseStrict } from './index';

describe('parseStrict(string)', () => {
  it('should not throw an error', () => {
    expect(() => {
      parseStrict('1m');
    }).not.toThrow();
  });

  it('should preserve s', () => {
    expect(parseStrict('100')).toBe(100);
  });

  it('should convert from m to s', () => {
    expect(parseStrict('1m')).toBe(60);
  });

  it('should convert from h to s', () => {
    expect(parseStrict('1h')).toBe(3600);
  });

  it('should convert d to s', () => {
    expect(parseStrict('2d')).toBe(172800);
  });

  it('should convert w to s', () => {
    expect(parseStrict('3w')).toBe(1814400);
  });

  it('should convert s to s', () => {
    expect(parseStrict('1s')).toBe(1);
  });

  it('should convert ms to s', () => {
    expect(parseStrict('100ms')).toBe(0.1);
  });

  it('should convert y to s', () => {
    expect(parseStrict('1y')).toBe(31557600);
  });

  it('should work with decimals', () => {
    expect(parseStrict('1.5h')).toBe(5400);
  });

  it('should work with multiple spaces', () => {
    expect(parseStrict('1   s')).toBe(1);
  });

  it('should return NaN if invalid', () => {
    // @ts-expect-error - We expect this to throw.
    expect(Number.isNaN(parseStrict('☃'))).toBe(true);
    // @ts-expect-error - We expect this to throw.
    expect(Number.isNaN(parseStrict('10-.5'))).toBe(true);
    // @ts-expect-error - We expect this to throw.
    expect(Number.isNaN(parseStrict('s'))).toBe(true);
  });

  it('should be case-insensitive', () => {
    expect(parseStrict('1.5H')).toBe(5400);
  });

  it('should work with numbers starting with .', () => {
    expect(parseStrict('.5s')).toBe(0.5);
  });

  it('should work with negative integers', () => {
    expect(parseStrict('-100s')).toBe(-100);
  });

  it('should work with negative decimals', () => {
    expect(parseStrict('-1.5h')).toBe(-5400);
    expect(parseStrict('-10.5h')).toBe(-37800);
  });

  it('should work with negative decimals starting with "."', () => {
    expect(parseStrict('-.5h')).toBe(-1800);
  });
});

// long strings

describe('parseStrict(long string)', () => {
  it('should not throw an error', () => {
    expect(() => {
      parseStrict('53 seconds');
    }).not.toThrow();
  });

  it('should convert milliseconds to s', () => {
    expect(parseStrict('53 milliseconds')).toBe(0.053);
  });

  it('should convert msecs to s', () => {
    expect(parseStrict('17 msecs')).toBe(0.017);
  });

  it('should convert sec to s', () => {
    expect(parseStrict('1 sec')).toBe(1);
  });

  it('should convert from min to s', () => {
    expect(parseStrict('1 min')).toBe(60);
  });

  it('should convert from hr to s', () => {
    expect(parseStrict('1 hr')).toBe(3600);
  });

  it('should convert days to s', () => {
    expect(parseStrict('2 days')).toBe(172800);
  });

  it('should convert weeks to s', () => {
    expect(parseStrict('1 week')).toBe(604800);
  });

  it('should convert years to s', () => {
    expect(parseStrict('1 year')).toBe(31557600);
  });

  it('should work with decimals', () => {
    expect(parseStrict('1.5 hours')).toBe(5400);
  });

  it('should work with negative integers', () => {
    expect(parseStrict('-100 seconds')).toBe(-100);
  });

  it('should work with negative decimals', () => {
    expect(parseStrict('-1.5 hours')).toBe(-5400);
  });

  it('should work with negative decimals starting with "."', () => {
    expect(parseStrict('-.5 hr')).toBe(-1800);
  });
});

// invalid inputs

describe('parseStrict(invalid inputs)', () => {
  it('should throw an error, when parseStrict("")', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict('');
    }).toThrow();
  });

  it('should throw an error, when parseStrict("...>100 length string...")', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict('▲'.repeat(101));
    }).toThrow();
  });

  it('should throw an error, when parseStrict(undefined)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict(undefined);
    }).toThrow();
  });

  it('should throw an error, when parseStrict(null)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict(null);
    }).toThrow();
  });

  it('should throw an error, when parseStrict([])', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict([]);
    }).toThrow();
  });

  it('should throw an error, when parseStrict({})', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict({});
    }).toThrow();
  });

  it('should throw an error, when parseStrict(NaN)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict(NaN);
    }).toThrow();
  });

  it('should throw an error, when parseStrict(Infinity)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict(Infinity);
    }).toThrow();
  });

  it('should throw an error, when parseStrict(-Infinity)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict(-Infinity);
    }).toThrow();
  });
});
