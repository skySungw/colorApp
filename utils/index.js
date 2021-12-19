const onPadNum = function(num) {
	return num < 10 ? '0' + num : num;
}
const getDateTime = function(time) {
		const dateTime = new Date(time);
		console.log(dateTime);
		const year = dateTime.getFullYear();
		const month = dateTime.getMonth() + 1;
		const day = dateTime.getDate();
		const hour = dateTime.getHours();
		const minutes = dateTime.getMinutes();
		const seconds = dateTime.getSeconds();
		return year + '-' + onPadNum(month) + '-' + onPadNum(day) + ' ' + onPadNum(hour) + ':' + onPadNum(minutes) + ':' + onPadNum(seconds);
	}
export {
	onPadNum,
	getDateTime
}