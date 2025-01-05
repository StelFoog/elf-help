import elf from "../src";

describe("memoize", () => {
	test("Returns working function", () => {
		const func = jest.fn((n: number) => `n=${n}`);
		const cached = elf.memoize(func);
		expect(cached(1)).toBe("n=1");
		expect(cached(2)).toBe("n=2");
		expect(func).toHaveBeenCalledTimes(2);
	});

	test("Memoizes single key", () => {
		const func = jest.fn((n: number) => `n=${n}`);
		const cached = elf.memoize(func);

		expect(cached(1)).toBe("n=1");
		expect(cached(2)).toBe("n=2");
		expect(cached(1)).toBe("n=1");
		expect(cached(2)).toBe("n=2");
		expect(func).toHaveBeenCalledTimes(2);
	});

	test("Memoizes multiple keys", () => {
		const func = jest.fn((n: number, a: string, b: string) => `${n}=${a}+${b}`);
		const cached = elf.memoize(func);

		expect(cached(1, "a", "a")).toBe("1=a+a");
		expect(cached(2, "a", "b")).toBe("2=a+b");
		expect(cached(1, "a", "a")).toBe("1=a+a");
		expect(cached(2, "a", "b")).toBe("2=a+b");
		expect(func).toHaveBeenCalledTimes(2);
	});

	test("Memoizes with keyMap", () => {
		const func = jest.fn((vals: number[]) => vals.reduce((prev, curr) => prev + curr));
		const cached = elf.memoize(func, [(val) => val.sort().join()]);

		expect(cached([1, 2])).toBe(3);
		expect(cached([1, 2, 3])).toBe(6);
		expect(cached([2, 1])).toBe(3);
		expect(cached([3, 1, 2])).toBe(6);
		expect(func).toHaveBeenCalledTimes(2);
	});

	test("Memoizes with partial keyMap", () => {
		const func = jest.fn((vals: number[], count: number) =>
			vals.reduce((prev, curr) => prev + curr)
		);
		const cached = elf.memoize(func, [(val) => val.sort().join(), undefined]);

		expect(cached([1, 2], 1)).toBe(3);
		expect(cached([2, 1], 2)).toBe(3);
		expect(cached([1, 2], 1)).toBe(3);
		expect(cached([2, 1], 2)).toBe(3);
		expect(func).toHaveBeenCalledTimes(2);
	});

	test("Memoizes with keyMap using context", () => {
		const func = jest.fn((range, time) => time % (range * 2));
		const cached = elf.memoize(func, [undefined, (val, [range]) => val % (range * 2)]);

		expect(cached(3, 7)).toBe(1);
		expect(cached(3, 13)).toBe(1);
		expect(func).toHaveBeenCalledTimes(1);
		expect(cached(2, 7)).toBe(3);
		expect(cached(2, 11)).toBe(3);
		expect(func).toHaveBeenCalledTimes(2);
	});
});
