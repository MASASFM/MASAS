let exportVar = {}

exportVar.defaultState = {}
const { defaultState } = exportVar

exportVar.bodyReducer = function(state = defaultState, action) {
  
  switch(action.type) {
    default:
      return state
  }
}


module.exports = exportVar