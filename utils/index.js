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
const handlePublishTimeDesc = function(post_modified) {
	let timeStr = post_modified.replace(/\-/ig, '/');
	// 拿到当前时间戳和发布时的时间戳，然后得出时间戳差
	var curTime = new Date();
	var postTime = new Date(timeStr);
	var timeDiff = curTime.getTime() - postTime.getTime();

	// 单位换算
	var min = 60 * 1000;
	var hour = min * 60;
	var day = hour * 24;
	var week = day * 7;

	// 计算发布时间距离当前时间的周、天、时、分
	var exceedWeek = Math.floor(timeDiff/week);
	var exceedDay = Math.floor(timeDiff/day);
	var exceedHour = Math.floor(timeDiff/hour);
	var exceedMin = Math.floor(timeDiff/min);

	// 最后判断时间差到底是属于哪个区间，然后return
	if(exceedWeek > 0){
			return `${timeStr}`;
	}else{
		if(exceedDay < 7 && exceedDay > 0){
			return `${exceedDay}天前`;
		}else{
			if(exceedHour < 24 && exceedHour > 0){
				return `${exceedHour}小时前`;
			}else{
				return `${exceedMin}分钟前`;
			}
		}
	}
}
// const ENV = 'test';
const ENV = 'prod';
export {
	ENV,
	onPadNum,
	getDateTime,
	handlePublishTimeDesc
}