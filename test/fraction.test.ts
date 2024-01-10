import { when } from 'jest-when';
import elf, { ElfFractionError, Fraction } from '../src';
import { gcd, lcm } from '../src/math';

jest.mock('../src/math');

describe('constructior', () => {
	beforeEach(() => {
		when(gcd).mockReturnValue(1);
	});

	it('only numerator', () => {
		const fraction = elf.fraction(5);
		expect(fraction).toBeInstanceOf(elf.Fraction);
		expect(fraction.numerator).toBe(5);
		expect(fraction.denominator).toBe(1);
		expect(gcd).toHaveBeenCalledTimes(1);
	});

	it('numerator and denominator', () => {
		const fraction = elf.fraction(5, 2);
		expect(fraction).toBeInstanceOf(elf.Fraction);
		expect(fraction.numerator).toBe(5);
		expect(fraction.denominator).toBe(2);
		expect(gcd).toHaveBeenCalledTimes(1);
	});

	it('simplifies correctly', () => {
		when(gcd).mockReturnValue(2);

		const fraction = elf.fraction(10, 2);
		expect(fraction).toBeInstanceOf(elf.Fraction);
		expect(fraction.numerator).toBe(5);
		expect(fraction.denominator).toBe(1);
		expect(gcd).toHaveBeenCalledTimes(1);
	});

	it('throws ElfFractionError on non-integer numerator', () => {
		expect(() => elf.fraction(1.1)).toThrow(ElfFractionError);
	});

	it('throws ElfFractionError on non-integer denominator', () => {
		expect(() => elf.fraction(1, 1.1)).toThrow(ElfFractionError);
	});
});

describe('Fraction.add', () => {
	beforeEach(() => {
		when(gcd).mockReturnValue(1);
	});

	it('adds with a number', () => {
		const res = elf.fraction(7, 3).add(1);
		expect(res.numerator).toBe(10);
		expect(res.denominator).toBe(3);
	});

	it('adds with a fraction', () => {
		when(lcm).mockReturnValue(6);

		const res = elf.fraction(7, 3).add(elf.fraction(3, 2));
		expect(res.numerator).toBe(14 + 9);
		expect(res.denominator).toBe(6);
		expect(lcm).toHaveBeenCalledTimes(1);
	});
});

describe('Fraction.subtract', () => {
	beforeEach(() => {
		when(gcd).mockReturnValue(1);
	});

	it('subtracts with a number', () => {
		const res = elf.fraction(7, 3).sub(1);
		expect(res.numerator).toBe(4);
		expect(res.denominator).toBe(3);
	});

	it('subtracts with a fraction', () => {
		when(lcm).mockReturnValue(6);

		const res = elf.fraction(7, 3).sub(elf.fraction(3, 2));
		expect(res.numerator).toBe(14 - 9);
		expect(res.denominator).toBe(6);
		expect(lcm).toHaveBeenCalledTimes(1);
	});
});

describe('Fraction.multiply', () => {
	it('multiplies with a number', () => {
		when(gcd).mockReturnValue(1);
		const res = elf.fraction(7, 3).mul(2);
		expect(res.numerator).toBe(14);
		expect(res.denominator).toBe(3);
	});

	it('multiplies with a fraction', () => {
		when(gcd).mockReturnValue(1);
		when(gcd).calledWith(21, 6).mockReturnValue(3);

		const res = elf.fraction(7, 3).mul(elf.fraction(3, 2));
		expect(res.numerator).toBe(7);
		expect(res.denominator).toBe(2);
		expect(gcd).toHaveBeenCalledTimes(3);
	});
});

describe('Fraction.divide', () => {
	beforeEach(() => {
		when(gcd).mockReturnValue(1);
	});

	it('divides with a number', () => {
		const res = elf.fraction(7, 3).div(2);
		expect(res.numerator).toBe(7);
		expect(res.denominator).toBe(6);
	});

	it('divides with a fraction', () => {
		const res = elf.fraction(7, 3).div(elf.fraction(3, 2));
		expect(res.numerator).toBe(14);
		expect(res.denominator).toBe(9);
	});
});

describe('Fraction.value', () => {
	it('Get fraction value', () => {
		when(gcd).mockReturnValue(1);
		expect(elf.fraction(7, 3).value).toBe(7 / 3);
	});
});
