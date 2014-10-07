module.exports = function (time) {
	var hours = time.getHours();

	if (hours < 4 || hours >= 22) {
		return "Good night";
	} else if (hours < 12){
		return "Good morning";
	} else if(hours < 18){
		return "Good afternoon";
	} else {
		return "Good evening";
	}
}