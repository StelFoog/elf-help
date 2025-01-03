import elf from "../src";

describe("parseNumbers", () => {
	test("Fly 14 km/s for 10 seconds, rest for 127 seconds", () => {
		expect(elf.parseNumbers("Fly 14 km/s for 10 seconds, rest for 127 seconds")).toEqual([
			14, 10, 127,
		]);
	});

	test("4   -3.1    -6  .968", () => {
		expect(elf.parseNumbers("4   -3.1    -6  .968")).toEqual([4, -3.1, -6, 0.968]);
	});

	test("Disallow negative numbers", () => {
		expect(elf.parseNumbers("4 -2.5 -0 0", { allowNegativeNumbers: false })).toEqual([4, 0]);
	});

	test("Disallow decimal numbers", () => {
		expect(elf.parseNumbers("-4 .25 .0", { allowDecimalNumbers: false })).toEqual([-4, 0]);
	});

	test("Also split on single", () => {
		expect(elf.parseNumbers("4x5", { alsoSplitOn: "x" })).toEqual([4, 5]);
	});

	test("Also split on multiple", () => {
		expect(elf.parseNumbers("4x5=20", { alsoSplitOn: ["x", "="] })).toEqual([4, 5, 20]);
	});
});
