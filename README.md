# Elf Help

![Tests Status](https://img.shields.io/github/actions/workflow/status/StelFoog/elf-help/test.yml?style=flat&label=Tests)
![NPM Version](https://img.shields.io/npm/v/elf-help)
![NPM Last Update](https://img.shields.io/npm/last-update/elf-help)
![License](https://img.shields.io/github/license/StelFoog/elf-help)

Your very own helper elf; tools and functions to help with problems that may be encountered during advent of code.

## Usage

All _major_ features can be accessed through the default `elf` import:

```ts
import elf from "elf-help";
```

All _major_ and _minor_ features can also be accessed as named imports:

```ts
import { linesIntersect2D, ElfCartesianError } from "elf-help";
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

### Fraction

| Feature             | Description                                       |
| ------------------- | ------------------------------------------------- |
| `new Fraction`      | Creates a new `Fraction` object                   |
| `fraction`          | Clone of `new Fraction`                           |
| `Fraction.add`      | Adds together two fractions                       |
| `Fraction.subtract` | Subtracts two fractions                           |
| `Fraction.multiply` | Multiplies together two fractions                 |
| `Fraction.divide`   | Divides two fractions                             |
| `Fraction.value`    | Returns the number representation of the fraction |
| `ElfFractionError`  | Error thrown by fraction features                 |

### Iterate

| Feature           | Description                                                                       |
| ----------------- | --------------------------------------------------------------------------------- |
| `permutations`    | Returns all permutations of a list, optionally limited to `n`-length permutations |
| `combinations`    | Returns all combinations of a list, optionally limited to `n`-length combinations |
| `rotate`          | Returns all copy of an array rotated `n` steps                                    |
| `zip`             | Combines two same length arrays                                                   |
| `count`           | Counts all elements of an array                                                   |
| `ElfIterateError` | Error thrown by iterate features                                                  |

### Math

| Feature              | Description                                                                        |
| -------------------- | ---------------------------------------------------------------------------------- |
| `sum`                | Returns the sum of all provided numbers                                            |
| `product`            | Returns the product of all provided numbers                                        |
| `gcd`                | Finds the Greatest Common Divisor of two numbers                                   |
| `lcm`                | Finds the Lowest Common Multiple of two numbers                                    |
| `factorial`          | Returns the factorial of a number                                                  |
| `divisors`           | Returns all divisors of a positive integer                                         |
| `new Matrix`         | Creates a new `Matrix` object                                                      |
| `matrix`             | Clone of `new Matrix`                                                              |
| `Matrix.get`         | Gets the element of the matrix for a given `x` and `y`                             |
| `Matrix.isSquare`    | If the matrix width is equal to the height                                         |
| `Matrix.validate`    | Validates that the matrix has the same width for all rows (i.e. is a valid matrix) |
| `Matrix.determinant` | Finds the determinant of a square matrix                                           |
| `ElfMathError`       | Error thrown by math functions                                                     |
| `ElfMatrixError`     | Error thrown by matrix functions                                                   |

### Memoize

| Feature   | Description         |
| --------- | ------------------- |
| `memoize` | Memoizes a function |

### Multi map

| Feature            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `new MultiMap`     | Creates a new `MultiMap` object                  |
| `multiMap`         | Clone of `new MultiMap`                          |
| `MultiMap.set`     | Sets a value to the corresponding set of keys    |
| `MultiMap.get`     | Gets a value from the corresponding set of keys  |
| `MultiMap.delete`  | Deletes a value at the corresponding set of keys |
| `MultiMap.size`    | Amount of values stored in the map               |
| `ElfMultiMapError` | Error thrown by multi map features               |

### Ordered queue

| Feature                | Description                              |
| ---------------------- | ---------------------------------------- |
| `new OrderedQueue`     | Creates a new `OrderedQueue` object      |
| `orderedQueue`         | Clone of `new OrderedQueue`              |
| `OrderedQueue.add`     | Adds a new element to the queue          |
| `OrderedQueue.dequeue` | Removes the first element from the queue |
| `OrderedQueue.length`  | Amount of elements in the queue          |

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

### Parse

| Feature        | Description                   |
| -------------- | ----------------------------- |
| `parseNumbers` | Finds all numbers in a string |
