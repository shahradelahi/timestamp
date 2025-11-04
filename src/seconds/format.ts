import {
  DAY_IN_S,
  HOUR_IN_S,
  MINUTE_IN_S,
  MONTH_IN_S,
  SECOND_IN_MS,
  WEEK_IN_S,
  YEAR_IN_S,
} from '@/constants';
import { Options, StringValue } from '@/typings';

/**
 * Pluralization helper.
 */
function plural(s: number, sAbs: number, n: number, name: string): StringValue {
  const isPlural = sAbs >= n * 1.5;
  return `${Math.round(s / n)} ${name}${isPlural ? 's' : ''}` as StringValue;
}

/**
 * Short format for `sec`.
 */
function fmtShort(s: number): StringValue {
  const sAbs = Math.abs(s);
  if (sAbs >= YEAR_IN_S) {
    return `${Math.round(s / YEAR_IN_S)}y`;
  }
  if (sAbs >= MONTH_IN_S) {
    return `${Math.round(s / MONTH_IN_S)}mo`;
  }
  if (sAbs >= WEEK_IN_S) {
    return `${Math.round(s / WEEK_IN_S)}w`;
  }
  if (sAbs >= DAY_IN_S) {
    return `${Math.round(s / DAY_IN_S)}d`;
  }
  if (sAbs >= HOUR_IN_S) {
    return `${Math.round(s / HOUR_IN_S)}h`;
  }
  if (sAbs >= MINUTE_IN_S) {
    return `${Math.round(s / MINUTE_IN_S)}m`;
  }
  if (sAbs >= 1) {
    return `${Math.round(s)}s`;
  }
  return `${Math.round(s * SECOND_IN_MS)}ms`;
}

/**
 * Long format for `sec`.
 */
function fmtLong(s: number): StringValue {
  const sAbs = Math.abs(s);
  if (sAbs >= YEAR_IN_S) {
    return plural(s, sAbs, YEAR_IN_S, 'year');
  }
  if (sAbs >= MONTH_IN_S) {
    return plural(s, sAbs, MONTH_IN_S, 'month');
  }
  if (sAbs >= WEEK_IN_S) {
    return plural(s, sAbs, WEEK_IN_S, 'week');
  }
  if (sAbs >= DAY_IN_S) {
    return plural(s, sAbs, DAY_IN_S, 'day');
  }
  if (sAbs >= HOUR_IN_S) {
    return plural(s, sAbs, HOUR_IN_S, 'hour');
  }
  if (sAbs >= MINUTE_IN_S) {
    return plural(s, sAbs, MINUTE_IN_S, 'minute');
  }
  if (sAbs >= 1) {
    return plural(s, sAbs, 1, 'second');
  }
  return `${Math.round(s * SECOND_IN_MS)} ms`;
}

/**
 * Format the given integer as a string.
 *
 * @param s - seconds
 * @param options - Options for the conversion
 * @returns The formatted string
 */
export function format(s: number, options?: Options): string {
  if (typeof s !== 'number' || !Number.isFinite(s)) {
    throw new Error('Value provided to format() must be of type number.');
  }

  return options?.long ? fmtLong(s) : fmtShort(s);
}
