const getById = (id) => document.getElementById(id);

const [maxHeight, maxWidth] = [
	document.querySelector('body > div').scrollHeight,
	document.querySelector('body > div').scrollWidth,
];

// Показ сообщения об ошибке в форме
getById('register').addEventListener(
	'invalid',
	(e) => {
		e.preventDefault();
		getById('error__reg').innerText = e.target.dataset.error || '';
	},
	true
);

getById('form-submit').addEventListener('click', () => {
	onSubmit(123);
});

// при отправке формы
globalThis.onSubmit = (token) => {
	if (!getById('register').checkValidity()) {
		return false;
	}
	getById('error__reg').innerText = '';
	let members = [{}, {}, {}, {}, {}],
		members_count = parseInt(getById('team-length').value);
	for (let i = 1; i <= members_count; i++) {
		members[i - 1] = {
			name: getById(`memeber-${i}`).value,
			email: getById(`memeber-${i}-email`).value,
			tg: getById(`memeber-${i}-telegram`).value,
			age: +getById(`memeber-${i}-age`).value,
			school:
				getById(`memeber-${i}-univer`).value +
				'@' +
				getById(`memeber-${i}-institute`).value,
		};
		console.log(members[i - 1]);
	}
	const res = {
		data: {
			title: getById('team-name').value,
			task: +document.querySelector('#register input[name="track"]:checked')
				.value,
			members_count,
			members: [members[0]],
			member2: [members[1]],
			member3: [members[2]],
			member4: [members[3]],
			member5: [members[4]],
		},
	};
	fetch('https://hahaton-mirea.ru/api/teams', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Bearer bf4207c09f80469dadb2054eea9ec54f8177bcf60cd74d225548063d6527d2ca8bb9d24bd0306c7ba26034f4ed3c29cc3cc89b10b53dba0cdb4be10a0f59faa49719e0c182364ee4cd84fa3a7bf604cdbbb39bedffa8a96a39298d52f7d3605bd655041c4415caa90b47f27d80d434e8ffd1b3c93c2305f10f032179c90584cd',
		},
		body: JSON.stringify(res),
	})
		.then((res) => {
			if (res.ok === false || +res?.status === 400) {
				getById('error__reg').innerText =
					'Ошибка при отправке. Проверьте корректность данных или свяжитесь с организатором';
				return false;
			}
			getById('register').reset();
			const notify = document.querySelector('.notification');

			notify.classList.add('visible');
			setTimeout(() => {
				notify.classList.remove('visible');
			}, 5000);
		})
		.catch(() => {
			console.error('ERROR in form sending');
			getById('error__reg').innerText =
				'Ошибка при отправке. Попробуйте еще раз';
		});

	return false;
};

// Высота для wrapper шаров
const setCssHeight = () => {
	requestAnimationFrame(() => {
		document.documentElement.style.setProperty(
			'--wrapper-height',
			String(maxHeight) + 'px'
		);
	});
};

// открытие/закрытие меню на мобильных
document.querySelector('.hamburger').addEventListener('click', (e) => {
	if (e.target.dataset.opened === 'true') {
		e.target.dataset.opened = 'false';
		document.querySelector('.wrapper').style.display = 'none';
	} else {
		e.target.dataset.opened = 'true';
		document.querySelector('.wrapper').style.display = 'flex';
	}
});

// Нажатие на ссылку на мобильном
document.querySelectorAll('#hamburger-link').forEach((link) =>
	link.addEventListener('click', () => {
		document.querySelector('.hamburger').click();
	})
);

// скрытие мобильного хэдера при скролле вниз
let prevScrollPos = window.scrollY;
window.addEventListener('scroll', function () {
	if (document.querySelector('.hamburger').dataset.opened === 'true') return;
	let currentScrollPos = window.scrollY;

	if (prevScrollPos > currentScrollPos) {
		document.querySelector('.header__navbar-mobile').style.top = '0';
	} else {
		document.querySelector('.header__navbar-mobile').style.top = '-60px';
	}

	if (currentScrollPos < 100) {
		document.querySelector('.header__navbar-mobile').style.top = '0';
	}

	prevScrollPos = currentScrollPos;
});

// показ стольких полей заполнения участников, сколько было указано
getById('team-length').addEventListener('change', (e) => {
	const formPersons = document.querySelectorAll('#form-person');
	const personsCounter =
		+e.target.value > 5 ? 5 : +e.target.value < 2 ? 2 : +e.target.value;
	let i;
	for (i = 0; i < personsCounter; i++) {
		formPersons[i].classList.remove('hidden');
		formPersons[i].querySelectorAll('input').forEach((input) => {
			input.required = true;
		});
	}
	for (i = personsCounter; i < formPersons.length; i++) {
		formPersons[i].classList.add('hidden');
		formPersons[i].querySelectorAll('input').forEach((input) => {
			input.required = false;
		});
	}
});

window.addEventListener('resize', () => setTimeout(setCssHeight, 100));

function init() {
	setCssHeight();
	const orbsPink = document.querySelectorAll('#oneOrb');
	orbsPink.forEach((orb, i) => {
		orb.style.top = Math.random() * maxHeight + 'px';
		if (i % 2 == 0) orb.style.left = (Math.random() * maxWidth) / 2 + 'px';
		else orb.style.right = Math.random() * maxWidth + 'px';
		orb.style.width = '1350px';
	});

	const orbsOrange = document.querySelectorAll('#twoOrb');
	orbsOrange.forEach((orb, i) => {
		orb.style.top = Math.random() * maxHeight + 'px';
		if (i % 2 == 0) orb.style.left = (Math.random() * maxWidth) / 2 + 'px';
		else orb.style.right = Math.random() * maxWidth + 'px';
		orb.style.width = '1000px';
	});
}

document.addEventListener('DOMContentLoaded', init);
