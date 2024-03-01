import test from 'ava';

import {list} from '@iterable-iterator/list';
import {roundRobin} from '#module';

const repr = (x) => JSON.stringify(x);

const macro = (t, iterables, expected) => {
	t.deepEqual(list(roundRobin(iterables)), expected);
};

macro.title = (title, iterables, expected) =>
	title ?? `roundRobin(${repr(iterables)}) is ${repr(expected)}`;

test(macro, ['ABC', 'D', 'EF'], ['A', 'D', 'E', 'B', 'F', 'C']);
