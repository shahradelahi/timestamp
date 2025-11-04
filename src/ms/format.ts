import {
  DAY_IN_MS,
  HOUR_IN_MS,
  MINUTE_IN_MS,
  MONTH_IN_MS,
  SECOND_IN_MS,
  WEEK_IN_MS,
  YEAR_IN_MS,
} from '@/constants';
import { Options, StringValue } from '@/typings';

/**
 * Pluralization helper.
 */
function plural(ms: number, msAbs: number, n: number, name: string): StringValue {
  const isPlural = msAbs >= n * 1.5;
  return `${Math.round(ms / n)} ${name}${isPlural ? 's' : ''}` as StringValue;
}

/**
 * Short format for `ms`.
 */
function fmtShort(ms: number): StringValue {
  const msAbs = Math.abs(ms);
  if (msAbs >= YEAR_IN_MS) {
    return `${Math.round(ms / YEAR_IN_MS)}y`;
  }
  if (msAbs >= MONTH_IN_MS) {
    return `${Math.round(ms / MONTH_IN_MS)}mo`;
  }
  if (msAbs >= WEEK_IN_MS) {
    return `${Math.round(ms / WEEK_IN_MS)}w`;
  }
  if (msAbs >= DAY_IN_MS) {
    return `${Math.round(ms / DAY_IN_MS)}d`;
  }
  if (msAbs >= HOUR_IN_MS) {
    return `${Math.round(ms / HOUR_IN_MS)}h`;
  }
  if (msAbs >= MINUTE_IN_MS) {
    return `${Math.round(ms / MINUTE_IN_MS)}m`;
  }
  if (msAbs >= SECOND_IN_MS) {
    return `${Math.round(ms / SECOND_IN_MS)}s`;
  }
  return `${ms}ms`;
}

/**
 * Long format for `ms`.
 */
function fmtLong(ms: number): StringValue {
  const msAbs = Math.abs(ms);
  if (msAbs >= YEAR_IN_MS) {
    return plural(ms, msAbs, YEAR_IN_MS, 'year');
  }
  if (msAbs >= MONTH_IN_MS) {
    return plural(ms, msAbs, MONTH_IN_MS, 'month');
  }
  if (msAbs >= WEEK_IN_MS) {
    return plural(ms, msAbs, WEEK_IN_MS, 'week');
  }
  if (msAbs >= DAY_IN_MS) {
    return plural(ms, msAbs, DAY_IN_MS, 'day');
  }
  if (msAbs >= HOUR_IN_MS) {
    return plural(ms, msAbs, HOUR_IN_MS, 'hour');
  }
  if (msAbs >= MINUTE_IN_MS) {
    return plural(ms, msAbs, MINUTE_IN_MS, 'minute');
  }
  if (msAbs >= SECOND_IN_MS) {
    return plural(ms, msAbs, SECOND_IN_MS, 'second');
  }
  return `${ms} ms`;
}

/**
 * Format the given integer as a string.
 *
 * @param ms - milliseconds
 * @param options - Options for the conversion
 * @returns The formatted string
 */
export function format(ms: number, options?: Options): string {
  if (typeof ms !== 'number' || !Number.isFinite(ms)) {
    throw new Error('Value provided to format() must be of type number.');
  }

  return options?.long ? fmtLong(ms) : fmtShort(ms);
}
