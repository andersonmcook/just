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
  },
  [TYPE_E](state, action) {
    return { ...state, some_key: !state.some_key }
  },
  [TYPE_F](state, action) {
    return action.payload.an_object.a_value
  }
})
```
becomes
```javascript
export const someReducer = createReducer(someInitialState, {
  [TYPE_A]: Just.payload,
  [TYPE_B]: Just.not,
  [TYPE_C]: Just.return(someInitialState),
  [TYPE_D]: Just.object,
  [TYPE_E]: Just.toggle('some_key'),
  [TYPE_F]: Just.path(['payload', 'an_object', 'a_value'])
})
```

Functions
```javascript
export default {
  array: () => [],
  false: () => false,
  not: state => !state,
  null: () => null,
  object: () => ({}),
  path, // get nested value in action object
  payload: (_state, action) => action.payload,
  return: value => () => value,
  toggle: key => state => ({...state, [key]: !state[key]}),
  true: () => true,
  zero: () => 0
}
```

Just.path
```javascript
const action = {
  type: 'SOME_TYPE',
  payload: {
    one: {
      some_value: [],
      two: {
        three: {
          desired_value: 'good'
        }
      }
    }
  }
}

//in reducer
[TYPE_E]: Just.path(['payload', 'one', 'two', 'three', 'desired_value']) // 'good'
```
