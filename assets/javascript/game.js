$(document).ready(function(){
	var characters = [{hp:150,class:'.macewindu',name:'Mace Windu',atkPower:12,cAtkPower:25,desc:'A powerful Jedi Master with a purple lightsaber.',img:'<div class="char-icon-container macewindu animated fadeIn" data-index-number="0"><img src="assets/images/macewindu.jpg" class="img-responsive char-icon macewindu" data-toggle="modal" data-target="#myModal"></div>'},
	{alive:true,hp:120,class:'.anakin',name:'Anakin Skywalker',atkPower:10,cAtkPower:30,desc:'a Jedi destined to end the Sith... by becoming one.',img:'<div class="char-icon-container anakin animated fadeIn" data-index-number="1"><img src="assets/images/anakin.jpg" class="img-responsive char-icon anakin" data-toggle="modal" data-target="#myModal"></div>'},
	{alive:true,hp:40,class:'.jarjar',name:'Jar Jar Binks',atkPower:2,cAtkPower:5,desc:'You do not want him on your team.',img:'<div class="char-icon-container jarjar animated fadeIn" data-index-number="2"><img src="assets/images/jarjar.jpg" class="img-responsive char-icon jarjar" data-toggle="modal" data-target="#myModal"></div>'},
	{alive:true,hp:200,class:'.yoda',name:'Yoda',atkPower:180,cAtkPower:28,desc:'A legendary Jedi Master who has trained Jedi for over 800 years.',img:'<div class="char-icon-container yoda animated fadeIn" data-index-number="3"><img src="assets/images/yoda.jpg" class="img-responsive char-icon yoda" data-toggle="modal" data-target="#myModal"></div>'},
	{alive:true,hp:150,class:'.maul',name:'Darth Maul',atkPower:12,cAtkPower:20,desc:'A deadly sith who weilds a double-sided lightsaber, trained by Darth Sidious himself.',img:'<div class="char-icon-container maul animated fadeIn" data-index-number="4"><img src="assets/images/maul.jpg" class="img-responsive char-icon maul" data-toggle="modal" data-target="#myModal"></div>'},
	{alive:true,hp:85,class:'.embo',name:'Embo',atkPower:8,cAtkPower:12,desc:'A rutheless bounty hunter whose weapon of choice is the bowcaster.',img:'<div class="char-icon-container embo animated fadeIn" data-index-number="5"><img src="assets/images/embo.png" class="img-responsive char-icon embo" data-toggle="modal" data-target="#myModal"></div>'},
	{alive:true,hp:100,class:'.kitfisto',name:'Kit Fisto',atkPower:10,cAtkPower:25,desc:'A powerful alien Jedi Master. Very adept in water.',img:'<div class="char-icon-container kitfisto animated fadeIn" data-index-number="6"><img src="assets/images/kitfisto.jpg" class="img-responsive char-icon kitfisto" data-toggle="modal" data-target="#myModal"></div>'},
	{alive:true,hp:95,class:'.chewbacca',name:'Chewbacca',atkPower:8,cAtkPower:14,desc:'Space bear, smuggler, warrior, and sidekick to the infamous Han Solo. try not to get too close.',img:'<div class="char-icon-container chewbacca animated fadeIn" data-index-number="7"><img src="assets/images/chewbacca.jpg" class="img-responsive char-icon chewbacca" data-toggle="modal" data-target="#myModal"></div>'}]

	var activeChar;
	var pendingChar;
	var selectedHero;
	var selectedEnemy;
	var index;
	var heroMaxHealth;
	var enemyMaxHealth;
	var heroBaseAtk;

	function enemyDeath(){
		var deathCount = 0;
		for(i = 0; i < characters.length; i++){
			if(characters[i].alive === false){
				deathCount = deathCount + 1;
			}
		}
		if(deathCount === characters.length - 1){
			$(".attack-button").css("display","none");
			$(".vs-image").css("display","none");
			$(".enemy-box").empty();
			$(".enemy-panel-title").text("");
			$(".win-text").css("display","unset");
			$(".restart-button").css("display","unset");
		}else{
			$(".enemy-box").empty();
			$(".enemy-panel-title").text("Select a new Enemy");
			$(".btn-select-enemy").css("display", "unset");
			$(".attack-button").removeAttr("disabled");
		}
	}

	function playerDeath(){
		$(".attack-button").css("display","none");
		$(".vs-image").css("display","none");
		$(".enemy-box").empty();
		$(".enemy-panel-title").text("");
		$(".lose-text").css("display","unset");
		$(".restart-button").css("display","unset");
	}

	function sleep(ms) {
  		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function addCharacters(){
		for(i=0; i < characters.length; i++){
			$(".character-container").append(characters[i].img);
			await sleep(150);
		}
	}

	$(".character-container").on("click", "div.char-icon-container", function(){
		index = parseInt($(this).attr("data-index-number"));
		activeChar = $(this);
		pendingChar = characters[index];

		$("#name-text").text(pendingChar.name);
		$(".description-text").text("Description: " + pendingChar.desc);
		$(".attack-power-text").text("Attack Power: " + pendingChar.atkPower)
		$(".counter-attack-power-text").text("Counter Attack Power: " + pendingChar.cAtkPower)
		$(".hp-text").text("HP: " + pendingChar.hp);
				
	})

	$(".btn-select-hero").on("click", async function(){
		selectedHero = pendingChar;
		heroMaxHealth = selectedHero.hp;
		heroBaseAtk = selectedHero.atkPower;
		$(".hero-panel-title").text(selectedHero.name);
		$(".hero-panel").addClass("animated");
		$(".hero-panel").addClass("fadeIn");
		$(".hero-panel").css("display","unset");
		await sleep(800);
		$(selectedHero.class).removeAttr("data-toggle");
		$(selectedHero.class).removeAttr("data-target");
		$(selectedHero.class).removeClass("fadeIn");
		$(".hero-box").html(activeChar);
		$(selectedHero.class).css("margin","0px");
		$(selectedHero.class).addClass("bounceInUp");
		$(".hero-box").append("<div class='hero-hp-bar-container'><div class='hero-hp-bar'></div></div><br><br><p class='animated slideInLeft hero-hp-text'>hp: " + selectedHero.hp + "</p>" + "<p class='animated slideInLeft atk-power-text'>Attack Power: " + selectedHero.atkPower + "</p>" + "<p class='animated slideInLeft'>Counter Attack Power: " + selectedHero.cAtkPower + "</p>");
		$(this).css("display","none");
		

		if(typeof selectedHero !== 'undefined' && typeof selectedEnemy !== 'undefined'){
			$(".vs-image").addClass("animated");
			await sleep(1000);
			$(".vs-image").addClass("flip");
			$(".vs-image").css("display","unset");
			$(".attack-button").css("display","unset");
		}

	})

	$(".btn-select-enemy").on("click", async function(){
		selectedEnemy = pendingChar;
		enemyMaxHealth = selectedEnemy.hp;
		$(".enemy-panel-title").text(selectedEnemy.name);
		$(".enemy-panel").addClass("animated");
		$(".enemy-panel").addClass("fadeIn");
		$(".enemy-panel").css("display","unset");
		await sleep(800);
		$(selectedEnemy.class).removeAttr("data-toggle");
		$(selectedEnemy.class).removeAttr("data-target");
		$(selectedEnemy.class).removeClass("fadeIn");
		$(".enemy-box").html(activeChar);
		$(selectedEnemy.class).css("margin","0px");
		$(selectedEnemy.class).addClass("bounceInUp");
		$(".enemy-box").append("<div class='enemy-hp-bar-container'><div class='enemy-hp-bar'></div></div><br><br><p class='animated slideInLeft enemy-hp-text'>hp: " + selectedEnemy.hp + "</p>" + "<p class='animated slideInLeft'>Attack Power: " + selectedEnemy.atkPower + "</p>" + "<p class='animated slideInLeft'>Counter Attack Power: " + selectedEnemy.cAtkPower + "</p>");
		$(selectedEnemy.class).addClass("bounceInUp");
		$(this).css("display","none");
		if(typeof selectedHero !== 'undefined' && typeof selectedEnemy !== 'undefined'){
			$(".vs-image").addClass("animated");
			await sleep(1000);
			$(".vs-image").addClass("flip");
			$(".vs-image").css("display","unset");
			$(".attack-button").css("display","unset");

		}

	})

	$(".attack-button").on("click", async function(){
		$(".attack-button").attr("disabled","disabled");
		var enemyPercentage;
		var heroPercentage


		selectedEnemy.hp = selectedEnemy.hp - selectedHero.atkPower;
		if(selectedEnemy.hp < 0){
			selectedEnemy.hp = 0;
		}

		
		$(".enemy-hp-text").text("hp: " + selectedEnemy.hp);
		enemyPercentage = (selectedEnemy.hp / enemyMaxHealth) * 100;
		enemyPercentage = enemyPercentage.toString() + "%";
		$(".enemy-hp-bar").css("width", enemyPercentage);
		if(selectedEnemy.alive === true){
			selectedHero.atkPower = selectedHero.atkPower + heroBaseAtk;
		}

		
		$(".atk-power-text").text("Attack Power: " + selectedHero.atkPower);
		await sleep(1000);


		
		if(selectedHero.hp < 0){
			selectedHero.hp = 0;
		}
		

		if(selectedEnemy.hp > 0){
			selectedHero.hp = selectedHero.hp - selectedEnemy.cAtkPower;

			if(selectedHero.hp < 0){
				selectedHero.hp = 0;
			}
			$(".hero-hp-text").text("hp: " + selectedHero.hp);
			heroPercentage = (selectedHero.hp / heroMaxHealth) * 100;
			heroPercentage = heroPercentage.toString() + "%";
			$(".hero-hp-bar").css("width", heroPercentage);
			
		}
		if(selectedHero.hp > 0 && selectedEnemy.hp > 0){
			$(".attack-button").removeAttr("disabled");
		}else if(selectedEnemy.hp === 0){
			selectedEnemy.alive = false;
			enemyDeath();
		}else if(selectedHero.hp === 0){
			playerDeath();
		}
		
	})

	$(".restart-button").on("click", function(){
		location.reload();
	})


	addCharacters();

});