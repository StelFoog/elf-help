# Elf Help

Your very own helper elf; tools and functions to help with problems encoutered during advent of code.

## Usage

All _major_ features can be accessed through the default `elf` import:

```ts
import elf from 'elf-help';
```

All _major_ and _minor_ features can also be accessed as named imports:

```ts
import { linesIntersect2D, ElfCartesianError } from 'elf-help';
```

## Features

### Cartesian

| Feature             | Description                                                                           |
| ------------------- | ------------------------------------------------------------------------------------- |
| `coord`             | Creates a coordinate object, either 2D or 3D                                          |
| `coordinate`        | Clone of the `coord` function (only available through default import)                 |
| `isCoordinate2D`    | Verifies that an object is of the `Coordinate2D` type                                 |
| `isCoordinate3D`    | Verifies that an object is of the `Coordinate3D` type                                 |
| `line`              | Create a line object, either 2D or 3D                                                 |
| `isLine2D`          | Verifies that an object is of the `Line2D` type                                       |
| `isLine3D`          | Verifies that an object is of the `Line3D` type                                       |
| `linesIntersect2D`  | Checks if 2 lines intersect in a 2D plane (3D lines can be evaluated on the xy plane) |
| `ElfCartesianError` | Error thrown by cartesian features                                                    |

| Type           | Description                  |
| -------------- | ---------------------------- |
| `Dimention2D`  | The dimentions of a 2D space |
| `Dimention3D`  | The dimentions of a 3D space |
| `Coordinate2D` | A 2 dimentional coordinate   |
| `Coordinate3D` | A 3 dimentional coordinate   |
| `Line2D`       | A 2 dimentional line         |
| `Line3D`       | A 3 dimentional line         |

### Math

| Feature              | Description                                                                        |
| -------------------- | ---------------------------------------------------------------------------------- |
| `gcd`                | Finds the Greatest Common Divisor of two numbers                                   |
| `lcm`                | Finds the Lowest Common Multiple of two numbers                                    |
| `new Matrix`         | Creates a new `Matrix` object                                                      |
| `matrix`             | Clone of `new Matrix`                                                              |
| `Matrix.get`         | Gets the element of a matrix for a given `x` and `y`                               |
| `Matrix.isSquare`    | If the matrix width is equal to the height                                         |
| `Matrix.validate`    | Validates that the matrix has the same width for all rows (i.e. is a valid matrix) |
| `Matrix.determinant` | Finds the determinant of a square matrix                                           |
| `ElfMathError`       | Error thrown by math functions                                                     |
| `ElfMatrixError`     | Error thrown by matrix functions                                                   |

### Range

| Feature          | Description                                                                            |
| ---------------- | -------------------------------------------------------------------------------------- |
| `new Range`      | Creates a new `Range` object                                                           |
| `range`          | Clone of `new Range`                                                                   |
| `Range.size`     | The number of elements included in the range                                           |
| `Range.size`     | The number of elements included in the range                                           |
| `Range.contains` | Checks if a `number` or `Range` is within the range                                    |
| `Range.overlaps` | Checks if a `Range` overlaps with the range                                            |
|                  | Can optionally return a detailed object with what's contained and outside of the range |
| `ElfRangeError`  | Error thrown by range functions                                                        |