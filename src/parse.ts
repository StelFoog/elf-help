type GetNumbersOptions = {
	/** @default true */
	allowNegativeNumbers?: boolean;
	/** @default true */
	allowDecimalNumbers?: boolean;
};

/**
 * Gets all numbers from a string
 * @param options Options for what numbers are retrieved
 */
export function parseNumbers(str: string, options: GetNumbersOptions = {}): number[] {
	let mem = "";
	let res: number[] = [];
	for (const char of str) {
		if (
			char.match(/\s/) ||
			(options.allowNegativeNumbers === false && char === "-") ||
			(options.allowDecimalNumbers === false && char === ".")
		) {
			if (!mem) continue;
			const num = Number(mem);
			mem = "";
			if (!Number.isNaN(num)) res.push(num);
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
