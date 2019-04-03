// Case Reducers
export const contextUpdate = (state, action) => {
	const {ID, fieldName, value} = action
	if (Array.isArray(value)) {
		return {
			...state, 
			[ID]: {
				...state[ID], 
				pageIDs: value
			}
		}
	} 
	return {
		...state, 
		[ID]: {
			...state[ID], 
			values: {
				...state[ID].values, 
				[fieldName]: value
			}
		}
	}
}
