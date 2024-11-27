export class ElfMathError extends Error {
	constructor(message?: string) {
		super(message);
	}
}

/**
 * Returns the sum of a list of numbers
 * @returns Sum
 */
export function sum(...numbers: number[]) {
	return numbers.reduce((prev, curr) => prev + curr, 0);
}

/**
 * Returns the product of  a list of numbers
 * @returns Product
 */
export function product(...numbers: number[]) {
	return numbers.reduce((prev, curr) => prev * curr, 1);
}

/**
 * Finds the greatest common devisor for two integers
 * @throws `ElfMathError` if either of the parameters isn't an integer
 */
export function gcd(a: number, b: number): number {
	if (!Number.isInteger(a)) throw new ElfMathError("`a` is not an integer");
	if (!Number.isInteger(b)) throw new ElfMathError("`b` is not an integer");

	a = Math.abs(a);
	b = Math.abs(b);
	while (b) {
		let temp = b;
		b = a % b;
		a = temp;
	}
	return a;
}

/**
 * Finds the lowest common multiple for two integers
 * @throws `ElfMathError` if either of the parameters isn't an integer
 */
export function lcm(a: number, b: number) {
	if (!Number.isInteger(a)) throw new ElfMathError("`a` is not an integer");
	if (!Number.isInteger(b)) throw new ElfMathError("`b` is not an integer");

	return Math.abs(a * b) / gcd(a, b);
}

/**
 * Returns the factorial value of a number
 * @param n A positive integer
 * @returns Factorial of number
 * @throws When `n` is not a positive integer
 */
export function factorial(n: number): number {
	if (!Number.isInteger(n) || n < 0) throw new ElfMathError(`${n} is not a positive integer`);

	let fac = 1;
	for (let i = n; i > 0; i--) fac *= i;

	return fac;
}

/**
 * Returns all divisors of a number
 * @param n A positive integer
 * @returns Array containing all divisors
 * @throws When `n` is not a positive integer
 */
export function divisors(n: number) {
	if (!Number.isInteger(n) || n < 0) throw new ElfMathError(`${n} is not a positive integer`);
	const divisors = new Set<number>();
	for (let i = 1; i <= Math.sqrt(n); i++) {
		if (n % i === 0) {
			divisors.add(i);
			divisors.add(n / i);
		}
	}
	return Array.from(divisors);
}

export class ElfMatrixError extends Error {
	constructor(message?: string) {
		super(message);
	}
}

export class Matrix {
	private __definition__: number[][];
	private readonly __height__: number;
	private readonly __width__: number;

	constructor(definition: number[][]) {
		const height = definition.length;
		if (height < 1) throw new ElfMatrixError("Matrix must have height");
		const width = definition[0].length;
		if (width < 1) throw new ElfMatrixError("Matrix must have width");

		if (height < 2 && width < 2) throw new ElfMatrixError("Matrix cannot be 1x1");

		this.__definition__ = definition;
		this.__height__ = height;
		this.__width__ = width;
	}

	/**
	 * Gets the value of the matrix at a given position
	 */
	get(x: number, y: number): number {
		return this.__definition__[y]?.[x];
	}

	/**
	 * Checks if the matrix's width and height is equal
	 */
	get isSquare(): boolean {
		return this.width === this.height;
	}

	/**
	 * Verifies that the matrix is valid, i.e. that all rows have the same width
	 */
	validate(): boolean {
		for (const row of this.__definition__) {
			if (row.length !== this.__width__) return false;
		}
		return true;
	}

	/**
	 * Finds the determinant of the matrix
	 * @throws `ElfMatrixError` if the matrix isn't square
	 */
	determinant(): number {
		if (!this.isSquare) throw new ElfMatrixError("Cannot find determinant of non-square matrix");

		if (this.__height__ === 2 && this.__width__ === 2) {
			return this.get(0, 0) * this.get(1, 1) - this.get(0, 1) * this.get(1, 0);
		}

		let sum = 0;
		for (let i = 0; i < this.__definition__.length; i++) {
			const matrixDefinition = [
				...this.__definition__.slice(0, i).map((row) => row.slice(1)),
				...this.__definition__.slice(i + 1).map((row) => row.slice(1)),
			];

			sum +=
				(i % 2 ? -1 : 1) * this.__definition__[i][0] * new Matrix(matrixDefinition).determinant();
		}

		return sum;
	}

	/**
	 * Height of the matrix
	 */
	get height() {
		return this.__height__;
	}

	/**
	 * Wdith of the matrix
	 */
	get width() {
		return this.__width__;
	}
}

export function matrix(definition: number[][]) {
	return new Matrix(definition);
}
