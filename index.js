const path = ([head, ...tail]) =>
  (_state, action) =>
    head ?
      path(tail)(null, action[head]) :
      action // value

export default {
  array: () => [],
  false: () => false,
  not: state => !state,
  null: () => null,
  object: () => ({}),
  path,
  payload: (_state, action) => action.payload,
  return: value => () => value,
  toggle: key => state => ({...state, [key]: !state[key]}),
  true: () => true,
  zero: () => 0
}
