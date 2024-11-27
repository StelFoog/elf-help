export class ElfIterateError extends Error {
	constructor(message?: string) {
		super(message);
	}
}

/**
 * Returns all possible permutations of an array
 * @param list Array which to permute
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

export function rotate<T>(list: T[], n: number): T[] {
	if (!Number.isInteger(n)) throw new ElfIterateError(`n=${n} is not an integer`);
	return list.map((_, idx) => {
		const pos = (idx - n) % list.length;
		return list[pos < 0 ? list.length + pos : pos];
	});
}
