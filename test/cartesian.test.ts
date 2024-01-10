import elf, { ElfCartesianError } from '../src';

describe('coord', () => {
	test('Create a 2D coordinate', () => {
		expect(elf.coord(1, 2)).toEqual({ x: 1, y: 2 });
	});
	test('Create a 3D coordinate', () => {
		expect(elf.coord(1, 2, 4)).toEqual({ x: 1, y: 2, z: 4 });
	});

	test('Throws ElfCartesianError for invalid dimentions', () => {
		// @ts-ignore
		expect(() => elf.coord(1)).toThrow(ElfCartesianError);
	});
});

describe('line', () => {
	test('Create a 2D line with existing cooridinates', () => {
		const start = { x: 4, y: 4 };
		const end = { x: 7, y: 4 };
		expect(elf.line(start, end)).toEqual({ start, end });
	});
	test('Create a 2D line with new cooridinates', () => {
		const start = { x: 4, y: 4 };
		const end = { x: 7, y: 4 };
		expect(elf.line([start.x, start.y], [end.x, end.y])).toEqual({ start, end });
	});

	test('Create a 3D line with existing cooridinates', () => {
		const start = { x: 4, y: 4, z: 4 };
		const end = { x: 7, y: 4, z: -4 };
		expect(elf.line(start, end)).toEqual({ start, end });
	});
	test('Create a 3D line with new cooridinates', () => {
		const start = { x: 4, y: 4, z: 4 };
		const end = { x: 7, y: 4, z: -4 };
		expect(elf.line([start.x, start.y, start.z], [end.x, end.y, end.z])).toEqual({ start, end });
	});
});

describe('isCoordinate2D', () => {
	test('Is a 2D coordinate', () => {
		expect(elf.isCoordinate2D({ x: 4, y: 3 })).toBe(true);
	});

	test('Not an object', () => {
		expect(elf.isCoordinate2D(5)).toBe(false);
	});
	test('Is null', () => {
		expect(elf.isCoordinate2D(null)).toBe(false);
	});
	test('coord.x is not a number', () => {
		expect(elf.isCoordinate2D({ x: '4' })).toBe(false);
	});
	test('coord.y is not a number', () => {
		expect(elf.isCoordinate2D({ x: 4, y: null })).toBe(false);
	});
});

describe('isCoordinate2D', () => {
	test('Is a 3D coordinate', () => {
		expect(elf.isCoordinate3D({ x: 4, y: 3, z: -1 })).toBe(true);
	});

	test('Not a 2D coordinate', () => {
		expect(elf.isCoordinate3D(null)).toBe(false);
	});
	test('coord.z is not a number', () => {
		expect(elf.isCoordinate3D({ x: 4, y: 5, z: [] })).toBe(false);
	});
});

describe('isLine2D', () => {
	test('Is a 2D line', () => {
		expect(elf.isLine2D({ start: { x: 4, y: 1 }, end: { x: 1, y: 1 } })).toBe(true);
	});

	test('Not an object', () => {
		expect(elf.isLine2D(4)).toBe(false);
	});
	test('Is null', () => {
		expect(elf.isLine2D(null)).toBe(false);
	});
	test('line.start is not a Coordinate2D', () => {
		expect(elf.isLine2D({ start: 4, end: { x: 1, y: 1 } })).toBe(false);
	});
	test('line.end is not a Coordinate2D', () => {
		expect(elf.isLine2D({ start: { x: 1, y: 1 }, end: 4 })).toBe(false);
	});
});

describe('isLine3D', () => {
	test('Is a 3D line', () => {
		expect(elf.isLine3D({ start: { x: 4, y: 1, z: 5 }, end: { x: 1, y: 1, z: 3 } })).toBe(true);
	});

	test('Not an object', () => {
		expect(elf.isLine3D(4)).toBe(false);
	});
	test('Is null', () => {
		expect(elf.isLine3D(null)).toBe(false);
	});
	test('line.start is not a Coordinate3D', () => {
		expect(elf.isLine3D({ start: 4, end: { x: 1, y: 1, z: 1 } })).toBe(false);
	});
	test('line.end is not a Coordinate3D', () => {
		expect(elf.isLine3D({ start: { x: 1, y: 1, z: 1 }, end: 4 })).toBe(false);
	});
});

describe('linesIntersect2D on 2D lines', () => {
	test('Lines intersect across', () => {
		expect(elf.linesIntersect2D(elf.line([1, 3], [5, 3]), elf.line([3, 2], [3, 6]))).toBe(true);
	});
	test('Lines overlap continusly', () => {
		expect(elf.linesIntersect2D(elf.line([1, 3], [5, 3]), elf.line([3, 3], [7, 3]))).toBe(true);
	});
	test('Lines overlap on a point', () => {
		expect(elf.linesIntersect2D(elf.line([1, 3], [5, 3]), elf.line([2.5, 3], [3.5, 4]))).toBe(true);
	});
	test('Lines have overlaping points', () => {
		expect(elf.linesIntersect2D(elf.line([1, 3], [5, 3]), elf.line([5, 3], [7, 5]))).toBe(true);
	});
	test('Lines intersect diagonally', () => {
		expect(elf.linesIntersect2D(elf.line([1, 3], [3, 1]), elf.line([1, 1], [6, 4]))).toBe(true);
	});

	test('Lines do not intersect parallel', () => {
		expect(elf.linesIntersect2D(elf.line([1, 3], [3, 1]), elf.line([0, 5], [4, 5]))).toBe(false);
	});
	test('Lines do not intersect across', () => {
		expect(elf.linesIntersect2D(elf.line([3, 3], [3, 1]), elf.line([1, 4], [8, 4]))).toBe(false);
	});
	test('Lines do not intersect near miss', () => {
		expect(elf.linesIntersect2D(elf.line([0, 3], [8, 3.5]), elf.line([0, 5], [4, 5]))).toBe(false);
	});
});

describe('linesIntersect2D on 3D lines', () => {
	test('3D lines intersect', () => {
		expect(
			elf.linesIntersect2D(elf.line([1, 3, 4], [5, 3, 4]), elf.line([1, 3, 5], [1, 3, 8]))
		).toBe(true);
	});
	test('3D lines do not intersect', () => {
		expect(
			elf.linesIntersect2D(elf.line([1, 3, 4], [5, 3, 4]), elf.line([1, 4, 5], [1, 4, 8]))
		).toBe(false);
	});
});

describe('linesIntersect2D throws ElfCartesianError', () => {
	test('Throws on 2D line a and 3D line b', () => {
		expect(() => {
			elf.linesIntersect2D(elf.line([1, 3], [5, 3]), elf.line([1, 3, 5], [1, 3, 6]));
		}).toThrow(ElfCartesianError);
	});
	test('Throws on 3D line a and 2D line b', () => {
		expect(() => {
			elf.linesIntersect2D(elf.line([1, 3, 4], [5, 3, 4]), elf.line([1, 3], [1, 3]));
		}).toThrow(ElfCartesianError);
	});
});
