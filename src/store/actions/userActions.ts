import User from '../../models/User';

export const EditUserAction = (user: User) => {
	return (dispatch: any, getState: any) => {
		// Make any async calls if required for fetching any data and then call dispatch passing the payload.
		dispatch({
			type: 'EDIT_USER',
			payload: user
		});
	};
};

export const AddUserAction = (user: User) => {
	return (dispatch: any) => {
		dispatch({
			type: 'ADD_USER',
			payload: user
		});
	};
};
