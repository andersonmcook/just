Using the createReducer pattern in Redux
```javascript
// takes an initial state and an object where each key is a handler function that takes state and action
const createReducer = (initialState, handlerObj) =>
  (state = initialState, action) =>
    handlerObj.hasOwnProperty(action['type']) ? handlerObj[action['type']](state, action) : state
```
OR
```javascript
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
```

Implementation
```javascript
export const someReducer = createReducer(someInitialState, {
  [TYPE_A](state, action) {
    return action.payload
  },
  [TYPE_B](state, action) {
    return !state
  },
  [TYPE_C](state, action) {
    return someInitialState
  },
  [TYPE_D](state, action) {
    return {}
  }
})
```
becomes
```javascript
export const someReducer = createReducer(someInitialState, {
  [TYPE_A]: Just.payload,
  [TYPE_B]: Just.not,
  [TYPE_C]: Just.return(someInitialState),
  [TYPE_D]: Just.object
})
```

Functions
```javascript
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
```
