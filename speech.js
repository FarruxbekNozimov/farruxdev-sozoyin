let alert = document.getElementById("alert");
let sozOyin = new webkitSpeechRecognition();
sozOyin.lang = "en-UK";
mic.onclick = (e) => {
	sozOyin.start();
};
let words = JSON.parse(localStorage.getItem("words")) || wordlar;
window.localStorage.setItem("words", JSON.stringify(words));
window.localStorage.setItem("gameWords", JSON.stringify([]));
let sanoq = 0;
sozOyin.onresult = (event) => {
	let soz = event.results[0][0].transcript.split(" ")[0];
	let words = JSON.parse(window.localStorage.getItem("words"));
	let gameWords = JSON.parse(window.localStorage.getItem("gameWords"));
	if (
		gameWords.length < 2 ||
		soz[0].toLowerCase() ==
			gameWords[gameWords.length - 1][
				gameWords[gameWords.length - 1].length - 1
			]
	) {
		if (!gameWords.includes(soz)) {
			words.push(soz.toLowerCase());
			gameWords.push(soz.toLowerCase());
			window.localStorage.setItem("gameWords", JSON.stringify(gameWords));
			window.localStorage.setItem("words", JSON.stringify(words));
			searchInput.value = soz;
			list.innerHTML += `<li class="list-group-item bg-primary text-light mb-1">${soz}</li>`;
			botThink.classList.remove("d-none");
			setTimeout(() => {
				botThink.classList.add("d-none");
				let len = gameWords.length - 1;
				for (let i = 0; i < words.length; i++) {
					if (
						!gameWords.includes(words[i]) &&
						words[i][0] == gameWords[len][gameWords[len].length - 1]
					) {
						gameWords.push(words[i].toLowerCase());
						window.localStorage.setItem("gameWords", JSON.stringify(gameWords));
						searchInput.value = words[i];
						list.innerHTML += `<li class="list-group-item bg-danger text-light mb-1">${words[i]}</li>`;
						return words[i];
					}
				}
				alertd.classList.remove("d-none");
				alertd.innerHTML = "Siz yutdingiz !!!";
				user.innerHTML = +user.innerHTML + 1;
				window.localStorage.setItem("gameWords", JSON.stringify([]));
				setTimeout(() => {
					alertd.classList.add("d-none");
					list.innerHTML = "";
					searchInput.value = "";
				}, 2000);
			}, 2000);
		} else {
			alert.innerHTML = `<b>${soz.toUpperCase()}</b> so'zi oldin aytilgan boshqa so'z ayting`;
			alert.classList.remove("d-none");
			bot.innerHTML = +bot.innerHTML + 1;
			setTimeout(() => {
				alert.classList.add("d-none");
			}, 4000);
		}
	} else {
		alert.classList.remove("d-none");
		alert.innerHTML = `<b>${soz}</b> So'z oxiriga aytinshingiz kerak edi. YUTQIZDINGIZ !!!`;
		bot.innerHTML = +bot.innerHTML + 1;
		window.localStorage.setItem("gameWords", JSON.stringify([]));
		setTimeout(() => {
			alert.classList.add("d-none");
			list.innerHTML = "";
			searchInput.value = "";
		}, 3000);
	}
};
