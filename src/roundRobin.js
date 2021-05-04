import {len} from '@functional-abstraction/operator';

import {slice} from '@iterable-iterator/slice';
import {cycle} from '@iterable-iterator/cycle';
import {map} from '@iterable-iterator/map';
import {iter} from '@iterable-iterator/iter';

/**
 * Yields the first item of the first input iterable, then the first item of
 * the second input iterable, etc., until the last input iterable. Then start
 * again with the second item of the first input iterable, etc. If one of the
 * input iterable is exhausted, it is removed from the list of input iterables
 * and the algorithm continues until all input iterables have been exhausted.
 *
 * @example
 * // returns ['A','D','E','B','F','C]
 * list( roundrobin(['ABC', 'D', 'EF']) )
 *
 * @param {Iterable[]} iterables - The input iterables.
 * @returns {IterableIterator}
 *
 */
export default function* roundRobin(iterables) {
	let pending = len(iterables);

	let iterators = cycle(map(iter, iterables));

	while (pending) {
		while (true) {
			const iterator = iterators.next().value;

			const it = iterator.next();

			if (it.done) {
				break;
			}

			yield it.value;
		}

		--pending;

		iterators = cycle(slice(iterators, 0, pending, 1));
	}
}
