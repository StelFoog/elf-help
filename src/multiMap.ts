export class ElfMultiMapError extends Error {
	constructor(message?: string) {
		super(message);
	}
}

type DeepRecord<T> = { [key in string | number | symbol]?: DeepRecord<T> | T };

/**
 * A multi-layered map
 */
export class MultiMap<T, K extends (symbol | number | string)[] = (symbol | number | string)[]> {
	readonly depth: number;
	private _size: number;
	private map: DeepRecord<T>;

	/**
	 * @param depth Defines how many keys are required for modifying values
	 * @param initial Key-value pairs to initialize the map with
	 * @throws `ElfMultiMapError` if depth is not a positive integer
	 */
	constructor(depth: number, ...initial: [...K, T][]) {
		if (!Number.isInteger(depth)) throw new ElfMultiMapError("Depth must be an integer");
		if (depth < 1) throw new ElfMultiMapError("Depth cannot be less than 1");
		this.depth = depth;
		this.map = {};
		this._size = 0;
		for (const init of initial) {
			const keys = init.slice(0, -1) as K;
			this.set(keys, init[init.length - 1] as T);
		}
	}

	/**
	 * Sets a value to the corresponding set of keys
	 * @param keys Keys to the value
	 */
	set(keys: K, value: T) {
		if (keys.length !== this.depth)
			throw new ElfMultiMapError("Keys provided did noth match depth of map");

		let curr = this.map;
		for (let i = 0; i < keys.length - 1; i++) {
			const key = keys[i];
			if (!curr[key]) curr[key] = {};
			curr = curr[key]!;
		}
		if (curr[keys[keys.length - 1]] === undefined) this._size++;
		curr[keys[keys.length - 1]] = value;
	}

	/**
	 * Sets a value at the corresponding set of keys
	 * @param keys Keys to the value
	 */
	get(...keys: K): T | undefined {
		if (keys.length !== this.depth)
			throw new ElfMultiMapError("Keys provided did noth match depth of map");

		let curr = this.map;
		for (let i = 0; i < keys.length - 1; i++) {
			const key = keys[i];
			if (!curr[key]) return undefined;
			curr = curr[key]!;
		}
		return curr[keys[keys.length - 1]] as T | undefined;
	}

	/**
	 * Deletes a value at the corresponding set of keys
	 * @param keys Keys to the value
	 */
	delete(...keys: K): boolean {
		let curr = this.map;
		for (let i = 0; i < keys.length - 1; i++) {
			const key = keys[i];
			if (!curr[key]) return false;
			curr = curr[key]!;
		}
		if (curr[keys[keys.length - 1]] === undefined) return false;
		delete curr[keys[keys.length - 1]];
		this._size--;
		return true;
	}

	/**
	 * Amount of values currently stored in the map
	 */
	get size() {
		return this._size;
	}
}

/**
 * Creates a new MultiMap
 * @param depth defines how many keys are required for modifying values
 * @param initial Key-value pairs to initialize the map with
 * @returns A new instance of `MultiMap`
 * @throws `ElfMultiMapError` if depth is not a positive integer
 */
export function multiMap<T, K extends (symbol | number | string)[] = (symbol | number | string)[]>(
	depth: number,
	...initial: [...K, T][]
) {
	return new MultiMap<T, K>(depth, ...initial);
}
