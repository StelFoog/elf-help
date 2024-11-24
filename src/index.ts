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
import {
	gcd,
	lcm,
	factorial,
	permutations,
	divisors,
	Matrix,
	matrix,
	combinations,
	sum,
	product,
} from "./math";
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
	sum,
	product,
	gcd,
	lcm,
	factorial,
	permutations,
	combinations,
	divisors,
	Matrix,
	matrix,
	parseNumbers,
	Range,
	range,
};

export * from "./cartesian";
export * from "./fraction";
export * from "./math";
export * from "./parse";
export * from "./range";

export default elf;
