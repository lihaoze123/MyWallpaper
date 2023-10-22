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

function changeGraph() {
	var startDate = new Date("2023-08-01");
	var endDate = new Date("2024-06-07");
	var nowDate = new Date();

	var totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

	var squares = document.querySelector(".squares");

	for (var i = 0; i < totalDays; i++) {
		var currentDate = new Date(startDate.getTime() + i * (1000 * 60 * 60 * 24));

		var remainingDays = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24));

		var level;
		if (currentDate >= nowDate) {
			level = -1;
		} else if (remainingDays > 328) {
			level = 0;
		} else if (remainingDays > 292) {
			level = 1;
		} else if (remainingDays > 255) {
			level = 2;
		} else if (remainingDays > 219) {
			level = 3;
		} else if (remainingDays > 182) {
			level = 4;
		} else if (remainingDays > 146) {
			level = 5;
		} else if (remainingDays > 110) {
			level = 6;
		} else if (remainingDays > 73) {
			level = 7;
		} else if (remainingDays > 36) {
			level = 8;
		} else if (remainingDays > 0) {
			level = 9;
		}

		var li = document.createElement("li");

		li.className = "level-" + level;

		squares.appendChild(li);
	}
}

function changeBg() {
	var currentTime = (e => { return e.getHours() * 60 + e.getMinutes() })(new Date());
	currentTime = `000${Math.floor(currentTime / 15)}`.slice(-3);

	document.getElementById("main").style.backgroundImage = `url('img/${currentTime}.jpg')`
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

const slides = document.querySelectorAll('.slide');

let birthday = isBirthday();
if (birthday == null) {
	slides[2].classList.add("disabled");
} else {
	document.getElementById("congratulations").innerText = `生日快乐 ${birthday}!`;
}

let currentSlide = 0;

function showSlide(slideIndex) {
	slides.forEach((slide) => {
		slide.classList.remove('active');
	});

	slides[slideIndex].classList.add('active');
}

function nextSlide() {
	currentSlide++;
	if (currentSlide >= slides.length) {
		currentSlide = 0;
	}
	if (slides[currentSlide].classList.contains("disabled")) {
		nextSlide();
		return 0;
	}
	showSlide(currentSlide);
}

changeGraph();

showSlide(0)
setInterval(nextSlide, 10000);

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