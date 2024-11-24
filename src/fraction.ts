import { gcd, lcm } from './math';

export class ElfFractionError extends Error {
	constructor(message?: string) {
		super(message);
	}
}

/** Defines a fraction described by an integer numerator and an integer denominator */
export class Fraction {
	private _numerator: number;
	private _denominator: number;

	/**
	 * Creates a new fraction
	 * @param numerator integer numerator
	 * @throws `ElfFractionError` if numerator is non-integer
	 */
	constructor(numerator: number);
	/**
	 * Creates a new fraction
	 * @param numerator integer numerator
	 * @param denominator integer denominator
	 * @throws `ElfFractionError` if numerator or denominator is non-integer
	 */
	constructor(numerator: number, denominator?: number);
	constructor(numerator: number, denominator?: number) {
		if (!Number.isInteger(numerator))
			throw new ElfFractionError('Non integer numerator ' + numerator);
		this._numerator = numerator;

		if (typeof denominator === 'number' && !Number.isInteger(denominator))
			throw new ElfFractionError('Non integer denominator ' + denominator);
		this._denominator = denominator ?? 1;

		this.simplify();
	}

	private simplify() {
		const diff = gcd(this._numerator, this._denominator);
		if (diff < 2) return;
		this._numerator /= diff;
		this._denominator /= diff;
	}

	/**
	 * Adds this fration to another fraction or number
	 * @returns A new fraction with the resulting value
	 */
	add(that: Fraction | number): Fraction {
		if (typeof that === 'number')
			return new Fraction(
				this._numerator + that * this._denominator,
				this._denominator
				// this.shouldSimplify
			);

		const common = lcm(this._denominator, that._denominator);
		const thisNumerator = this._numerator * (common / this._denominator);
		const thatNumerator = that._numerator * (common / that._denominator);
		return new Fraction(
			thisNumerator + thatNumerator,
			common
			// this.shouldSimplify || that.shouldSimplify
		);
	}

	/**
	 * Subtracts another fraction or number from this fration
	 * @returns A new fraction with the resulting value
	 */
	subtract(that: Fraction | number): Fraction {
		if (typeof that === 'number')
			return new Fraction(
				this._numerator - that * this._denominator,
				this._denominator
				// this.shouldSimplify
			);

		const common = lcm(this._denominator, that._denominator);
		const thisNumerator = this._numerator * (common / this._denominator);
		const thatNumerator = that._numerator * (common / that._denominator);
		return new Fraction(
			thisNumerator - thatNumerator,
			common
			// this.shouldSimplify || that.shouldSimplify
		);
	}
	/**
	 * Subtracts another fraction or number from this fration
	 * @returns A new fraction with the resulting value
	 */
	sub(that: Fraction | number) {
		return this.subtract(that);
	}

	/**
	 * Multiplies this fration to another fraction or number
	 * @returns A new fraction with the resulting value
	 */
	multiply(that: Fraction | number): Fraction {
		if (typeof that === 'number')
			return new Fraction(this._numerator * that, this._denominator /* this.shouldSimplify */);

		return new Fraction(
			this._numerator * that._numerator,
			this._denominator * that._denominator
			// this.shouldSimplify || that.shouldSimplify
		);
	}
	/**
	 * Multiplies this fration to another fraction or number
	 * @returns A new fraction with the resulting value
	 */
	mul(that: Fraction | number) {
		return this.multiply(that);
	}

	/**
	 * Divides this fraction over another fraction or number
	 * @returns A new fraction with the resulting value
	 */
	divide(that: Fraction | number): Fraction {
		if (typeof that === 'number')
			return new Fraction(this._numerator, this._denominator * that /* this.shouldSimplify */);

		return new Fraction(
			this._numerator * that._denominator,
			this._denominator * that._numerator
			// this.shouldSimplify || that.shouldSimplify
		);
	}
	/**
	 * Divides this fraction over another fraction or number
	 * @returns A new fraction with the resulting value
	 */
	div(that: Fraction | number) {
		return this.divide(that);
	}

	/**
	 * The fraction as a number
	 */
	get value() {
		return this._numerator / this._denominator;
	}

	get numerator() {
		return this._numerator;
	}

	get denominator() {
		return this._denominator;
	}
}

/**
 * Creates a new fraction
 * @param numerator integer numerator
 * @throws `ElfFractionError` if numerator is non-integer
 */
export function fraction(numerator: number): Fraction;
/**
 * Creates a new fraction
 * @param numerator integer numerator
 * @param denominator integer denominator
 * @throws `ElfFractionError` if numerator or denominator is non-integer
 */
export function fraction(numerator: number, denominator?: number): Fraction;
export function fraction(numerator: number, denominator?: number) {
	return new Fraction(numerator, denominator);
}
