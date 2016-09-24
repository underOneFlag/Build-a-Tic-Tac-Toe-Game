(function() {

function $(x) {
	const selected = document.querySelectorAll(x);
	const newArray = [];

	for(let i = 0, len = selected.length; i < len; ++i)
		newArray.push(selected[i]);

	return newArray;
}

const outside = document.getElementById('outside');
const play = {};

$('#pick-1-or-2 > button:first-of-type')[0].addEventListener('click', () => {
	outside.className = 'picking pve';
});

$('#pick-1-or-2 > button:last-of-type')[0].addEventListener('click', () => {
	outside.className = 'picking pvp';
});

$('.choice:not(#pick-1-or-2) > button:not(.back)').forEach(btn => {
	btn.addEventListener('click', () => {
		outside.classList.remove('picking');
		outside.classList.add('game-on');
		play.game = new Game(btn.textContent.toLowerCase());
	});
});

$('.back, #reset-game').forEach(btn => btn.addEventListener('click', () => {
	outside.className = 'picking';
	delete play.game;
	$('.box').forEach(box => box.className = 'box');
}));

$('.box').forEach(box => box.addEventListener('click', () => {
	if(box.className !== 'box') return;
	box.className = 'box ' + play.game.useTurn() + '-picked';
}));

function Game(xo) {
	const score = [0, 0];
	let turn = {
		p1: xo,
		p2: (xo == 'x' ? 'o' : 'x'),
		current: (xo == 'x' ? 'p1' : 'p2')
	};

	outside.classList.add(turn.current + '-turn');

	this.useTurn = () => {
		const lastTurn = turn[turn.current];
		outside.classList.remove(turn.current + '-turn');
		turn.current = (turn.current == 'p1') ? 'p2' : 'p1';
		outside.classList.add(turn.current + '-turn');
		return lastTurn;
	};
}

})();