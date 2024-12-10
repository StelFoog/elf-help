import {
	coord,
	isCoordinate2D,
	isCoordinate3D,
	isLine2D,
	isLine3D,
	line,
	linesIntersect2D,
} from "./cartesian";
import { Fraction, fraction } from "./fraction";
import { combinations, permutations, rotate, zip, count } from "./iterate";
import { gcd, lcm, factorial, divisors, Matrix, matrix, sum, product } from "./math";
import { parseNumbers } from "./parse";
import { Range, range } from "./range";

const elf = {
	coord,
	coordinate: coord,
	isCoordinate2D,
	isCoordinate3D,
	isLine2D,
	isLine3D,
	line,
	linesIntersect2D,
	Fraction,
	fraction,
	combinations,
	permutations,
	rotate,
	zip,
	count,
	sum,
	product,
	gcd,
	lcm,
	factorial,
	divisors,
	Matrix,
	matrix,
	parseNumbers,
	Range,
	range,
};

export * from "./cartesian";
export * from "./fraction";
export * from "./iterate";
export * from "./math";
export * from "./parse";
export * from "./range";

export default elf;
