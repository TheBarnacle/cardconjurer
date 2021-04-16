//checks to see if it needs to run
if (!loadedVersions.includes('/js/frames/versionPlaneswalker.js')) {
	loadedVersions.push('/js/frames/versionPlaneswalker.js');
	sizeCanvas('planeswalker');
	document.querySelector('#creator-menu-tabs').innerHTML += '<h3 class="selectable readable-background" onclick="toggleCreatorTabs(event, `planeswalker`)">Planeswalker</h3>';
	var newHTML = document.createElement('div');
	newHTML.id = 'creator-menu-planeswalker';
	newHTML.classList.add('hidden');
	newHTML.innerHTML = `
	<div class='readable-background padding'>
		<h5 class='padding margin-bottom input-description'>Adjust the height (first input) and loyalty cost (second input) of each Planeswalker ability</h5>
		<h5 class='padding margin-bottom input-description'>First Ability:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='planeswalker-height-0' type='number' class='input' oninput='planeswalkerEdited();' min='0'>
			<input id='planeswalker-cost-0' type='text' class='input' oninput='planeswalkerEdited();'>
		</div>
		<h5 class='padding margin-bottom input-description'>Second Ability:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='planeswalker-height-1' type='number' class='input' oninput='planeswalkerEdited();' min='0'>
			<input id='planeswalker-cost-1' type='text' class='input' oninput='planeswalkerEdited();'>
		</div>
		<h5 class='padding margin-bottom input-description'>Third Ability:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='planeswalker-height-2' type='number' class='input' oninput='planeswalkerEdited();' min='0'>
			<input id='planeswalker-cost-2' type='text' class='input' oninput='planeswalkerEdited();'>
		</div>
		<h5 class='padding margin-bottom input-description'>Fourth Ability:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='planeswalker-height-3' type='number' class='input' oninput='planeswalkerEdited();' min='0'>
			<input id='planeswalker-cost-3' type='text' class='input' oninput='planeswalkerEdited();'>
		</div>
		<h5 class='padding margin-bottom input-description'>Invert textbox colors:</h5>
		<input id='planeswalker-invert' class='input margin-bottom' type='checkbox' onchange='invertPlaneswalkerColors();'>
		<h5 class='padding margin-bottom input-description'>For two-ability planeswalkers only:</h5>
	</div>`;
	if (!card.planeswalker) {
		card.planeswalker = {abilities:['+1', '0', '-7', ''], count:3, x:0.1167, width:0.8094};
	}
	window.planeswalkerAbilityLayout = [[[0.7467], [0.6953, 0.822], [0.6639, 0.7467, 0.8362], [0.6505, 0.72, 0.7905, 0.861]],[[0.72], [0.6391, 0.801], [0.5986, 0.72, 0.8415], [0.5986, 0.6796, 0.7605, 0.8415]]];
	document.querySelector('#creator-menu-sections').appendChild(newHTML);
	var plusIcon = new Image();
	plusIcon.src = '/img/frames/planeswalker/planeswalkerPlus.png';
	var minusIcon = new Image();
	minusIcon.src = '/img/frames/planeswalker/planeswalkerMinus.png';
	var neutralIcon = new Image();
	neutralIcon.src = '/img/frames/planeswalker/planeswalkerNeutral.png';
	var lightToDark = new Image();
	lightToDark.src = '/img/frames/planeswalker/abilityLineOdd.png';
	var darkToLight = new Image();
	darkToLight.src = '/img/frames/planeswalker/abilityLineEven.png';
	var planeswalkerTextMask = new Image();
	planeswalkerTextMask.onload = function(){fixPlaneswalkerInputs(planeswalkerEdited);}
	planeswalkerTextMask.src = '/img/frames/planeswalker/planeswalkerMaskText.png';
	var lightColor = 'white';
	var darkColor = '#a4a4a4';
} else {
	planeswalkerEdited();
}

function planeswalkerEdited() {
	var planeswalkerTall = 0;
	if (card.version == 'planeswalkerTall') {
		planeswalkerTall = 1;
		if (!planeswalkerTextMask.src.includes('tall')) {
			planeswalkerTextMask.src = '/img/frames/planeswalker/tall/planeswalkerTallMaskRules.png';
		}
	} else if (card.version == 'planeswalkerMDFC') {
		if (!planeswalkerTextMask.src.includes('mdfc')) {
			planeswalkerTextMask.src = '/img/frames/planeswalker/mdfc/text.svg';
		}
	} else {
		if (planeswalkerTextMask.src.includes('tall') || planeswalkerTextMask.src.includes('mdfc')) {
			planeswalkerTextMask.src = '/img/frames/planeswalker/planeswalkerMaskText.png';
		}
	}
	card.planeswalker.abilities[0] = document.querySelector('#planeswalker-cost-0').value;
	card.planeswalker.abilities[1] = document.querySelector('#planeswalker-cost-1').value;
	card.planeswalker.abilities[2] = document.querySelector('#planeswalker-cost-2').value;
	card.planeswalker.abilities[3] = document.querySelector('#planeswalker-cost-3').value;
	card.planeswalker.count = 0;
	var lastY = card.text.ability0.y;
	for (var i = 0; i < 4; i ++) {
	 	card.text['ability' + i].y = lastY;
	 	var height = parseFloat((parseInt(document.querySelector('#planeswalker-height-' + i).value) / card.height).toFixed(4));
	 	if (height > 0) {
	 		card.planeswalker.count ++;
	 	}
	 	card.text['ability' + i].height = height;
	 	lastY += height;
	}
	fixPlaneswalkerInputs();
	var transitionHeight = scaleHeight(0.0048);
	planeswalkerContext.clearRect(0, 0, planeswalkerCanvas.width, planeswalkerCanvas.height);
	for (var i = 0; i < card.planeswalker.count; i ++) {
		var x = scaleX(card.planeswalker.x);
		var y = scaleY(card.text['ability' + i].y);
		var width = scaleWidth(card.planeswalker.width);
		var height = scaleHeight(card.text['ability' + i].height);
		if (i == 0) {
			y -= scaleHeight(0.1);
			height += scaleHeight(0.1);
		} else if (i == card.planeswalker.count - 1) {
			height += scaleHeight(0.5);
		}
		if (i % 2 == 0) {
			planeswalkerContext.fillStyle = lightColor;
			planeswalkerContext.globalAlpha = 0.608;
			planeswalkerContext.fillRect(x, y + transitionHeight, width, height - 2 * transitionHeight);
			planeswalkerContext.globalAlpha = 1;
			if (lightToDark.complete) {
				planeswalkerContext.drawImage(lightToDark, x, y + height - transitionHeight, width, 2 * transitionHeight);
			}
		} else {
			planeswalkerContext.fillStyle = darkColor;
			planeswalkerContext.globalAlpha = 0.706;
			planeswalkerContext.fillRect(x, y + transitionHeight, width, height - 2 * transitionHeight);
			planeswalkerContext.globalAlpha = 1;
			if (darkToLight.complete) {
				planeswalkerContext.drawImage(darkToLight, x, y + height - transitionHeight, width, 2 * transitionHeight);
			}
		}
	}
	planeswalkerContext.globalCompositeOperation = 'destination-in';
	if (planeswalkerTextMask.complete) {
		planeswalkerContext.drawImage(planeswalkerTextMask, scaleX(0), scaleY(0), scaleWidth(1), scaleHeight(1));
	}
	planeswalkerContext.globalCompositeOperation = 'source-over';
	planeswalkerContext.fillStyle = 'white'
	planeswalkerContext.font = scaleHeight(0.0286) + 'px belerenbsc';
	planeswalkerContext.textAlign = 'center';
	for (var i = 0; i < card.planeswalker.count; i ++) {
		var planeswalkerIconValue = card.planeswalker.abilities[i];
		var planeswalkerPlacement = scaleY(planeswalkerAbilityLayout[planeswalkerTall][card.planeswalker.count - 1][i])
		if (planeswalkerIconValue.includes('+')) {
			if (plusIcon.complete) {
				planeswalkerContext.drawImage(plusIcon, scaleX(0.0294), planeswalkerPlacement - scaleHeight(0.0258), scaleWidth(0.14), scaleHeight(0.0724));
			}
			planeswalkerContext.fillText(planeswalkerIconValue, scaleX(0.1027), planeswalkerPlacement + scaleHeight(0.0172));
		} else if (planeswalkerIconValue.includes('-')) {
			if (minusIcon.complete) {
				planeswalkerContext.drawImage(minusIcon, scaleX(0.028), planeswalkerPlacement - scaleHeight(0.0153), scaleWidth(0.1414), scaleHeight(0.0705));
			}
			planeswalkerContext.fillText(planeswalkerIconValue, scaleX(0.1027), planeswalkerPlacement + scaleHeight(0.0181));
		} else if (planeswalkerIconValue != '') {
			if (neutralIcon.complete) {
				planeswalkerContext.drawImage(neutralIcon, scaleX(0.028), planeswalkerPlacement - scaleHeight(0.0153), scaleWidth(0.1414), scaleHeight(0.061));
			}
			planeswalkerContext.fillText(planeswalkerIconValue, scaleX(0.1027), planeswalkerPlacement + scaleHeight(0.0191));
		}
	}
	drawTextBuffer();
	drawCard();
}

function fixPlaneswalkerInputs(callback) {
	document.querySelector('#planeswalker-height-0').value = scaleHeight(card.text.ability0.height);
	document.querySelector('#planeswalker-cost-0').value = card.planeswalker.abilities[0];
	document.querySelector('#planeswalker-height-1').value = scaleHeight(card.text.ability1.height);
	document.querySelector('#planeswalker-cost-1').value = card.planeswalker.abilities[1];
	document.querySelector('#planeswalker-height-2').value = scaleHeight(card.text.ability2.height);
	document.querySelector('#planeswalker-cost-2').value = card.planeswalker.abilities[2];
	document.querySelector('#planeswalker-height-3').value = scaleHeight(card.text.ability3.height);
	document.querySelector('#planeswalker-cost-3').value = card.planeswalker.abilities[3];
	if (callback) {
		callback();
	}
}

function invertPlaneswalkerColors(reverse = false) {
	if (reverse) {
		document.querySelector('#planeswalker-invert').checked = card.planeswalker.invert;
	} else {
		card.planeswalker.invert = document.querySelector('#planeswalker-invert').checked;
	}
	if (!lightToDark.onload) {
		lightToDark.onload = planeswalkerEdited;
		darkToLight.onload = planeswalkerEdited;
	}
	if (card.planeswalker.invert) {
		darkColor = '#5b5b5b';
		lightColor = 'black';
		lightToDark.src = '/img/frames/planeswalker/abilityLineOddDarkened.png';
		darkToLight.src = '/img/frames/planeswalker/abilityLineEvenDarkened.png';
	} else {
		darkColor = '#a4a4a4';
		lightColor = 'white';
		lightToDark.src = '/img/frames/planeswalker/abilityLineOdd.png';
		darkToLight.src = '/img/frames/planeswalker/abilityLineEven.png';
	}
}