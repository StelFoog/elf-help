import elf from "../src";

describe("OrderedQueue.constructor", () => {
	test("can create", () => {
		const q = elf.orderedQueue<number>((v) => v);
		expect(q.length).toBe(0);
	});
});

describe("OrderedQueue.add and OrderedQueue.dequeue", () => {
	test("element as value", () => {
		const q = elf.orderedQueue<number>((v) => v);
		for (const e of [3, 2, 5, 7, 0]) q.add(e);
		expect(q.length).toBe(5);
		expect(q.dequeue()).toBe(0);
		expect(q.dequeue()).toBe(2);
		expect(q.dequeue()).toBe(3);
		expect(q.dequeue()).toBe(5);
		expect(q.dequeue()).toBe(7);
		expect(q.length).toBe(0);
	});

	test("object element", () => {
		const q = elf.orderedQueue<{ id: number; v: number }>((o) => o.v);
		for (const e of [
			{ id: 1, v: 3 },
			{ id: 2, v: 2 },
			{ id: 3, v: 3 },
			{ id: 4, v: 5 },
			{ id: 5, v: 0 },
		])
			q.add(e);

		expect(q.dequeue()?.id).toBe(5);
		expect(q.dequeue()?.id).toBe(2);
		expect(q.dequeue()?.id).toBe(1);
		expect(q.dequeue()?.id).toBe(3);
		expect(q.dequeue()?.id).toBe(4);
	});

	test("dequeue empty", () => {
		const q = elf.orderedQueue<number>((v) => v);
		expect(q.length).toBe(0);
		expect(q.dequeue()).toBeUndefined();
		expect(q.length).toBe(0);
	});
});
