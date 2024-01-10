export class ElfCartesianError extends Error {
	constructor(message?: string) {
		super(message);
	}
}

export type Dimention2D = 'x' | 'y';
export type Dimention3D = Dimention2D | 'z';

export type Coordinate2D = {
	x: number;
	y: number;
};
export type Coordinate3D = Coordinate2D & {
	z: number;
};

export function coord(x: number, y: number): Coordinate2D;
export function coord(x: number, y: number, z: number): Coordinate3D;
export function coord(...args: number[]): Coordinate2D | Coordinate3D {
	if (args.length === 2) return { x: args[0], y: args[1] };
	if (args.length === 3) return { x: args[0], y: args[1], z: args[2] };

	throw new ElfCartesianError('Invalid number of dimentions');
}

export function isCoordinate2D(coordinate: any): coordinate is Coordinate2D {
	const coord = coordinate as Coordinate2D;
	return (
		typeof coord === 'object' &&
		coord !== null &&
		typeof coord.x === 'number' &&
		typeof coord.y === 'number'
	);
}

export function isCoordinate3D(coordinate: any): coordinate is Coordinate2D {
	const coord = coordinate as Coordinate3D;
	return isCoordinate2D(coord) && typeof coord.z === 'number';
}

export type Line2D = {
	/** Start of the line */
	start: Coordinate2D;
	/** End of the line */
	end: Coordinate2D;
};
export type Line3D = {
	/** Start of the line */
	start: Coordinate3D;
	/** End of the line */
	end: Coordinate3D;
};

export function line(
	start: Coordinate2D | [number, number],
	end: Coordinate2D | [number, number]
): Line2D;
export function line(
	start: Coordinate3D | [number, number, number],
	end: Coordinate3D | [number, number, number]
): Line3D;
export function line(
	start: Coordinate2D | Coordinate3D | number[],
	end: Coordinate2D | Coordinate3D | number[]
): Line2D {
	return {
		start: Array.isArray(start) ? coord(...(start as [number, number, number])) : start,
		end: Array.isArray(end) ? coord(...(end as [number, number, number])) : end,
	};
}

export function isLine2D(line: any): line is Line2D {
	return (
		typeof line === 'object' &&
		line !== null &&
		isCoordinate2D(line.start) &&
		isCoordinate2D(line.end)
	);
}
export function isLine3D(line: any): line is Line3D {
	return (
		typeof line === 'object' &&
		line !== null &&
		isCoordinate3D(line.start) &&
		isCoordinate3D(line.end)
	);
}

/**
 * Checks that two 2D lines intersect with each other
 */
export function linesIntersect2D(a: Line2D, b: Line2D): boolean;
/**
 * Checks that thow 3D lines intersect with each other in a 2D plane
 */
export function linesIntersect2D(
	a: Line3D,
	b: Line3D,
	/**
	 * Dimention to remove from the 3D lines to force them into 2D
	 * @beta Removing any dimention other than `z` is experimental
	 */
	removeDimention?: Dimention3D
): boolean;
export function linesIntersect2D(
	a: Line2D | Line3D,
	b: Line2D | Line3D,
	removeDimention: Dimention3D = 'z'
): boolean {
	if (isLine3D(a) && isLine3D(b)) {
		return linesIntersect2D(
			removeDimentionFromLine3D(a, removeDimention),
			removeDimentionFromLine3D(b, removeDimention)
		);
	} else if (isLine2D(a) && isLine2D(b) && !isLine3D(a) && !isLine3D(b)) {
		if (isOnLine(a.start, b) || isOnLine(a.end, b) || isOnLine(b.start, a) || isOnLine(b.end, a))
			return true;
		return (
			isCounterClockwise(a.start, b.start, b.end) !== isCounterClockwise(a.end, b.start, b.end) &&
			isCounterClockwise(a.start, a.end, b.start) !== isCounterClockwise(a.start, a.end, b.end)
		);
	}

	throw new ElfCartesianError(
		'Both lines must be either of the type `Line2D` or the type `Line3D`'
	);
}

/**
 * Checks if the slope of the line AB is less than the slope of the line AC. I.e. the points are in
 * a counterclockwise order
 */
function isCounterClockwise(a: Coordinate2D, b: Coordinate2D, c: Coordinate2D) {
	return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
}

/**
 * Checks if a point is on a line
 */
function isOnLine(point: Coordinate2D, { start, end }: Line2D) {
	return (
		point.x <= Math.max(start.x, end.x) &&
		point.x >= Math.min(start.x, end.x) &&
		point.y <= Math.max(start.y, end.y) &&
		point.y >= Math.min(start.y, end.y)
	);
}

/**
 * Removes a dimention from a 3D line, converting it into a 2D line
 */
function removeDimentionFromLine3D(
	line: Line3D,
	/**
	 * Dimention to remove from the 3D lines to force them into 2D
	 * @beta Removing any dimention other than `z` is experimental
	 */
	dimention: Dimention3D
): Line2D {
	switch (dimention) {
		/* istanbul ignore next */
		case 'x':
			return { start: { x: line.start.z, y: line.start.y }, end: { x: line.end.z, y: line.end.y } };
		/* istanbul ignore next */
		case 'y':
			return { start: { x: line.start.x, y: line.start.z }, end: { x: line.end.x, y: line.end.x } };
		case 'z':
			return { start: { x: line.start.x, y: line.start.y }, end: { x: line.end.x, y: line.end.y } };
	}
}
