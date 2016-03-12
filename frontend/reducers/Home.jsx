let exportVar = {}

exportVar.defaultState = {}
const{ defaultState } = exportVar

exportVar.homeReducer = function(state = defaultState, action) {
  switch(action.type) {
    default:
      return state
  }
}


module.exports = exportVar