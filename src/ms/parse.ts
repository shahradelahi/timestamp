import {
  DAY_IN_MS,
  HOUR_IN_MS,
  MINUTE_IN_MS,
  MONTH_IN_MS,
  SECOND_IN_MS,
  WEEK_IN_MS,
  YEAR_IN_MS,
} from '@/constants';
import { StringValue } from '@/typings';

const unitMap = new Map<string, number>([
  ['years', YEAR_IN_MS],
  ['year', YEAR_IN_MS],
  ['yrs', YEAR_IN_MS],
  ['yr', YEAR_IN_MS],
  ['y', YEAR_IN_MS],
  ['months', MONTH_IN_MS],
  ['month', MONTH_IN_MS],
  ['mo', MONTH_IN_MS],
  ['weeks', WEEK_IN_MS],
  ['week', WEEK_IN_MS],
  ['w', WEEK_IN_MS],
  ['days', DAY_IN_MS],
  ['day', DAY_IN_MS],
  ['d', DAY_IN_MS],
  ['hours', HOUR_IN_MS],
  ['hour', HOUR_IN_MS],
  ['hrs', HOUR_IN_MS],
  ['hr', HOUR_IN_MS],
  ['h', HOUR_IN_MS],
  ['minutes', MINUTE_IN_MS],
  ['minute', MINUTE_IN_MS],
  ['mins', MINUTE_IN_MS],
  ['min', MINUTE_IN_MS],
  ['m', MINUTE_IN_MS],
  ['seconds', SECOND_IN_MS],
  ['second', SECOND_IN_MS],
  ['secs', SECOND_IN_MS],
  ['sec', SECOND_IN_MS],
  ['s', SECOND_IN_MS],
  ['milliseconds', 1],
  ['millisecond', 1],
  ['msecs', 1],
  ['msec', 1],
  ['ms', 1],
]);

/**
 * Parse the given string and return milliseconds.
 *
 * @param str - A string to parse to milliseconds
 * @returns The parsed value in milliseconds, or `NaN` if the string can't be
 * parsed
 */
export function parse(str: string): number {
  if (typeof str !== 'string' || str.length === 0 || str.length > 100) {
    throw new Error(
      `Value provided to parse() must be a string with length between 1 and 99. value=${JSON.stringify(str)}`
    );
  }
  const match =
    /^(?<value>-?\d*\.?\d+) *(?<unit>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mo|years?|yrs?|y)?$/i.exec(
      str
    );

  if (!match?.groups) {
    return NaN;
  }

  const { value, unit = 'ms' } = match.groups as {
    value: string;
    unit: string | undefined;
  };

  const n = parseFloat(value);
  const multiplier = unitMap.get(unit.toLowerCase());

  if (multiplier === undefined) {
    throw new Error(`Unknown unit "${unit}" provided to parse(). value=${JSON.stringify(str)}`);
  }

  return n * multiplier;
}

/**
 * Parse the given StringValue and return milliseconds.
 *
 * @param value - A typesafe StringValue to parse to milliseconds
 * @returns The parsed value in milliseconds, or `NaN` if the string can't be
 * parsed
 */
export function parseStrict(value: StringValue): number {
  return parse(value);
}
