export class ElfRangeError extends Error {
	constructor(message?: string) {
		super(message);
	}
}

/**
 * Defines a inclusive range between two integers
 *
 * Can be used as an iterator
 */
export class Range implements Iterable<number> {
	readonly start: number;
	readonly end: number;

	/**
	 * Creates a new range
	 */
	constructor(
		/**
		 * Integer, must be less than or equal to `end`
		 */
		start: number,
		/**
		 * Integer, must be greater than or equal to `start`
		 */
		end: number
	) {
		if (!Number.isInteger(start)) throw new ElfRangeError("`start` is not an integer");
		if (!Number.isInteger(end)) throw new ElfRangeError("`end` is not an integer");
		if (start > end) throw new ElfRangeError("`start` is greater than `end`");

		this.start = start;
		this.end = end;
	}

	/**
	 * Numbers included in the range
	 */
	get size() {
		return this.end - this.start + 1;
	}

	/**
	 * Checks if the provided `value` is within this range
	 */
	contains(value: number): boolean;
	/**
	 * Checks if the provided `range` is entirerly within this range
	 */
	contains(range: Range): boolean;
	contains(target: number | Range): boolean {
		if (target instanceof Range) {
			return this.start <= target.start && target.end <= this.end;
		}
		return this.start <= target && target <= this.end;
	}

	/**
	 * Checks if the provided `range` overlaps in any way with this range
	 */
	overlaps(range: Range, detailed?: false): boolean;
	/**
	 * Checks how the provided `range` overlaps with this range
	 *
	 * If there is any overlap returns an object describing the exact overlap, otherwise `null`
	 */
	overlaps(range: Range, detailed: true): { contained: Range; outside?: Range[] } | null;
	overlaps(
		range: Range,
		detailed: boolean = false
	): boolean | { contained: Range; outside?: Range[] } | null {
		if (!detailed) return this.contains(range.start) || this.contains(range.end);

		if (this.contains(range)) return { contained: range.__copy__ };
		if (this.contains(range.start))
			return {
				contained: new Range(range.start, this.end),
				outside: [new Range(this.end + 1, range.end)],
			};
		if (this.contains(range.end))
			return {
				contained: new Range(this.start, range.end),
				outside: [new Range(range.start, this.start - 1)],
			};
		if (range.contains(this)) {
			return {
				contained: this.__copy__,
				outside: [new Range(range.start, this.start - 1), new Range(this.end + 1, range.end)],
			};
		}

		return null;
	}

	*[Symbol.iterator]() {
		for (let i = this.start; i <= this.end; i++) yield i;
	}

	private get __copy__() {
		return new Range(this.start, this.end);
	}
}

export function range(start: number, end: number) {
	return new Range(start, end);
}
