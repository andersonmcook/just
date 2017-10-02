export default {
  array: () => [],
  false: () => false,
  not: boolean => !boolean,
  null: () => null,
  object: () => ({}),
  payload: (_state, action) => action.payload,
  return: value => () => value,
  true: () => true,
  zero: () => 0
}
