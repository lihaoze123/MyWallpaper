var size = 50;
var columns = Array.from(document.getElementsByClassName('column'));
var d = void 0,
	c = void 0;
var classList = ['visible', 'close', 'far', 'far', 'distant', 'distant'];

function padClock(p, n) {
	return p + ('0' + n).slice(-2);
}

function getClock() {
	s = new Date('2024-6-8')
	d = new Date();

	delta = Math.floor(s - d) / 1000;
	day = Math.floor(delta / 24 / 3600); delta = delta - day * 24 * 3600;
	hour = Math.floor(delta / 3600); delta = delta - hour * 3600;
	min = Math.floor(delta / 60); delta = delta - min * 60;
	sec = Math.floor(delta);

	day = `${day}`;

	return day + [hour, min, sec].reduce(padClock, '');
}

function getClass(n, i2) {
	return classList.find(function (class_, classIndex) {
		return Math.abs(n - i2) === classIndex;
	}) || '';
}


function changeBg() {
	var currentTime = (e => { return e.getHours() * 60 + e.getMinutes() })(new Date());
	currentTime = `000${Math.floor(currentTime / 15)}`.slice(-3);

	document.body.style.backgroundImage = `url('img/${currentTime}.jpg')`
}

birthdays = [['康哥', new Date('10-28')]]

function dayEq(a, b) {
	return (a.getMonth() === b.getMonth() && a.getDate() === b.getDate()) 
}

function isBirthday() {
	for (let i = 0; i < birthdays.length; i++) {
		let e = birthdays[i];
		if (dayEq(e[1], new Date())) {
			return e[0];
		}
	}
	return null;
}

let birthday = isBirthday();
if (birthday != null) {
	document.getElementById("css").href = "css/birthday.css"
	document.body.innerHTML = `
		<div class="pyro">
			<div class="before"></div>
			<div class="after"></div>
		</div>
		<h1>Happy birthday!</h1>
		<h2>生日快乐 ${birthday}!</h2>
		<span>🎉</span>
		<div class="candle">
			<div id="flame" class="lit"></div>
		</div>
		<div class="cake"></div>
		<div class="plate"></div>
	`
} else {
	changeBg();
	setInterval(function () {
		c = getClock();

		columns.forEach(function (ele, i) {
			var n = +c[i];
			var offset = -n * size;
			ele.style.transform = 'translateY(calc(50vh + ' + offset + 'px - ' + size / 2 + 'px))';
			Array.from(ele.children).forEach(function (ele2, i2) {
				ele2.className = 'num ' + getClass(n, i2);
			});
		});
	}, 200 + Math.E * 10);
	setInterval(function () { changeBg(); }, 300000); //300000 means 5 min
}