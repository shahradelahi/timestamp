import {
  DAY_IN_S,
  HOUR_IN_S,
  MINUTE_IN_S,
  MONTH_IN_S,
  SECOND_IN_MS,
  WEEK_IN_S,
  YEAR_IN_S,
} from '@/constants';
import { StringValue } from '@/typings';

const unitMap = new Map<string, number>([
  ['years', YEAR_IN_S],
  ['year', YEAR_IN_S],
  ['yrs', YEAR_IN_S],
  ['yr', YEAR_IN_S],
  ['y', YEAR_IN_S],
  ['months', MONTH_IN_S],
  ['month', MONTH_IN_S],
  ['mo', MONTH_IN_S],
  ['weeks', WEEK_IN_S],
  ['week', WEEK_IN_S],
  ['w', WEEK_IN_S],
  ['days', DAY_IN_S],
  ['day', DAY_IN_S],
  ['d', DAY_IN_S],
  ['hours', HOUR_IN_S],
  ['hour', HOUR_IN_S],
  ['hrs', HOUR_IN_S],
  ['hr', HOUR_IN_S],
  ['h', HOUR_IN_S],
  ['minutes', MINUTE_IN_S],
  ['minute', MINUTE_IN_S],
  ['mins', MINUTE_IN_S],
  ['min', MINUTE_IN_S],
  ['m', MINUTE_IN_S],
  ['seconds', 1],
  ['second', 1],
  ['secs', 1],
  ['sec', 1],
  ['s', 1],
  ['milliseconds', 1 / SECOND_IN_MS],
  ['millisecond', 1 / SECOND_IN_MS],
  ['msecs', 1 / SECOND_IN_MS],
  ['msec', 1 / SECOND_IN_MS],
  ['ms', 1 / SECOND_IN_MS],
]);

/**
 * Parse the given string and return seconds.
 *
 * @param str - A string to parse to seconds
 * @returns The parsed value in seconds, or `NaN` if the string can't be
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

  const { value, unit = 's' } = match.groups as {
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
 * Parse the given StringValue and return seconds.
 *
 * @param value - A typesafe StringValue to parse to seconds
 * @returns The parsed value in seconds, or `NaN` if the string can't be
 * parsed
 */
export function parseStrict(value: StringValue): number {
  return parse(value);
}
