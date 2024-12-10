import elf, { ElfIterateError } from "../src";

describe("permutations", () => {
	test("select from 3", () => {
		expect(elf.permutations([1, 2, 3])).toEqual([
			[1, 2, 3],
			[1, 3, 2],
			[2, 1, 3],
			[2, 3, 1],
			[3, 1, 2],
			[3, 2, 1],
		]);
	});

	test("select 2 from 3", () => {
		expect(elf.permutations([1, 2, 3], 2)).toEqual([
			[1, 2],
			[1, 3],
			[2, 1],
			[2, 3],
			[3, 1],
			[3, 2],
		]);
	});

	test("select from 7", () => {
		expect(elf.permutations([1, 2, 3, 4, 5, 6, 7]).length).toBe(elf.factorial(7));
	});

	test("select 1.1 from 3", () => {
		expect(() => elf.combinations([1], 1.1)).toThrow(ElfIterateError);
	});

	test("select -1 from 3", () => {
		expect(() => elf.permutations([1], -1)).toThrow(ElfIterateError);
	});

	test("select 4 from 3", () => {
		expect(() => elf.permutations([1], 4)).toThrow(ElfIterateError);
	});
});

describe("combinations", () => {
	test("select 2 from 3", () => {
		expect(elf.combinations([1, 2, 3], 2)).toEqual([
			[1, 2],
			[1, 3],
			[2, 3],
		]);
	});

	test("select 1 from 3", () => {
		expect(elf.combinations([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
	});

	test("select from 3", () => {
		expect(elf.combinations([1, 2, 3])).toEqual([[1, 2, 3]]);
	});

	test("select 2 from 8", () => {
		expect(
			elf.combinations(
				Array.from({ length: 8 }, (_, idx) => idx + 1),
				2
			).length
		).toBe(elf.factorial(8) / (elf.factorial(2) * elf.factorial(8 - 2)));
	});

	test("select 1.1 from 3", () => {
		expect(() => elf.combinations([1], 1.1)).toThrow(ElfIterateError);
	});

	test("select -1 from 3", () => {
		expect(() => elf.combinations([1], -1)).toThrow(ElfIterateError);
	});

	test("select 4 from 3", () => {
		expect(() => elf.combinations([1], 4)).toThrow(ElfIterateError);
	});
});

describe("rotate", () => {
	test("rotate 5 by 2", () => {
		expect(elf.rotate([1, 2, 3, 4, 5], 2)).toEqual([4, 5, 1, 2, 3]);
	});

	test("rotate 5 by -2", () => {
		expect(elf.rotate([1, 2, 3, 4, 5], -2)).toEqual([3, 4, 5, 1, 2]);
	});

	test("rotate 5 by 501", () => {
		expect(elf.rotate([1, 2, 3, 4, 5], 501)).toEqual([5, 1, 2, 3, 4]);
	});

	test("rotate 5 by 0.1", () => {
		expect(() => elf.rotate([1, 2, 3, 4, 5], 0.1)).toThrow(ElfIterateError);
	});
});

describe("zip", () => {
	test('zip [1, 2, 3] and ["a", "b", "c"]', () => {
		expect(elf.zip([1, 2, 3], ["a", "b", "c"])).toEqual([
			[1, "a"],
			[2, "b"],
			[3, "c"],
		]);
	});

	test("zip [1, 2, 3] and [1]", () => {
		expect(() => elf.zip([1, 2, 3], [1])).toThrow(ElfIterateError);
	});
});

describe("count", () => {
	test("count [1, 2, 3, 4, 5, 1, 2, 3, 1]", () => {
		expect(elf.count([1, 2, 3, 4, 5, 1, 2, 3, 1])).toEqual({ 1: 3, 2: 2, 3: 2, 4: 1, 5: 1 });
	});
});
