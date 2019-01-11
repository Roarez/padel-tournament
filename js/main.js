/*
numero de jogadores variavel
numero de campos variavel
4 jogadores por campo
randozmize players
keep randomizing each game for every possible matchup
*/
const players_cont = document.getElementById("player-names");
let num_players, num_fields;
let radio = document.getElementsByName("num-players");
for(let i = 0; i < radio.length; i++) {
	if(radio[i].checked) {
		num_players = radio[i].value;
	}
}
//let num_fields = parseInt(document.getElementById("num-fields").value);
for(let i = 0; i < num_players; i++) {
	let new_input = document.createElement("input");
	players_cont.appendChild(new_input);
}
const matchups8p2f = [
	["1 2", "7 8", "3 4", "5 6"],
	["1 3", "2 4", "5 7", "6 8"],
	["1 4", "5 8", "6 7", "2 3"],
	["1 5", "3 7", "2 6", "4 8"],
	["1 6", "2 5", "4 7", "3 8"],
	["1 7", "4 6", "3 5", "2 8"],
	["1 8", "3 6", "2 7", "4 5"]
];
let players = {
	"list": ["1","2","3","4","5","6","7","8"], // get names from web query
	"1":{
			"name": "1"
		},
	"2":{
			"name": "2"
		},
	"3":{
			"name": "3"
		},
	"4":{
			"name": "4"
		},
	"5":{
			"name": "5"
		},
	"6":{
			"name": "6"
		},
	"7":{
			"name": "7"
		},
	"8":{
			"name": "8"
		}
};

updateInputValues();
//randomizeTeams(); //assign button

function copyMatrix(matrix) {
	let new_matrix = [];
	for(let i = 0; i < matrix.length; i++) {
		new_matrix.push([]);
		for(let j = 0; j < matrix[i].length; j++) {
			new_matrix[i].push(matrix[i][j]);
		}
	}
	return new_matrix;
}

function randomizeTeams() {
	//something that decides what kind of matchups its gona be based on num players and fields
	//for now lets use 8 player and 2 fields
	let matchups = copyMatrix(matchups8p2f);
	matchups = shuffle(matchups);
	for(let i = 0; i < matchups.length; i++) {
		for(let j = 0; j < matchups[i].length; j++) {
			matchups[i][j] = matchups[i][j].replace("1", players.list[0]);
			matchups[i][j] = matchups[i][j].replace("2", players.list[1]);
			matchups[i][j] = matchups[i][j].replace("3", players.list[2]);
			matchups[i][j] = matchups[i][j].replace("4", players.list[3]);
			matchups[i][j] = matchups[i][j].replace("5", players.list[4]);
			matchups[i][j] = matchups[i][j].replace("6", players.list[5]);
			matchups[i][j] = matchups[i][j].replace("7", players.list[6]);
			matchups[i][j] = matchups[i][j].replace("8", players.list[7]);
		}
	}
	updateView(matchups);
}

function updateView(matchups) {
	let table = document.getElementById("match-table");
	resetTable(table);
	let title_row1 = document.createElement("tr");
	let header1 = document.createElement("th");
	header1.setAttribute("colspan","6");
	header1.textContent = "Field 1 (Team 1 vs Team 2)";
	let header2 = document.createElement("th");
	header2.setAttribute("colspan","6");
	header2.textContent = "Field 2 (Team 3 vs Team 4)";
	title_row1.appendChild(header1);
	title_row1.appendChild(header2);
	let title_row2 = document.createElement("tr");
	let subheader1 = document.createElement("th");
	subheader1.setAttribute("colspan","2");
	subheader1.textContent = "Team 1";
	let scoreheader1 = document.createElement("th");
	scoreheader1.textContent = "Score";
	let subheader2 = document.createElement("th");
	subheader2.setAttribute("colspan","2");
	subheader2.textContent = "Team 2";
	let scoreheader2 = document.createElement("th");
	scoreheader2.textContent = "Score";
	let subheader3 = document.createElement("th");
	subheader3.setAttribute("colspan","2");
	subheader3.textContent = "Team 3";
	let scoreheader3 = document.createElement("th");
	scoreheader3.textContent = "Score";
	let subheader4 = document.createElement("th");
	subheader4.setAttribute("colspan","2");
	subheader4.textContent = "Team 4";
	let scoreheader4 = document.createElement("th");
	scoreheader4.textContent = "Score";
	title_row2.appendChild(subheader1);
	title_row2.appendChild(scoreheader1);
	title_row2.appendChild(subheader2);
	title_row2.appendChild(scoreheader2);
	title_row2.appendChild(subheader3);
	title_row2.appendChild(scoreheader3);
	title_row2.appendChild(subheader4);
	title_row2.appendChild(scoreheader4);
	table.appendChild(title_row1);
	table.appendChild(title_row2);
	for(let i = 0; i < matchups.length; i++) {
		let row = document.createElement("tr");
		for(let j = 0; j < matchups[i].length; j++) {
			let names = matchups[i][j].split(" ");
			let cell_1 = document.createElement("td");
			let cell_2 = document.createElement("td");
			let cell_3 = document.createElement("td");
			let score_input = document.createElement("input");
			score_input.setAttribute("type", "number");
			score_input.setAttribute("min", "0");
			score_input.setAttribute("max", "32");
			score_input.setAttribute("class", "team-score");
			score_input.setAttribute("name", names[0]+" "+names[1]); //save player names to later attribute score
			cell_1.textContent = names[0];
			cell_2.textContent = names[1];
			cell_3.appendChild(score_input);
			row.appendChild(cell_1);
			row.appendChild(cell_2);
			row.appendChild(cell_3);
		}
		table.appendChild(row);
	}
	let show_scoreboard = document.createElement("input");
	show_scoreboard.setAttribute("type", "submit");
	show_scoreboard.setAttribute("onclick", "showScoreboard()");
	show_scoreboard.setAttribute("value", "Calculate Scores");
	show_scoreboard.setAttribute("class", "submit-buttons");
	let scorebutton = document.getElementById("score-button");
	if(!scorebutton.children[0]) {
		scorebutton.appendChild(show_scoreboard);	
	}
}


function showScoreboard() {
	let score_table = document.getElementById("score-table");
	resetTable(score_table);
	let title_row = document.createElement("tr");
	let title_pos = document.createElement("th");
	title_pos.textContent = "#P";
	let title_player = document.createElement("th");
	title_player.textContent = "Player";
	let title_score = document.createElement("th");
	title_score.textContent = "Score";
	title_row.appendChild(title_pos);
	title_row.appendChild(title_player);
	title_row.appendChild(title_score);
	score_table.appendChild(title_row);
	for(let i = 0; i < players.list.length; i++) { //reset scores before calculating totals (in case of multiple "calculate score" button presses)
		players[players.list[i]] = 0;
	}
	let score_inputs = document.getElementsByClassName("team-score");
	for(let i = 0; i < score_inputs.length; i++) {
		let team = score_inputs[i].getAttribute("name").split(" ");
		players[team[0]] = players[team[0]] + Number(score_inputs[i].value);
		players[team[1]] = players[team[1]] + Number(score_inputs[i].value);
	}
	let sorted_scores = [];
	for(let score in players) {
		sorted_scores.push([score, players[score]]);
	}
	sorted_scores.splice(0, 1); //remove list from the array before sorting
	sorted_scores.sort(function(a, b) {
    	return b[1] - a[1];
	});
	let previous_score, previous_pos;
	for(let i = 0; i < sorted_scores.length; i++) {
		let score_row = document.createElement("tr");
		let player_pos = document.createElement("td");
		if(!previous_score) { //if 2 or more players get the same score, award them the same # position
			player_pos.textContent = "#"+(i+1);
			previous_pos = (i+1);
		}else{
			if(previous_score == sorted_scores[i][1]) {
				player_pos.textContent = "#"+previous_pos;
			}else{
				player_pos.textContent = "#"+(previous_pos+1);
				previous_pos++;
			}
		}
		let player_name = document.createElement("td");
		player_name.textContent = sorted_scores[i][0];
		let player_score = document.createElement("td");
		player_score.textContent = sorted_scores[i][1];
		score_row.appendChild(player_pos);
		score_row.appendChild(player_name);
		score_row.appendChild(player_score);
		score_table.appendChild(score_row);
		previous_score = sorted_scores[i][1];
	}
}

function resetTable(t) {
	let table = t;
	while(table.children[0]) {
		table.removeChild(table.children[0]);
	}

}

function updateInputValues() {
	/*radio = document.getElementsByName("num-players");
	for(let i = 0; i < radio.length; i++) {
		if(radio[i].checked) {
			num_players = radio[i].value;
		}
	}*/
	num_players = 8;
	//num_fields = parseInt(document.getElementById("num-fields").value);
	num_fields = 2; //locked down for now, will update later
	while(players_cont.children[0]) {
		players_cont.removeChild(players_cont.children[0]);
	}
	for(let i = 0; i < num_players; i++) {
		let new_input = document.createElement("input");
		new_input.setAttribute("type", "text");
		new_input.setAttribute("class", "name-input");
		new_input.setAttribute("name", "player-name");
		new_input.setAttribute("id", "player"+(i+1));
		players_cont.appendChild(new_input);
	}
	let submit_names = document.createElement("input");
	submit_names.setAttribute("type", "submit");
	submit_names.setAttribute("onclick", "updatePlayerNames()");
	submit_names.setAttribute("value", "Randomize Teams");
	submit_names.setAttribute("class", "submit-buttons");
	players_cont.appendChild(submit_names);
}

function updatePlayerNames() {
	let names_html = document.getElementsByName("player-name");
	let names = [];
	players = {};
	for(let i = 0; i < names_html.length; i++) {
		names.push(names_html[i].value);
	}
	players.list = shuffle(names);
	for(let i = 0; i < players.list.length; i++) {
		players[players.list[i]] = 0;
		/*players[players.list[i]] = {
			"name": players.list[i],
			"score": 0
		}*/
	}
	randomizeTeams();
}

function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

/*
for 8 players:

case 1: A B, G H, C D, E F
case 2: A C, B D, E G, F H
case 3: A D, E H, F G, B C
case 4: A E, C G, B F, D H
case 5: A F, B E, D G, C H
case 6: A G, D F, C E, B H
case 7: A H, C F, B G, D E


for 6 players:
A B, C D, E F

case 1: A B, C D
case 2: E F, B C
case 3: F D, E A
case 4: C A, B D
case 5: C F, B E
case 6: D E, F A
*/
/*
AD
BF
CE
*/