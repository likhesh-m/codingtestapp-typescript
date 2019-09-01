export const FormatToDisplayDate = (dt: string): string => {
	if (dt) {
		const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
		const dateArr = dt.split('-');
		let newDob = new Date(dateArr[1] + '-' + dateArr[2] + '-' + dateArr[0]);
		const currDate = newDob.getDate().toString().length === 1 ? '0' + newDob.getDate() : newDob.getDate();
		const newMonthDate = currDate + '-' + months[newDob.getMonth()] + '-' + newDob.getFullYear();
		return newMonthDate;
	}
	return dt;
};

export const ISODateFormatter = (dob: string): string => {
	if (dob) {
		let newDob = new Date(dob);
		newDob = new Date(newDob.getTime() - newDob.getTimezoneOffset() * 60000);
		const newDobStr = newDob.toISOString().split('T')[0];
		return newDobStr;
	}
	return dob;
};
