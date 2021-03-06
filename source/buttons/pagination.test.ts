import test, {ExecutionContext} from 'ava'
import {paginationOptions} from './pagination'

function keysCorrectMacro(t: ExecutionContext, totalPages: number, currentPage: number, expectedArr: readonly number[]): void {
  const result = paginationOptions(totalPages, currentPage)
  const keys = Object.keys(result).map(o => Number(o))
  t.deepEqual(keys, expectedArr)
}

test('two pages on first page', keysCorrectMacro, 2, 1, [1, 2])
test('two pages on second page', keysCorrectMacro, 2, 1, [1, 2])
test('five pages on first page', keysCorrectMacro, 5, 1, [1, 2, 5])
test('five pages on second page', keysCorrectMacro, 5, 2, [1, 2, 3, 5])
test('five pages on third page', keysCorrectMacro, 5, 3, [1, 2, 3, 4, 5])
test('five pages on fourth page', keysCorrectMacro, 5, 4, [1, 3, 4, 5])
test('five pages on fifth page', keysCorrectMacro, 5, 5, [1, 4, 5])
test('go big', keysCorrectMacro, 200, 100, [1, 99, 100, 101, 200])
test('one page is ommited', keysCorrectMacro, 1, 1, [])
test('NaN pages is ommited', keysCorrectMacro, NaN, 1, [])
test('currentPage NaN is assumed 1', keysCorrectMacro, 2, NaN, [1, 2])
test('currentPage greater than totalPages is max page', keysCorrectMacro, 10, 15, [1, 9, 10])

// When there are 19 items / 2 per page there are... 9.5 pages -> 10
test('when totalPages is float use ceil', keysCorrectMacro, 9.5, 10, [1, 9, 10])

test('five pages all buttons', t => {
  const result = paginationOptions(5, 3)
  t.deepEqual(result, {
    1: '1 ⏪',
    2: '2 ◀️',
    3: '3',
    4: '▶️ 4',
    5: '⏩ 5'
  })
})

test('three pages are with +/-1 buttons and not first/last buttons', t => {
  const result = paginationOptions(3, 2)
  t.deepEqual(result, {
    1: '1 ◀️',
    2: '2',
    3: '▶️ 3'
  })
})
