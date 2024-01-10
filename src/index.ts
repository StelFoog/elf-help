import {
	coord,
	isCoordinate2D,
	isCoordinate3D,
	isLine2D,
	isLine3D,
	line,
	linesIntersect2D,
} from './cartesian';
import { Fraction, fraction } from './fraction';
import { gcd, lcm, Matrix, matrix } from './math';
import { Range, range } from './range';

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
	gcd,
	lcm,
	Matrix,
	matrix,
	Range,
	range,
};

export * from './cartesian';
export * from './fraction';
export * from './math';
export * from './range';

export default elf;
