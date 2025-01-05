import { multiMap } from "./multiMap";

/**
 * Memoizes a function
 * @param func Function to memoize
 */
export function memoize<Args extends (symbol | number | string)[], Return>(
	func: (...args: Args) => Return
): (...args: Args) => Return;
/**
 * Memoizes a function
 * @param func Function to memoize
 * @param keyMap Maps arguments of the function which aren't natrually usable as keys to keys for the memoization cache
 */
export function memoize<Args extends any[], Return>(
	func: (...args: Args) => Return,
	keyMap: {
		[K in keyof Args]: Args[K] extends symbol | number | string
			? undefined | ((val: Args[K], context: Args) => symbol | number | string)
			: (val: Args[K], context: Args) => symbol | number | string;
	}
): (...args: Args) => Return;
export function memoize<Args extends any[], Return>(
	func: (...args: Args) => Return,
	keyMap?: {
		[K in keyof Args]: Args[K] extends symbol | number | string
			? undefined | ((val: Args[K], context: Args) => symbol | number | string)
			: (val: Args[K], context: Args) => symbol | number | string;
	}
): (...args: Args) => Return {
	const cache = multiMap<Return>(func.length);

	return (...args: Args) => {
		let keys: (symbol | number | string)[];
		if (!keyMap) keys = args;
		else keys = keyMap.map((fn, idx) => fn?.(args[idx], args) ?? args[idx]);

		const has = cache.get(...keys);
		if (has !== undefined) return has;

		const shouldHave = func(...args);
		cache.set(keys, shouldHave);
		return shouldHave;
	};
}
