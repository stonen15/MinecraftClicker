let count=0;
$(document).ready(function($){
	let multiplier=1;
	$("#clicker").click(function(event){
		let add=0;
		add++;
		add*=multiplier;
		count+=add;
		$("#lblCount").text(count);
	});//end of btnTest click

	$("#btnStore").click(function(event){

	});//end

	$("#btnHelp").click(function(event){
	});//end

	$("#btnSettings").click(function(event){
	});//end


	$("#btnDItem").click(function(event){
		multiplier++;
		//$("#btnDItem").hide();
	});//end


	$("#btnCItem").click(function(event){
		constantItem();
		$("#btnCItem").attr("disabled",true);
	});//end




});//end of document ready
function constantItem() 
{
	setInterval(addAmount, 500);
}
function addAmount()
{
	count++;
	$("#lblCount").text(count);
}
