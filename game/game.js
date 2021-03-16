/* 
	James Billinger
	Yi Bo Cheng
	06/13/2019
	Bee clicker
	This is the Javascript for our game 
*/
//global value
let count=0;
let timeValue=0;
let inventory=[];
let banner=["stone","ironOre","goldOre","diamondOre"];
let bannerInventory=["wood"];
$(document).ready(function($){
	/* setting variables */
	//game variables
	let time=0;
	let timeRecords=[];
	let health=0;
	//block click values
	/************************************************************************************
	************************************************************************************
	************************************************************************************
	Arrays: value of each block has a number of values (because of the items giving them another one)
	the block values are in arrays. The value used is dependent on the player's inventory,
	which is another array.
	************************************************************************************
	************************************************************************************
	************************************************************************************/
	let woodClickValue=[1,2,3,4,5,6];
	let stoneClickValue=[2,3,4,5,6,7];
	let ironClickValue=[3,4,5,6,7,8];
	let goldClickValue=[4,5,6,7,8,9];
	let diamondClickValue=[5,6,7,8,9,10];
	//achievement counter
	let achievementCounter=0;
	//shop items
	let pickaxes=["woodPickaxe","stonePickaxe","ironPickaxe","goldPickaxe","diamondPickaxe"];
	let axes=["woodAxe","stoneAxe","ironAxe","goldAxe","diamondAxe"];
	let redstone=["dust","block","repeater"];
	let special=["eyeOfEnder"];
	//change block counter
	let changeBlock=1;
	//sound
	const rollSound = new Audio("../audio/itemEffect.mp3");
	const oofSound = new Audio("../audio/oofSound.mp3");
	$(".clickerImage").click(e => rollSound.play());
	$("#clickerDragon").click(e => oofSound.play());
	bossMusic.pause(); 
	/* end of setting variables */
	/* hiding materials */
	//popups
	$(".popUp").hide();
	$(".popUpContent").hide();
	//timer 
	$(".timer").hide();
	//shop item 
	$(".shopPickaxe").hide();
	$(".shopAxe").hide();
	$(".shopRedstone").hide();
	$(".shopRedstoneDescription").hide();
	$(".shopAxeDescription").hide();
	$(".shopPickaxeDescription").hide();
	//buttons
	$("#btnChange").hide();
	$("#moneyButton").hide();
	//clickers 
	$(".clicker").hide();
	$("#clickerDragon").hide();
	//miscellaneous 
	$("#lblDragon").hide();
	$("#heart").hide();
	$("#bossMusic").hide();
	$("#endImage").hide();
	$("#lblEnd").hide();
	$("#lblCount2").hide();
	$("#lblEnd2").hide();
	//time record
	$("#timeRecordsList").hide();
	$("#timeRecordsListBackground").hide();
	//text
	$("#lblEndtext1").hide();
	$("#lblEndtext2").hide();		
	$("#lblEndtext3").hide();
	$("#lblEndtext4").hide();
	/* end of hiding materials */
	/* show beginning elements */
	$("#shop_redstoneDust").show();
	$("#shop_woodAxe").show();
	$("#shop_woodPickaxe").show();
	$("#shop_eyeOfEnder").show();
	$("#shop_redstoneDustDescription").show();
	$("#shop_woodAxeDescription").show()
	$("#shop_woodPickaxeDescription").show()
	//beginning clicker
	$("#clickerWood").show();
	//name popup
	$("#namePopup").show();
	/* end of show beginning elemnt*/
	/************************************************************************************
	************************************************************************************
	************************************************************************************
	String function below takes out the first letter of name and makes it capital, then put
	it back into the name
	************************************************************************************
	************************************************************************************
	************************************************************************************/
	$("#btnPlay").unbind().click(function(event){
		let name=$("#txtNameInput").val();
		let capital=name.charAt(0).toUpperCase();
		name=name.substring(1);
		let finalName=capital+name;
		if(finalName.length>=9&&finalName.length<16)
		{
			$("#lblName").css("font-size","30px");
			$("#lblName").text(finalName);
			$("#namePopup").hide();
			$("#namePopUpContent").hide();
		}
		else if(finalName.length<9)
		{
			$("#lblName").text(finalName);
			$("#namePopup").hide();
			$("#namePopUpContent").hide();
		}
		else
		{
			$("#nameTxt").text("Your name is too long!");
		}
		if(finalName=="Krnic")
		{
			$("#moneyButton").show();
			$("#lblName").text(finalName);
			$("#namePopup").hide();
			$("#namePopUpContent").hide();
		}
	});//end of btnPlay click
	/* click animation */
	$(".clickerImage").mousedown(function(event){
		$(".clickerImage").css("width","9.5%");
	});//end of clicker mousedown
	$(".clickerImage").mouseup(function(event){
		$(".clickerImage").css("width","10%");
	});//end of clicker mouseup
	$(".clickerImage").mouseleave(function(event){
		$(".clickerImage").css("width","10%");
	});//end of clicker mouseleave
	$("#clickerImageDragon").mousedown(function(event){
		$("#clickerImageDragon").css("width","37%");
		$("#clickerImageDragon").css("height","52%");
	});//end of clicker mousedown
	$("#clickerImageDragon").mouseup(function(event){
		$("#clickerImageDragon").css("width","40%");
		$("#clickerImageDragon").css("height","55%");
	});//end of clicker mouseup
	$("#clickerImageDragon").mouseleave(function(event){
		$("#clickerImageDragon").css("width","40%");
	});//end of clicker mouseleave
	/* end of click animations */
	/* shop */
	$("#shopStart").unbind().click(function(event){
		$("#shopPopUp").show();
		$("#shopPopUpContent").show();
		/* redstone */
		if(count>=20&&checkInventory("dust")!=true)
		{
			$("#shop_redstoneDust").css("filter","brightness(100%)");
			$("#shop_redstoneDustDescription").css("filter","brightness(100%)");
			$("#shop_redstoneDust").unbind().click(function(event){
				count=count-20;								
				autoItem(5000);
				inventory.push(redstone.shift());
				if(redstone[0]!="dust")
				{
					$("#shop_redstoneDust").hide();
					$("#shop_redstoneDustDescription").hide();
				}
				if(redstone[0]=="block")
				{
					$("#shop_redstoneBlock").show();
					$("#shop_redstoneBlockDescription").show();
					$("#lblRedstonePrice").html("<p>2000</p>");
					changeDescriptionBrightness(2000,"Redstone");
				}	
				$("#lblCount").text(count);
			});//end of redstoneDust item click
		}
		if(count>=2000&&checkInventory("block")!=true)
		{
			$("#shop_redstoneBlock").css("filter","brightness(100%)");
			$("#shop_redstoneBlockDescription").css("filter","brightness(100%)");
			$("#shop_redstoneBlock").unbind().click(function(event){
				count-=2000;
				autoItem(1000);
				inventory.push(redstone.shift());
				if(redstone[0]!="block")
				{
					$("#shop_redstoneBlock").hide();
					$("#shop_redstoneBlockDescription").hide();
				}
				if(redstone[0]=="repeater")
				{
					$("#shop_redstoneRepeater").show();
					$("#shop_redstoneRepeaterDescription").show();
					$("#lblRedstonePrice").html("<p>20000</p>");
					changeDescriptionBrightness(20000,"Redstone");
				}
				$("#lblCount").text(count);
			});//end of redstoneBlock item click
		}
		if(count>=20000&&checkInventory("repeater")!=true)
		{
			$("#shop_redstoneRepeater").css("filter","brightness(100%)");
			$("#shop_redstoneRepeaterDescription").css("filter","brightness(100%)");
			$("#shop_redstoneRepeater").unbind().click(function(event){
				if(checkInventory("repeater")!=true)
				{
					count-=20000;
					autoItem(500);
					inventory.push(redstone.shift());
					if(redstone[0]!="repeater")
					{
						$("#shop_redstoneRepeater").css("filter","brightness(25%)");
						$(".shopRedstoneDescription").css("filter","brightness(35%)");
						$(".shopRedstoneDescription").css("color","white");
						$(".shopRedstoneDescription").html("<p>SOLD OUT<p>");
					}				
					$("#lblCount").text(count);
				}
			});//end of redstoneRepeater item click
		}
		/* pickaxe */
		if(count>=1000&&checkInventory("woodPickaxe")!=true)
		{
			$("#shop_woodPickaxe").css("filter","brightness(100%)");
			$("#shop_woodPickaxeDescription").css("filter","brightness(100%)");
			$("#shop_woodPickaxe").unbind().click(function(event){
				count-=1000;
				inventory.push(pickaxes.shift());
				if(pickaxes[0]!="woodPickaxe")
				{
					$("#shop_woodPickaxe").hide();
					$("#shop_woodPickaxeDescription").hide();
				}
				if(pickaxes[0]=="stonePickaxe")
				{
					$("#shop_stonePickaxe").show();
					$("#shop_stonePickaxeDescription").show();
					$("#btnChange").show();
					$("#lblPickaxesPrice").html("<p>5000</p>")
					changeDescriptionBrightness(5000,"Pickaxe");
				}
				$("#lblCount").text(count);
				if(find(banner,"stone")==true&&checkInventory("woodPickaxe")==true)
				{
					bannerInventory.push(banner.shift());
					$("#achievementBannerImg").attr("src","../images/clickers/stone.png");
				}
			});//end of shop_woodPickaxe click
		}
		if(count>=5000&&checkInventory("stonePickaxe")!=true)
		{
			$("#shop_stonePickaxe").css("filter","brightness(100%)");
			$("#shop_stonePickaxeDescription").css("filter","brightness(100%)");
			$("#shop_stonePickaxe").unbind().click(function(event){
				count-=5000;
				inventory.push(pickaxes.shift());
				if(pickaxes[0]!="stonePickaxe")
				{
					$("#shop_stonePickaxe").hide();
					$("#shop_stonePickaxeDescription").hide();
				}
				if(pickaxes[0]=="ironPickaxe")
				{
					$("#shop_ironPickaxe").show();
					$("#shop_ironPickaxeDescription").show();
					$("#lblPickaxesPrice").html("<p>15000</p>")
					changeDescriptionBrightness(15000,"Pickaxe");
				}
				$("#lblCount").text(count);
				if(find(banner,"ironOre")==true&&checkInventory("stonePickaxe")==true)
				{
					bannerInventory.push(banner.shift());
					$("#achievementBannerImg").attr("src","../images/clickers/ironOre.png");
				}
			});//end of shop_stonePickaxe click
		}
		if(count>=15000&&checkInventory("ironPickaxe")!=true)
		{
			$("#shop_ironPickaxe").css("filter","brightness(100%)");
			$("#shop_ironPickaxeDescription").css("filter","brightness(100%)");
			$("#shop_ironPickaxe").unbind().click(function(event){
				count-=15000;
				inventory.push(pickaxes.shift());
				if(pickaxes[0]!="ironPickaxe")
				{
					$("#shop_ironPickaxe").hide();
					$("#shop_ironPickaxeDescription").hide();
				}
				if(pickaxes[0]=="goldPickaxe")
				{
					$("#shop_goldPickaxe").show();
					$("#shop_goldPickaxeDescription").show();
					$("#lblPickaxesPrice").html("<p>500000</p>")
					changeDescriptionBrightness(500000,"Pickaxe");
				}
				$("#lblCount").text(count);
				if(find(banner,"goldOre")==true&&checkInventory("ironPickaxe")==true)
				{
					bannerInventory.push(banner.shift());
					$("#achievementBannerImg").attr("src","../images/clickers/goldOre.png");
				}
			});//end of shop_ironPickaxe click
		}
		if(count>=500000&&checkInventory("goldPickaxe")!=true)
		{
			$("#shop_goldPickaxe").css("filter","brightness(100%)");
			$("#shop_goldPickaxeDescription").css("filter","brightness(100%)");
			$("#shop_goldPickaxe").unbind().click(function(event){
				count-=500000;
				inventory.push(pickaxes.shift());
				if(pickaxes[0]!="goldPickaxe")
				{
					$("#shop_goldPickaxe").hide();
					$("#shop_goldPickaxeDescription").hide();
				}
				if(pickaxes[0]=="diamondPickaxe")
				{
					$("#shop_diamondPickaxe").show();
					$("#shop_diamondPickaxeDescription").show();
					$("#lblPickaxesPrice").html("<p>1000000</p>")
					changeDescriptionBrightness(1000000,"Pickaxe");				
				}				
				$("#lblCount").text(count);
				if(find(banner,"diamondOre")==true&&checkInventory("goldPickaxe")==true)
				{
					bannerInventory.push(banner.shift());
					$("#achievementBannerImg").attr("src","../images/clickers/diamondOre.png");
				}
			});//end of shop_goldPickaxe click
		}
		if(count>=1000000&&checkInventory("diamondPickaxe")!=true)
		{
			$("#shop_diamondPickaxe").css("filter","brightness(100%)");
			$("#shop_diamondPickaxeDescription").css("filter","brightness(100%)");
			$("#shop_diamondPickaxe").unbind().click(function(event){
				if(checkInventory("diamondPickaxe")!=true)
				{
					count-=1000000;
					inventory.push(pickaxes.shift());
					if(pickaxes[0]!="diamondPickaxe")
					{
						$("#shop_diamondPickaxe").css("filter","brightness(25%)");
						$(".shopPickaxeDescription").css("filter","brightness(35%)");
						$(".shopPickaxeDescription").css("color","white");
						$(".shopPickaxeDescription").html("<p>SOLD OUT<p>");
						$(".shopPickaxeDescription").css("right","25%");
					}
					$("#lblCount").text(count);		
				}
			});//end of shop_diamondPickaxe click
		}
		/* axes */
		if(count>=100&&checkInventory("woodAxe")!=true)
		{
			$("#shop_woodAxe").css("filter","brightness(100%)");
			$("#shop_woodAxeDescription").css("filter","brightness(100%)");
			$("#shop_woodAxe").unbind().click(function(event){
				count=count-100;
				inventory.push(axes.shift());
				if(axes[0]!="woodAxe")
				{
					$("#shop_woodAxe").hide();
					$("#shop_woodAxeDescription").hide();
				}
				if(axes[0]=="stoneAxe")
				{
					$("#shop_stoneAxe").show();
					$("#shop_stoneAxeDescription").show();
					$("#lblAxesPrice").html("<p>500</p>")
					changeDescriptionBrightness(500,"Axe");
				}
				$("#lblCount").text(count);
				if(count<=19&&checkInventory("dust")!=true)
				{
					$("#shop_redstoneDust").css("filter","brightness(50%)");
					$(".shopRedstoneDescription").css("filter","brightness(50%)");
				}
			});//end of shop_woodAxe click
		}
		if(count>=500&&checkInventory("stoneAxe")!=true)
		{
			$("#shop_stoneAxe").css("filter","brightness(100%)");
			$("#shop_stoneAxeDescription").css("filter","brightness(100%)");
			$("#shop_stoneAxe").unbind().click(function(event){
				count-=500;
				inventory.push(axes.shift());
				if(axes[0]!="stoneAxe")
				{
					$("#shop_stoneAxe").hide();
					$("#shop_stoneAxeDescription").hide();
				}
				if(axes[0]=="ironAxe")
				{
					$("#shop_ironAxe").show();
					$("#shop_ironAxeDescription").show();
					$("#lblAxesPrice").html("<p>1000</p>")
					changeDescriptionBrightness(1000,"Axe");
				}
				$("#lblCount").text(count);
			});//end of shop_stoneAxe click
		}
		if(count>=1000&&checkInventory("ironAxe")!=true)
		{
			$("#shop_ironAxe").css("filter","brightness(100%)");
			$("#shop_ironAxeDescription").css("filter","brightness(100%)");
			$("#shop_ironAxe").unbind().click(function(event){
				count-=1000;
				inventory.push(axes.shift());
				if(axes[0]!="ironAxe")
				{
					$("#shop_ironAxe").hide();
					$("#shop_ironAxeDescription").hide();
				}
				if(axes[0]=="goldAxe")
				{
					$("#shop_goldAxe").show();
					$("#shop_goldAxeDescription").show();
					$("#lblAxesPrice").html("<p>5000</p>")
					changeDescriptionBrightness(5000,"Axe");
				}
				$("#lblCount").text(count);
			});//end of shop_ironAxe click
		}
		if(count>=5000&&checkInventory("goldAxe")!=true)
		{
			$("#shop_goldAxe").css("filter","brightness(100%)");
			$("#shop_goldAxeDescription").css("filter","brightness(100%)");
			$("#shop_goldAxe").unbind().click(function(event){
				count-=5000;
				inventory.push(axes.shift());
				if(axes[0]!="goldAxe")
				{
					$("#shop_goldAxe").hide();
					$("#shop_goldAxeDescription").hide();
				}
				if(axes[0]=="diamondAxe")
				{
					$("#shop_diamondAxe").show();
					$("#shop_diamondAxeDescription").show();
					$("#lblAxesPrice").html("<p>10000</p>")
					changeDescriptionBrightness(10000,"Axe");
				}
				$("#lblCount").text(count);
			});//end of shop_goldAxe click
		}
		if(count>=10000&&checkInventory("diamondAxe")!=true)
		{
			$("#shop_diamondAxe").css("filter","brightness(100%)");
			$("#shop_diamondAxeDescription").css("filter","brightness(100%)");
			$("#shop_diamondAxe").unbind().click(function(event){
				if(checkInventory("diamondAxe")!=true)
				{	
					count-=10000;
					inventory.push(axes.shift());
					if(axes[0]!="diamondAxe")
					{
						$("#shop_diamondAxe").css("filter","brightness(25%)");
						$(".shopAxeDescription").css("filter","brightness(35%)");
						$(".shopAxeDescription").css("color","white");
						$(".shopAxeDescription").html("<p>SOLD OUT<p>");
						$(".shopAxeDescription").css("right","25%");
					}
					$("#lblCount").text(count);
				}
			});//end of shop_diamondAxe click
		}
		if(count>=10000000&&checkInventory("eyeOfEnder")!=true)
		{
			$("#shop_eyeOfEnder").css("filter","brightness(100%)");
			$("#shop_eyeOfEnderDescription").css("filter","brightness(100%)");
			$("#shop_eyeOfEnderDescription").html("<p>Gives the ability to access <b>The End</b>: One time use.</p>");
			$("#shop_eyeOfEnderDescription").css("right","11%");
			$("#shop_eyeOfEnder").unbind().click(function(event){
					count-=10000000;
					inventory.unshift(special.shift());
					if(special[0]!="eyeOfEnder")
					{
						$("#shop_eyeOfEnder").css("filter","brightness(25%)");
						$("#shop_eyeOfEnderDescription").css("filter","brightness(35%)");
						$("#shop_eyeOfEnderDescription").css("color","white");
						$("#shop_eyeOfEnderDescription").html("<p>SOLD OUT<p>");
						$("#shop_eyeOfEnderDescription").css("right","25%");
					}
					$("#lblCount").text(count);
					$("#endImage").show();
					$("#lblEnd").show();
			});//end of shop_eyeOfEnder click
		}
	});//end of shop click
	/* end of shop */
	/* clicker values */
	//wood
	$("#clickerImageWood").mousedown(function(event){
		count+=clickerAddAmount("Axe",woodClickValue);
		$("#lblCount").text(count);
	});//end of clicker mousedown
	$("#clickerImageWood").mouseover(function(event){
		$("#clickerImageWood").css("cursor", "url(../images/cursors/hand.png), auto");
	});//end of mouseover
	//stone
	$("#clickerImageStone").mousedown(function(event){
		count+=clickerAddAmount("Pickaxe",stoneClickValue);
		$("#lblCount").text(count);
	});//end of clicker mousedown
	$("#clickerImageStone").mouseover(function(event){
		$("#clickerImageStone").css("cursor", "url(../images/cursors/hand.png), auto");
	});//end of mouseover
	//iron
	$("#clickerImageIronOre").mousedown(function(event){
		count+=clickerAddAmount("Pickaxe",ironClickValue);
		$("#lblCount").text(count);
	});//end of clicker mousedown
	$("#clickerImageIronOre").mouseover(function(event){
		$("#clickerImageIronOre").css("cursor", "url(../images/cursors/hand.png), auto");
	});//end of mouseover
	//gold
	$("#clickerImageGoldOre").mousedown(function(event){
		count+=clickerAddAmount("Pickaxe",goldClickValue);
		$("#lblCount").text(count);
	});//end of clicker mousedown
	$("#clickerImageGoldOre").mouseover(function(event){
		$("#clickerImageGoldOre").css("cursor", "url(../images/cursors/hand.png), auto");
	});//end of mouseover
	//diamond
	$("#clickerImageDiamondOre").mousedown(function(event){
		count+=clickerAddAmount("Pickaxe",diamondClickValue);
		$("#lblCount").text(count);
	});//end of clicker mousedown
	$("#clickerImageDiamondOre").mouseover(function(event){
		$("#clickerImageDiamondOre").css("cursor", "url(../images/cursors/hand.png), auto");
	});//end of mouseover
	$("#clickerImageDragon").mousedown(function(event){
		let subtract=0;
		subtract-=1;
		health+=subtract;
		$("#lblCount2").text(health);
		if(health<=0)
		{
			bossMusic.pause();
			$("#winPopUp").show();
			$("#winPopUpContent").show();
			$("#lblDragon").hide();
			$(".timer").hide();
			clearInterval(time);
			timeRecords.push(timeValue);
			/************************************************************************************
			************************************************************************************
			 bubble sort below sorts the best/least time used to beat the boss and displays
			 the time
			************************************************************************************			
			***********************************************************************************/
			for(let pass=0;pass<timeRecords.length;pass++)
			{
				for(index=0;index<timeRecords.length-1;index++)
				{
					if(timeRecords[index]>timeRecords[index+1])
					{
						tempNum=timeRecords[index+1];
						timeRecords[index+1]=timeRecords[index];
						timeRecords[index]=tempNum;
					}
				}
			}
			$("#lblBestTime").text(timeRecords[0]);
		}
	});//end of clicker mousedown
	$("#clickerImageDragon").mouseover(function(event){
		$("#clickerImageDragon").css("cursor", "url(../images/cursors/hand.png), auto");
	});//end of mouseover
	/* end of click value */
	/* change button */
	$("#btnChange").click(function(event){
		if(bannerInventory[changeBlock]=="diamondOre")
		{
			$(".clicker").hide();
			$("#clickerDiamondOre").show();
			$("body").css("background-image","url(../images/backgrounds/diamondBackground.jpg)");
			if(bannerInventory.length!=5)
			{
				changeBlock++;
			}
			else
			{
				changeBlock=0;
			}
		}
		else if(bannerInventory[changeBlock]=="goldOre")
		{
			$(".clicker").hide();
			$("#clickerGoldOre").show();
			$("body").css("background-image","url(../images/backgrounds/goldBackground.jpeg)");
			if(bannerInventory.length!=4)
			{
				changeBlock++;
			}
			else
			{
				changeBlock=0;
			}		
		}
		else if(bannerInventory[changeBlock]=="ironOre")
		{
			$(".clicker").hide();
			$("#clickerIronOre").show();
			$("body").css("background-image","url(../images/backgrounds/ironbackground.jpeg)");
			if(bannerInventory.length!=3)
			{
				changeBlock++;
			}
			else
			{
				changeBlock=0;
			}
		}
		else if(bannerInventory[changeBlock]=="stone")
		{
			$(".clicker").hide();
			$("#clickerStone").show();
			$("body").css("background-image","url(../images/backgrounds/cave.png)")
			if(bannerInventory.length!=2)
			{
				changeBlock++;
			}
			else
			{
				changeBlock=0;
			}
		}
		else
		{
			$(".clicker").hide();
			$("#clickerWood").show();
			$("body").css("background-image","url(../images/backgrounds/surface.jpg)");
			if(bannerInventory.length!=1)
			{
				changeBlock++;
			}

		}
	});//end of btnChange click
	/* end of change button */
	/* POPUPS */
	//settings
	$("#settingsImage").click(function(event){
		$("#settingsPopUp").show();
		$("#settingsPopUpContent").show();
	});//end of settingsImage click
	//cheat button
	$("#moneyButton").click(function(event){
		let add=0;
		add+=1000000000;
		count+=add;
		$("#lblCount").text(count);
	});//end of moneyButton click
	//help
	$("#helpStart").click(function(event){
		$("#helpPopUp").show();
		$("#helpPopUpContent").show();
	});//end of helpImage click
	$("#nextPage").click(function(event){
		$("#helpPopUp").hide();
		$("#helpPopUpContent").hide();
		$("#helpPopUp2").show();
		$("#helpPopUpContent2").show();
	});//end of nextPage click
	$("#nextPage2").click(function(event){
		$("#helpPopUp2").hide();
		$("#helpPopUpContent2").hide();
		$("#helpPopUp3").show();
		$("#helpPopUpContent3").show();
	});//end of nextPage2 click
	$("#previousPage").click(function(event){
		$("#helpPopUp2").hide();
		$("#helpPopUpContent2").hide();
		$("#helpPopUp").show();
		$("#helpPopUpContent").show();
	});//end of previousPage click
	$("#previousPage3").click(function(event){
		$("#helpPopUp3").hide();
		$("#helpPopUpContent3").hide();
		$("#helpPopUp2").show();
		$("#helpPopUpContent2").show();
	});//end of previousPage click

	//close button
	$(".btnClose").click(function(event){
		$(".popUp").hide();
		$(".popUpContent").hide();
	});//end of btnClose click
	$("#btnCloseShop").unbind().click(function(event){
		$(".popUp").hide();
		$(".popUpContent").hide();
		if(checkInventory("woodPickaxe")==true&&achievementCounter==0) 
		{
			achvievementAnimation();
			achievementCounter++;
		}
		if(checkInventory("stonePickaxe")==true&&achievementCounter==1) 
		{
			achvievementAnimation();
			achievementCounter++;
		}
		if(checkInventory("ironPickaxe")==true&&achievementCounter==2) 
		{
			achvievementAnimation();
			achievementCounter++;
		}
		if(checkInventory("goldPickaxe")==true&&achievementCounter==3) 
		{
			achvievementAnimation();
			achievementCounter++;
		}
	});//end of btnCloseShop click
	/* end of POPUPS */
	/* END */		
	$("#endStart").click(function(event){
		health=300;
		inventory.shift();
		$("#bossMusic").show();
		bossMusic.play();
		mainMusic.pause();
		$("#lblCount").hide();
		$("#lblCount2").show();
		$("#lblCount2").text(health);
		$("#lblCount2").css("font-size","80px");
		$("#lblCount2").css("padding","6px");
		$("body").css("background-image", "url(../images/backgrounds/endBackground.jpg");
		$(".clicker").hide();
		$("#dollarSign").hide();
		$(".changeButton").hide();
		$(".labels").hide();
		$("#helpImage").hide();
		$("#shopImage").hide();
		$("#endImage").hide();
		$("#heart").show();
		$("#lblEndtext1").fadeIn(3000,function(){
			$("#lblEndtext1").fadeOut(3000,function(){
				$("#lblEndtext2").fadeIn(3000,function(){
					$("#lblEndtext2").fadeOut(3000,function(){
						$("#lblEndtext3").fadeIn(3000,function(){
							$("#lblEndtext3").fadeOut(3000,function(){
								$("#lblEndtext4").fadeIn(3000,function(){
									$("#lblEndtext4").fadeOut(3000,function(){
										$("#clickerDragon").fadeIn(10,function(){
											$("#lblDragon").fadeIn();
											$(".timer").show();
											timeValue=0;
											$("#lblTime").text(timeValue);
											time=setInterval(addTime,1000)
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});//end of endImage click
	$("#btnContinue").click(function(event){
		$("#lblCount").show();
		$("#lblCount2").hide()
		$("#lblCount").text(count);
		$("body").css("background-image", "url(../images/backgrounds/surface.jpg");
		$("#clickerWood").show();
		$("#dollarSign").show();
		$("#btnChange").show();
		$("#lblStore").show();
		$("#lblHelp").show();
		$("#lblEnd2").show();
		$("#helpImage").show();
		$("#shopImage").show();
		$("#endImage").hide();
		$("#clickerDragon").hide();
		$("#lblDragon").hide();
		$("#heart").hide();
		$("#timeRecordsList").show();
		$("#timeRecordsListBackground").show();
	});
	/* end of END */
});//end of document ready
function autoItem(timeInterval) 
{
	setInterval(intervalAddAmount, timeInterval);
}
/************************************************************************************
************************************************************************************
************************************************************************************
function without parameters: this function is the action that occurs when it is put into
the interval functions
************************************************************************************
************************************************************************************/
function intervalAddAmount()
{
	count++;
	$("#lblCount").text(count);
}
/***************************************
************************************************************************************
************************************************************************************
function without return value: function below only adds time, therefore it does not
need to return
************************************************************************************
************************************************************************************
***************************************/
function addTime()
{
	timeValue++;
	$("#lblTime").text(timeValue);
}
/*********************************
************************************************************************************
************************************************************************************
function with parameters: this function has 1 parameter. blockvalue refers to the
amount of money you get for clicking a certain type of block. 
************************************************************************************
************************************************************************************
*********************************/
function addAmount(blockValue)
{
	let add=0;
	add+=blockValue;
	return add;
}
/************************************
************************************************************************************
************************************************************************************
function with return value: the function checks for if you have an item that can 
increase the amount you earn per click.
 ************************************************************************************
 ************************************************************************************
 ************************************************************************************ 
************************************/
function checkInventory(checkItem)
{
	for(let x=0;x<inventory.length;x++)
	{
		if(inventory[x]==checkItem)
		{
			return true;
		}
	}
}
function changeDescriptionBrightness(nextItemPrice,itemType)
{
	if(count<nextItemPrice)
	{
		$(".shop"+itemType+"Description").css("filter","brightness(50%)");
	}
}
function clickerAddAmount(typeOfItem,clickerVariable)
{
	let add=0;
	if(checkInventory("diamond"+typeOfItem)==true)
	{
		add=clickerVariable[5];
	}
	else if(checkInventory("gold"+typeOfItem)==true)
	{
		add=clickerVariable[4];
	}
	else if(checkInventory("iron"+typeOfItem)==true)
	{
		add=clickerVariable[3];
	}
	else if(checkInventory("stone"+typeOfItem)==true)
	{
		add=clickerVariable[2];
	}
	else if(checkInventory("wood"+typeOfItem)==true)
	{
		add=clickerVariable[1];
	}
	else
	{
		add=clickerVariable[0];
	}
	return add;
}
function find(variable,item)
{
	for(let x=0;x<variable.length;x++)
		{
			if(variable[x]==item)
			{
				return true;
			}
		}
}
function achvievementAnimation()
{
	$("#achievementBanner").animate({top:"13.5%"});
	$("#achievementBanner").delay(4000);
	$("#achievementBanner").animate({top:"3%"});
}
function changeBlockFunction(inventoryVariable,indexNumber)
{
	if(inventoryVariable.length!=indexNumber)
	{
		changeBlock++;
	}
	else
	{
		changeBlock=0;
	}
}