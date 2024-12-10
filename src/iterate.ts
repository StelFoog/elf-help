export class ElfIterateError extends Error {
	constructor(message?: string) {
		super(message);
	}
}

/**
 * Returns all `n`-length permutations of an array
 * @param list Array which to permute
 * @param n Defaults to `list.length`
 */
export function permutations<T>(list: T[], n: number = list.length): T[][] {
	if (!Number.isInteger(n) || n < 0) throw new ElfIterateError(`n=${n} is not a positive integer`);
	if (list.length < n) throw new ElfIterateError("`n` cannot be larger than the length of `list`");
	return permute(list, n);
}

function permute<T>(arr: T[], n: number, mem: T[] = []): T[][] {
	const res: T[][] = [];
	const stateQueue: { arr: T[]; mem: T[] }[] = [{ arr, mem }];
	while (stateQueue.length) {
		const curr = stateQueue.shift()!;
		if (curr.mem.length >= n) {
			res.push(curr.mem);
			continue;
		}
		for (let i = 0; i < curr.arr.length; i++)
			stateQueue.push({
				arr: curr.arr.slice(0, i).concat(curr.arr.slice(i + 1)),
				mem: [...curr.mem, curr.arr[i]],
			});
	}

	return res;
}

/**
 * Returns all `n` length combinations of `list`
 * @param list List of items to select combinations from
 * @param n Defaults to `list.length`
 */
export function combinations<T>(list: T[], n: number = list.length): T[][] {
	if (!Number.isInteger(n) || n < 0) throw new ElfIterateError(`n=${n} is not a positive integer`);
	if (list.length < n) throw new ElfIterateError("`n` cannot be larger than the length of `list`");
	return combinate(list, n);
}

function combinate<T>(arr: T[], n: number, mem: T[] = []): T[][] {
	const res: T[][] = [];
	const stateQueue: { arr: T[]; mem: T[] }[] = [{ arr, mem }];
	while (stateQueue.length) {
		const curr = stateQueue.shift()!;
		if (curr.mem.length >= n) {
			res.push(curr.mem);
			continue;
		}
		for (let i = 0; i < curr.arr.length; i++)
			stateQueue.push({ arr: curr.arr.slice(i + 1), mem: [...curr.mem, curr.arr[i]] });
	}
	return res;
}

/**
 *
 * @param list List of items to rotate
 * @returns Copy of list rotated
 * @example
 * elf.rotate([1, 2, 3, 4, 5, 6], 2) // => [5, 6, 1, 2, 3, 4]
 *
 * elf.rotate([1, 2, 3, 4, 5, 6], -2) // => [3, 4, 5, 6, 1, 2]
 */
export function rotate<T>(list: T[], n: number): T[] {
	if (!Number.isInteger(n)) throw new ElfIterateError(`n=${n} is not an integer`);
	return list.map((_, idx) => {
		const pos = (idx - n) % list.length;
		return list[pos < 0 ? list.length + pos : pos];
	});
}

/**
 * Zips together two same-length arrays
 * @returns An array of tuples
 * @example
 * elf.zip([1, 2, 3], ["a", "b", "c"]) => [[1, "a"], [2, "b"], [3, "c"]]
 */
export function zip<T, S>(a: T[], b: S[]): [T, S][] {
	if (a.length !== b.length)
		throw new ElfIterateError(
			`Lengths of arrays a (${a.length}) and b (${b.length}) are not equal`
		);

	return a.map((v, idx) => [v, b[idx]]);
}

/**
 * Counts all elements of an array
 * @returns An object where the keys are the elements and the values are the occurances
 * @example
 * elf.count([1, 2, 3, 4, 5, 1, 2, 3, 1]) => { 1: 3, 2: 2, 3: 2, 4: 1, 5: 1 }
 */
export function count<T extends string | number | symbol>(list: T[]): Record<T, number> {
	const res = {} as Record<T, number>;
	list.forEach((v) => (res[v] = (res[v] ?? 0) + 1));
	return res;
}
