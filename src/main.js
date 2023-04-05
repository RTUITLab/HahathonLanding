const getById = (id) => document.getElementById(id)
// Age input controls
const ageInput = [getById('memeber-1-age'), getById('memeber-2-age')]
const minAge = 18
const maxAge = 25
const [maxHeight, maxWidth] = [
	document.querySelector('body > div').scrollHeight,
	document.querySelector('body > div').scrollWidth,
]

ageInput.forEach((input) =>
	input.addEventListener('change', (e) => {
		const age = parseInt(e.target.value)
		if (age < minAge) {
			e.target.value = minAge
		} else if (age > maxAge) {
			e.target.value = maxAge
		}
	})
)

getById('register').addEventListener(
	'invalid',
	(e) => {
		e.preventDefault()
		getById('error__reg').innerText = e.target.dataset.error || ''
	},
	true
)

globalThis.onSubmit = (token) => {
	if (!getById('register').checkValidity()) {
		console.info('form check failed')
		return false
	}
	getById('error__reg').innerText = ''
	let members = [{}, {}, {}, {}],
		members_count = +getById('team-length').value
	for (let i = 1; i <= members_count; i++) {
		members[i - 1] = {
			name: getById(`memeber-${i}`).value,
			email: getById(`memeber-${i}-email`).value,
			tg: getById(`memeber-${i}-telegram`).value,
			age: +getById(`memeber-${i}-age`).value,
			school: getById(`memeber-${i}-institute`).value,
		}
	}
	const res = {
		data: {
			title: getById('team-name').value,
			members_count,
			members: [members[0]],
			member2: [members[1]],
			member3: [members[2]],
			member4: [members[3]],
		},
	}
	console.log(res)
	fetch('https://hahaton-mirea.ru/api/teams', {
		//window.location.origin + '/team', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Bearer bf4207c09f80469dadb2054eea9ec54f8177bcf60cd74d225548063d6527d2ca8bb9d24bd0306c7ba26034f4ed3c29cc3cc89b10b53dba0cdb4be10a0f59faa49719e0c182364ee4cd84fa3a7bf604cdbbb39bedffa8a96a39298d52f7d3605bd655041c4415caa90b47f27d80d434e8ffd1b3c93c2305f10f032179c90584cd',
		},
		body: JSON.stringify(res),
		// body: JSON.stringify({
		// 	age_1: getById('memeber-1-age').value,
		// 	age_2: getById('memeber-2-age').value,
		// 	fio_1: getById('memeber-1').value,
		// 	fio_2: getById('memeber-2').value,
		// 	univercity_1: getById('memeber-1-institute').value,
		// 	univercity_2: getById('memeber-2-institute').value,
		// 	tg_1: getById('memeber-1-telegram').value,
		// 	tg_2: getById('memeber-2-telegram').value,
		// 	team_name: getById('team-name').value,
		// 	email_1: getById('memeber-1-email').value,
		// 	email_2: getById('memeber-2-email').value,
		// 	case_number: document.querySelector('#register input[name="track"]:checked').value,
		// 	recaptcha: token,
		// }),
	})
		.then(() => {
			console.log('form sent')
			getById('register').reset()
			const notify = document.querySelector('.notification')

			notify.classList.add('visible')
			setTimeout(() => {
				notify.classList.remove('visible')
			}, 5000)
		})
		.catch(() => {
			console.error('ERROR in form')
		})

	return false
}

// Высота для wrapper шаров
const setCssHeight = () => {
	requestAnimationFrame(() => {
		document.documentElement.style.setProperty('--wrapper-height', String(maxHeight) + 'px')
	})
}

// открытие/закрытие меню на мобильных
document.querySelector('.hamburger').addEventListener('click', (e) => {
	if (e.target.dataset.opened === 'true') {
		e.target.dataset.opened = 'false'
		document.querySelector('.wrapper').style.display = 'none'
	} else {
		e.target.dataset.opened = 'true'
		document.querySelector('.wrapper').style.display = 'flex'
	}
})

// Нажатие на ссылку на мобильном
document.querySelectorAll('#hamburger-link').forEach((link) =>
	link.addEventListener('click', () => {
		document.querySelector('.hamburger').click()
	})
)

// Нажатие на мобильный хэдер
document.querySelector('.header__navbar-mobile > .logo').addEventListener('click', () => {
	window.scrollTo(0, 0)
})

// скрытие мобильного хэдера при скролле вниз
let prevScrollPos = window.pageYOffset
window.addEventListener('scroll', function () {
	let currentScrollPos = window.pageYOffset
	if (prevScrollPos > currentScrollPos) {
		document.querySelector('.header__navbar-mobile').style.top = '0'
	} else {
		document.querySelector('.header__navbar-mobile').style.top = '-60px'
	}
	prevScrollPos = currentScrollPos
})

window.addEventListener('resize', () => setTimeout(setCssHeight, 100))

function init() {
	setCssHeight()
	const orbs = document.querySelectorAll('#oneOrb')
	orbs.forEach((orb, i) => {
		orb.style.top = Math.random() * maxHeight + 'px'
		if (i % 2 == 0) orb.style.left = (Math.random() * maxWidth) / 2 + 'px'
		else orb.style.right = Math.random() * maxWidth + 'px'
		orb.style.width = '1350px'
	})
	// показ стольких полей заполнения участников, сколько было указано
	document.getElementById('team-length').addEventListener('change', (e) => {
		const formPersons = document.querySelectorAll('#form-person')
		let i
		for (i = 0; i < Math.min(formPersons.length, +e.target.value); i++) {
			formPersons[i].classList.remove('hidden')
			formPersons[i].querySelectorAll('input').forEach((input) => {
				input.required = true
			})
		}
		for (i = +e.target.value; i > 2 && i < formPersons.length; i++) {
			formPersons[i].classList.add('hidden')
			formPersons[i].querySelectorAll('input').forEach((input) => {
				input.required = false
			})
		}
	})
}

document.addEventListener('DOMContentLoaded', init)
