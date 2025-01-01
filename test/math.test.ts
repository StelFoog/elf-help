import elf, { ElfMathError, ElfMatrixError } from "../src";

describe("sum", () => {
	test("1, 2, 3, 4", () => {
		expect(elf.sum(1, 2, 3, 4)).toBe(10);
	});
});

describe("product", () => {
	test("1, 2, 3, 4", () => {
		expect(elf.product(1, 2, 3, 4)).toBe(24);
	});
});

describe("mean", () => {
	test("7, 2, 0, 6, -5", () => {
		expect(elf.mean(7, 2, 0, 6, -5)).toBe(2);
	});

	test("1, 21, 46, 67", () => {
		expect(elf.mean(1, 21, 46, 67)).toBe(33.75);
	});

	test("empty mean input", () => {
		expect(() => elf.mean()).toThrow(ElfMathError);
	});
});

describe("median", () => {
	test("7, 2, 0, 6, -5", () => {
		expect(elf.median(7, 2, 0, 6, -5)).toBe(2);
	});

	test("7, 2, 0, 6, -5, 3", () => {
		expect(elf.median(7, 2, 0, 6, -5, 3)).toBe(2.5);
	});

	test("8", () => {
		expect(elf.median(8)).toBe(8);
	});

	test("empty median input", () => {
		expect(() => elf.median()).toThrow(ElfMathError);
	});
});

describe("gcd", () => {
	test("Returns greatest common divisor", () => {
		expect(elf.gcd(58, 16)).toBe(2);
		expect(elf.gcd(160, 56)).toBe(8);
		expect(elf.gcd(-21, 35)).toBe(7);
		expect(elf.gcd(7919, 6803)).toBe(1);
	});

	test("Throws ElfMathError if a is not an integer", () => {
		expect(() => elf.gcd(Math.PI, 5)).toThrow(ElfMathError);
	});
	test("Throws ElfMathError if b is not an integer", () => {
		expect(() => elf.gcd(5, Math.PI)).toThrow(ElfMathError);
	});
});

describe("lcm", () => {
	test("Returns least common multiple", () => {
		expect(elf.lcm(4, 5)).toBe(20);
		expect(elf.lcm(12, 106)).toBe(636);
		expect(elf.lcm(-20, 95)).toBe(380);
	});

	test("Throws ElfMathError if a is not an integer", () => {
		expect(() => elf.lcm(Math.PI, 5)).toThrow(ElfMathError);
	});
	test("Throws ElfMathError if b is not an integer", () => {
		expect(() => elf.lcm(5, Math.PI)).toThrow(ElfMathError);
	});
});

describe("factorial", () => {
	test("3!", () => {
		expect(elf.factorial(3)).toBe(6);
	});

	test("10!", () => {
		expect(elf.factorial(10)).toBe(3628800);
	});

	test("0!", () => {
		expect(elf.factorial(0)).toBe(1);
	});

	test("-1!", () => {
		expect(() => elf.factorial(-1)).toThrow(ElfMathError);
	});
	test("1.1!", () => {
		expect(() => elf.factorial(1.1)).toThrow(ElfMathError);
	});
});

describe("divisors", () => {
	test("9", () => {
		expect(elf.divisors(9).sort((a, b) => a - b)).toEqual([1, 3, 9]);
	});

	test("30", () => {
		expect(elf.divisors(30).sort((a, b) => a - b)).toEqual([1, 2, 3, 5, 6, 10, 15, 30]);
	});

	test("1200", () => {
		expect(elf.divisors(1200).length).toBe(30);
	});

	test("-1", () => {
		expect(() => elf.divisors(-1)).toThrow(ElfMathError);
	});

	test("1.1", () => {
		expect(() => elf.divisors(1.1)).toThrow(ElfMathError);
	});
});

describe("new Matrix", () => {
	test("Create new Matrix", () => {
		expect(new elf.Matrix([[1, 2]])).toBeInstanceOf(elf.Matrix);
	});

	test("Throws ElfMatrixError when height is less than 1", () => {
		expect(() => new elf.Matrix([])).toThrow(ElfMatrixError);
	});

	test("Throws ElfMatrixError when width is less than 1", () => {
		expect(() => new elf.Matrix([[]])).toThrow(ElfMatrixError);
	});

	test("Throws ElfMatrixError when matrix is 1x1", () => {
		expect(() => new elf.Matrix([[1]])).toThrow(ElfMatrixError);
	});
});

describe("Matrix.get", () => {
	const matrix = new elf.Matrix([
		[1, 2, 3, 4],
		[9, 8, 7, 6],
	]);

	test("Gets valid number from matrix", () => {
		expect(matrix.get(0, 0)).toBe(1);
		expect(matrix.get(0, 1)).toBe(9);
		expect(matrix.get(1, 0)).toBe(2);
		expect(matrix.get(3, 1)).toBe(6);
	});

	test("Returns undefined when x goes past width", () => {
		expect(matrix.get(4, 0)).toBeUndefined();
		expect(matrix.get(-1, 0)).toBeUndefined();
	});

	test("Returns undefined when y goes past height", () => {
		expect(matrix.get(0, 2)).toBeUndefined();
		expect(matrix.get(0, -1)).toBeUndefined();
	});
});

describe("Matrix.validate", () => {
	test("Valid matrix", () => {
		const matrix = new elf.Matrix([
			[1, 2, 3, 4],
			[9, 8, 7, 6],
		]);
		expect(matrix.validate()).toBe(true);
	});

	test("Invalid matrix", () => {
		const matrix = new elf.Matrix([
			[1, 2, 3, 4],
			[9, 8, 7, 6],
			[-5, -6],
		]);
		expect(matrix.validate()).toBe(false);
	});
});

describe("Matrix.determinant", () => {
	test("5 5 5 -5 0 0 -1 1 7 -8 2 6 9 8 7 6", () => {
		const matrix = new elf.Matrix([
			[5, 5, 5, -5],
			[0, 0, -1, 1],
			[7, -8, 2, 6],
			[9, 8, 7, 6],
		]);
		expect(matrix.determinant()).toBe(-935);
	});
	test("1 2 3 3 2 1 2 1 3", () => {
		const matrix = new elf.Matrix([
			[1, 2, 3],
			[3, 2, 1],
			[2, 1, 3],
		]);
		expect(matrix.determinant()).toBe(-12);
	});
	test("9 1 2 8", () => {
		const matrix = new elf.Matrix([
			[9, 1],
			[2, 8],
		]);
		expect(matrix.determinant()).toBe(70);
	});

	test("Throws ElfMatrixError for non-square matrix", () => {
		expect(() => {
			elf
				.matrix([
					[1, 2, 3],
					[1, 2, 3],
				])
				.determinant();
		}).toThrow(ElfMatrixError);
	});
});
