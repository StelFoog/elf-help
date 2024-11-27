type GetNumbersOptions = {
	/** @default true */
	allowNegativeNumbers?: boolean;
	/** @default true */
	allowDecimalNumbers?: boolean;
	/** Additional chars to split numbers on */
	alsoSplitOn?: string | string[];
};

/**
 * Gets all numbers from a string
 * @param options Options for what numbers are retrieved
 */
export function parseNumbers(str: string, options: GetNumbersOptions = {}): number[] {
	const additionalSplits = !options.alsoSplitOn
		? []
		: typeof options.alsoSplitOn === "string"
			? [options.alsoSplitOn]
			: options.alsoSplitOn;
	let mem = "";
	let res: number[] = [];
	for (const char of str) {
		if (char.match(/\s/) || additionalSplits.includes(char)) {
			if (!mem) continue;
			const num = Number(mem);
			const isNegative = mem[0] === "-";
			mem = "";
			if (Number.isNaN(num)) continue;
			if (options.allowDecimalNumbers === false && !Number.isInteger(num)) continue;
			if (options.allowNegativeNumbers === false && isNegative) continue;
			res.push(num);
		} else {
			mem += char;
		}
	}

	if (mem) {
		const num = Number(mem);
		if (!Number.isNaN(num)) res.push(num);
	}

	return res;
}
