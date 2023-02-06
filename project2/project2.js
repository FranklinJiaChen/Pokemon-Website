function analyze(json) {
	let name = json.name;
	name = name[0].toUpperCase() + name.slice(1);
	let hp = json.stats[0].base_stat;
	let atk = json.stats[1].base_stat;
	let def = json.stats[2].base_stat;
	let spatk = json.stats[3].base_stat;
	let spdef = json.stats[4].base_stat;
	let spd = json.stats[5].base_stat;
	let art = json.sprites.front_default;
	$("#pokemon").html(name);
	$("#hp").html("HP: " + hp);
	$("#atk").html("Attack: " + atk);
	$("#def").html("Defense: " + def);
	$("#spatk").html("Sp. Att: " + spatk);
	$("#spdef").html("Sp. Def: " + spdef);
	$("#spd").html("Speed: " + spd);
	$("#myImage").attr("src", art);
}

function searchUnsuccessful(){
	$(".error").css("visibility", "visible");
}

function read_input() {
	let pokemon = $("#pokemon-input").val();
	pokemon = pokemon.toLowerCase();

	if (pokemon == "") {
        searchUnsuccessful();
        return;
    } else if (pokemon == "random") {
		pokemon = Math.floor(Math.random() * 890)+1;
	} 
	
	let baseURL = "https://pokeapi.co/api/v2/";
	let fullURL = baseURL + "pokemon/" + pokemon;

	//for debugging
	// console.log(fullURL);
	
	$.get(fullURL, function(data) {
		//for debugging
		// console.log(data);
		
		// The following line outputs the JSON response to the webpage:
		$("#rawJSON").html(JSON.stringify(data));
	
		pokeball_open()
		analyze(data);
	}).fail(function() {
		searchUnsuccessful();
	});
}

function pokeball_open() {
    $(".top").css("transform", "translateY(-50%)");
	$(".bottom").css("transform", "translateY(50%)");
	$(".info-page").css("display", "in-line");
	$(".beneath .info").css("display", "flex");
	$(".buttons .info-page").css("display", "flex");
	$(".bottom .buttons button").css("display", "inline-block");
	$(".game-page").css("display", "none");
	$(".front-page").css("display", "none");
}

function random(){
	pokemon = Math.floor(Math.random() * 890)+1;
	let baseURL = "https://pokeapi.co/api/v2/";
	let fullURL = baseURL + "pokemon/" + pokemon;

	//for debugging
	// console.log(fullURL);
	
	$.get(fullURL, function(data) {
		//for debugging
		// console.log(data);
		
		// The following line outputs the JSON response to the webpage:
		$("#rawJSON").html(JSON.stringify(data));
	
		pokeball_open()
		analyze(data);
	}).fail(function() {
		searchUnsuccessful();
	});
}

function pokeball_close(){
	$(".top").css("transform", "translateY(0%)");
	$(".bottom").css("transform", "translateY(0%)");
	$(".front-page").css("display", "inline");
	$(".buttons .front-page").css("display", "flex");
	$(".bottom .buttons button").css("display", "inline-block");
	$(".bottom .error").css("visibility", "hidden");
	$(".bottom .error").css("display", "block");
	$(".info-page").css("display", "none");
	$(".game-page").css("display", "none");
}


function game_open() {
    $(".top").css("transform", "translateY(-50%)");
	$(".bottom").css("transform", "translateY(50%)");
	$(".game-page").css("display", "inline");
	$(".beneath .game").css("display", "flex");
	$(".front-page").css("display", "none");
	$(".info-page").css("display", "none");
	$("#cur-details").html("");
	$(".beneath .score .value").html(0);
}


function game(){
	game_open();
	init_game();
}

function init_game(){
	pokemon1 = Math.floor(Math.random() * 890)+1;
	pokemon2 = Math.floor(Math.random() * 890)+1;

	let baseURL = "https://pokeapi.co/api/v2/";
	let firstPokemonURL = baseURL + "pokemon/" + pokemon1;
	let secondPokemonURL = baseURL + "pokemon/" + pokemon2;

	//for debugging
	// console.log(fullURL);
	
	$.get(firstPokemonURL, function(data) {
		//for debugging
		// console.log(data);
		
		// The following line outputs the JSON response to the webpage:
		$("#rawJSON").html(JSON.stringify(data));
	
		let first_speed = game_analyze(data, 1);
		$.get(secondPokemonURL, function(data) {
			//for debugging
			// console.log(data);
			
			// The following line outputs the JSON response to the webpage:
			$("#rawJSON").html(JSON.stringify(data));
	
			let second_speed = game_analyze(data, 2);
			if (first_speed > second_speed){
				$("#left-button").attr("onclick", "correct_answer()");
				$("#right-button").attr("onclick", "incorrect_answer()");
				let pokemon1 = $("#pokemon1").html();
				let pokemon2 = $("#pokemon2").html();
				$("#next-details").html("Correct, " + pokemon1 + "\'s speed is " + first_speed + "<br> and " +  pokemon2 + "\'s speed is " + second_speed);
			} else if(first_speed == second_speed){
				$("#left-button").attr("onclick", "correct_answer()");
				$("#right-button").attr("onclick", "correct_answer()");
				let pokemon1 = $("#pokemon1").html();
				let pokemon2 = $("#pokemon2").html();
				$("#next-details").html("Correct, " + pokemon1 + "\'s speed is " + first_speed + "<br> and " +  pokemon2 + "\'s speed is " + second_speed);
			} else {
				let pokemon1 = $("#pokemon1").html();
				let pokemon2 = $("#pokemon2").html();
				$("#next-details").html("Correct, " + pokemon2 + "\'s speed is " + second_speed + "<br> and " + pokemon1 + "\'s speed is " + first_speed);
				$("#left-button").attr("onclick", "incorrect_answer()");
				$("#right-button").attr("onclick", "correct_answer()");
			}
		})
	})

	
}

function game_analyze(json, position) {
	let name = json.name;
	name = name[0].toUpperCase() + name.slice(1);
	let spd = json.stats[5].base_stat;
	let art = json.sprites.front_default;
	if (position == 1){
		$("#pokemon1").html(name);
		$("#myImage1").attr("src", art);
	} else{
		$("#pokemon2").html(name);
		$("#myImage2").attr("src", art);
	}
	
	return spd;
}

function correct_answer(){
	let info = $("#next-details").html();
	let value = $(".beneath .score .value").html();
	value++;
	$("#cur-details").html(info);
	$("#next-details").html("");
	$(".beneath .score .value").html(value);
	init_game();
}

function incorrect_answer(){
	let info = $("#next-details").html();
	info = "Inc" + info.slice(1);
	$("#cur-details").html(info);
	$("#left-button").attr("onclick", "incorrect_answer()");
	$("#right-button").attr("onclick", "incorrect_answer()");
}