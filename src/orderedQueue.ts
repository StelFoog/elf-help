/**
 * A queue which always preserves the order of its elements
 */
export class OrderedQueue<T> {
	private head: OrderedNode<T> | null;
	private _length: number;
	private orderGetter: (element: T) => number;

	/**
	 * Creates a new OrderedQueue
	 * @param orderGetter Function which decides how elements should be ordered
	 */
	constructor(orderGetter: (element: T) => number) {
		this.head = null;
		this._length = 0;
		this.orderGetter = orderGetter;
	}

	/**
	 * Adds a new element to queue
	 */
	add(element: T) {
		const value = this.orderGetter(element);
		const node = new OrderedNode(element, value);
		let curr = this.head;
		this._length++;
		if (curr === null || value < curr.value) {
			this.head = node;
			node.next = curr;
			return;
		}
		while (curr.next !== null && value >= curr.next.value) {
			curr = curr.next;
		}
		node.next = curr.next;
		curr.next = node;
	}

	/**
	 * Gets the first element from queue
	 * @returns Element or undefined
	 */
	dequeue() {
		if (this.head !== null) this._length--;
		const curr = this.head?.element;
		this.head = this.head?.next ?? null;
		return curr;
	}

	get length() {
		return this._length;
	}
}

/**
 * Creates a new OrderedQueue
 * @param orderGetter Function which decides how elements should be ordered
 */
export function orderedQueue<T>(orderGetter: (element: T) => number) {
	return new OrderedQueue(orderGetter);
}

class OrderedNode<T> {
	element: T;
	value: number;
	next: OrderedNode<T> | null;

	constructor(element: T, value: number) {
		this.element = element;
		this.value = value;
		this.next = null;
	}
}
