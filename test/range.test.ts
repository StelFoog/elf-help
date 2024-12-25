import elf, { ElfRangeError } from "../src";

describe("new Range", () => {
	test("Create new Range", () => {
		expect(new elf.Range(1, 2)).toBeInstanceOf(elf.Range);
	});

	test("Throws ElfRangeError when start is not integer", () => {
		expect(() => elf.range(Math.PI, 0)).toThrow(ElfRangeError);
	});
	test("Throws ElfRangeError when end is not integer", () => {
		expect(() => elf.range(0, Math.PI)).toThrow(ElfRangeError);
	});

	test("Throws ElfRangeError when start > end", () => {
		expect(() => elf.range(1, 0)).toThrow(ElfRangeError);
	});
});

describe("Range.size", () => {
	test("Gets correct size", () => {
		expect(elf.range(1, 4).size).toBe(4);
		expect(elf.range(1, 1).size).toBe(1);
	});
});

describe("Range.contains", () => {
	const range = new elf.Range(-1, 4);

	test("value is contained", () => {
		expect(range.contains(-1)).toBe(true);
		expect(range.contains(4)).toBe(true);

		expect(elf.range(1, 1).contains(1)).toBe(true);
	});
	test("value is not contained", () => {
		expect(range.contains(10)).toBe(false);
		expect(range.contains(-2)).toBe(false);

		expect(elf.range(1, 1).contains(2)).toBe(false);
	});

	test("range is contained", () => {
		expect(range.contains(elf.range(1, 2))).toBe(true);
		expect(range.contains(elf.range(-1, 2))).toBe(true);
		expect(range.contains(elf.range(1, 4))).toBe(true);
		expect(range.contains(elf.range(1, 1))).toBe(true);

		expect(new elf.Range(1, 1).contains(new elf.Range(1, 1))).toBe(true);
	});
	test("range is not contained", () => {
		expect(range.contains(elf.range(-8, -3))).toBe(false);
		expect(range.contains(elf.range(5, 9))).toBe(false);

		expect(range.contains(elf.range(1, 9))).toBe(false);
		expect(range.contains(elf.range(-3, 3))).toBe(false);
		expect(range.contains(elf.range(-2, 9))).toBe(false);
	});
});

describe("Range.overlaps", () => {
	test("range does overlap", () => {
		expect(new elf.Range(1, 3).overlaps(elf.range(2, 4))).toBe(true);
	});
	test("range does not overlap", () => {
		expect(new elf.Range(1, 3).overlaps(elf.range(4, 6))).toBe(false);
	});

	const range = new elf.Range(-5, 5);

	test("(Detailed) range is contained", () => {
		expect(range.overlaps(elf.range(-1, 4), true)).toEqual({ contained: elf.range(-1, 4) });
	});
	test("(Detailed) range overlaps left", () => {
		expect(range.overlaps(elf.range(-9, -5), true)).toEqual({
			contained: elf.range(-5, -5),
			outside: [elf.range(-9, -6)],
		});
	});
	test("(Detailed) range overlaps right", () => {
		expect(range.overlaps(elf.range(2, 6), true)).toEqual({
			contained: elf.range(2, 5),
			outside: [elf.range(6, 6)],
		});
	});
	test("(Detailed) contained by range", () => {
		expect(range.overlaps(elf.range(-8, 9), true)).toEqual({
			contained: elf.range(-5, 5),
			outside: [elf.range(-8, -6), elf.range(6, 9)],
		});
	});
	test("(Detailed) range does not overlap", () => {
		expect(range.overlaps(elf.range(6, 7), true)).toBeNull();
	});
});

describe("Range[Symbol.iterator]", () => {
	test("Can iterate over", () => {
		const range = elf.range(0, 5);
		let i = 0;
		for (const val of range) {
			expect(val).toBe(i++);
		}
	});
});
