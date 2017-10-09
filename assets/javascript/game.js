$(document).ready(function(){
	var characters = [{hp:150,class:'.macewindu',name:'Mace Windu',atkPower:12,cAtkPower:25,desc:'A powerful Jedi Master with a purple lightsaber.',img:'<div class="char-icon-container macewindu animated fadeIn" data-index-number="0"><img src="assets/images/macewindu.jpg" class="img-responsive char-icon macewindu" data-toggle="modal" data-target="#myModal"></div>'},
	{hp:120,class:'.anakin',name:'Anakin Skywalker',atkPower:10,cAtkPower:30,desc:'a Jedi destined to end the Sith... by becoming one.',img:'<div class="char-icon-container anakin animated fadeIn" data-index-number="1"><img src="assets/images/anakin.jpg" class="img-responsive char-icon anakin" data-toggle="modal" data-target="#myModal"></div>'},
	{hp:40,class:'.jarjar',name:'Jar Jar Binks',atkPower:2,cAtkPower:5,desc:'You do not want him on your team.',img:'<div class="char-icon-container jarjar animated fadeIn" data-index-number="2"><img src="assets/images/jarjar.jpg" class="img-responsive char-icon jarjar" data-toggle="modal" data-target="#myModal"></div>'},
	{hp:200,class:'.yoda',name:'Yoda',atkPower:18,cAtkPower:28,desc:'A legendary Jedi Master who has trained Jedi for over 800 years.',img:'<div class="char-icon-container yoda animated fadeIn" data-index-number="3"><img src="assets/images/yoda.jpg" class="img-responsive char-icon yoda" data-toggle="modal" data-target="#myModal"></div>'},
	{hp:150,class:'.maul',name:'Darth Maul',atkPower:12,cAtkPower:20,desc:'A deadly sith who weilds a double-sided lightsaber, trained by Darth Sidious himself.',img:'<div class="char-icon-container maul animated fadeIn" data-index-number="4"><img src="assets/images/maul.jpg" class="img-responsive char-icon maul" data-toggle="modal" data-target="#myModal"></div>'},
	{hp:85,class:'.embo',name:'Embo',atkPower:8,cAtkPower:12,desc:'A rutheless bounty hunter whose weapon of choice is the bowcaster.',img:'<div class="char-icon-container embo animated fadeIn" data-index-number="5"><img src="assets/images/embo.png" class="img-responsive char-icon embo" data-toggle="modal" data-target="#myModal"></div>'},
	{hp:100,class:'.kitfisto',name:'Kit Fisto',atkPower:10,cAtkPower:25,desc:'A powerful alien Jedi Master. Very adept in water.',img:'<div class="char-icon-container kitfisto animated fadeIn" data-index-number="6"><img src="assets/images/kitfisto.jpg" class="img-responsive char-icon kitfisto" data-toggle="modal" data-target="#myModal"></div>'},
	{hp:95,class:'.chewbacca',name:'Chewbacca',atkPower:8,cAtkPower:14,desc:'Space bear, smuggler, warrior, and sidekick to the infamous Han Solo. try not to get too close.',img:'<div class="char-icon-container chewbacca animated fadeIn" data-index-number="7"><img src="assets/images/chewbacca.jpg" class="img-responsive char-icon chewbacca" data-toggle="modal" data-target="#myModal"></div>'}]

	var activeChar;
	var pendingChar;
	var selectedHero;
	var selectedEnemy;
	var index;

	function sleep(ms) {
  		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function addCharacters(){
		for(i=0; i < characters.length; i++){
			$(".character-container").append(characters[i].img);
			await sleep(100);
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
		$(pendingChar.class).removeAttr("data-toggle");
		$(pendingChar.class).removeAttr("data-target");
		$(pendingChar.class).removeClass("fadeIn");
		$(".hero-box").html(activeChar);
		$(pendingChar.class).addClass("slideInUp");
		$(this).css("display","none");
		selectedHero = pendingChar;

		if(typeof selectedHero !== 'undefined' && typeof selectedEnemy !== 'undefined'){
			$(".vs-image").css("display","unset");
		}

	})

	$(".btn-select-enemy").on("click", async function(){
		$(pendingChar.class).removeAttr("data-toggle");
		$(pendingChar.class).removeAttr("data-target");
		$(pendingChar.class).removeClass("fadeIn");
		$(".enemy-box").html(activeChar);
		$(pendingChar.class).addClass("slideInUp");
		$(this).css("display","none");
		selectedEnemy = pendingChar;
		if(typeof selectedHero !== 'undefined' && typeof selectedEnemy !== 'undefined'){
			$(".vs-image").addClass("animated");
			await sleep(1000);
			$(".vs-image").addClass("flip");
			$(".vs-image").css("display","unset");

		}

	})


	addCharacters();

});