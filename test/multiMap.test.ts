import elf, { ElfMultiMapError } from "../src";

type Keys = [number, number];

describe("constructor", () => {
	test("depth 1", () => {
		const map = elf.multiMap(1);
		expect(map).toBeInstanceOf(elf.MultiMap);
		expect(map.depth).toBe(1);
		expect(map.size).toBe(0);
	});

	test("depth 2 with initial values", () => {
		const map = elf.multiMap<string, Keys>(2, [1, 1, "a"], [1, 2, "b"]);
		expect(map).toBeInstanceOf(elf.MultiMap);
		expect(map.depth).toBe(2);
		expect(map.size).toBe(2);
	});

	test("depth 1.1", () => {
		expect(() => elf.multiMap(1.1)).toThrow(ElfMultiMapError);
	});

	test("depth 0", () => {
		expect(() => elf.multiMap(0)).toThrow(ElfMultiMapError);
	});
});

describe("set", () => {
	test("set string", () => {
		const map = elf.multiMap<string, Keys>(2);
		map.set([1, 2], "a");
		map.set([1, 3], "b");
		expect(map.size).toBe(2);
		map.set([2, 1], "c");
		map.set([1, 2], "d");
		expect(map.size).toBe(3);
	});

	test("throws on invalid depth", () => {
		const map = elf.multiMap<string, Keys>(2);
		expect(() => map.set([1] as unknown as Keys, "a")).toThrow(ElfMultiMapError);
	});
});

describe("get", () => {
	test("get inital values", () => {
		const map = elf.multiMap<string, Keys>(2, [1, 1, "a"], [1, 2, "b"]);
		expect(map.get(1, 1)).toBe("a");
		expect(map.get(1, 2)).toBe("b");
	});

	test("get non-existant values", () => {
		const map = elf.multiMap<string, Keys>(2, [1, 1, "a"], [1, 2, "b"]);
		expect(map.get(1, 3)).toBeUndefined();
		expect(map.get(2, 1)).toBeUndefined();
	});

	test("throws on invalid depth", () => {
		const map = elf.multiMap<string, Keys>(2);
		expect(() => map.get(...([1] as unknown as Keys))).toThrow(ElfMultiMapError);
	});
});

describe("delete", () => {
	test("returns true for deleted keys", () => {
		const map = elf.multiMap<string, Keys>(2, [1, 1, "a"], [1, 2, "b"]);
		expect(map.size).toBe(2);
		expect(map.delete(1, 1)).toBe(true);
		expect(map.delete(1, 2)).toBe(true);
		expect(map.size).toBe(0);
	});

	test("returns false for non-existant keys", () => {
		const map = elf.multiMap<string, Keys>(2, [1, 1, "a"], [1, 2, "b"]);
		expect(map.size).toBe(2);
		expect(map.delete(1, 3)).toBe(false);
		expect(map.delete(2, 1)).toBe(false);
		expect(map.size).toBe(2);
	});
});
