var neighborRadius=1;
var tableWidth;
var tableHeight;
var lonliness=2;
var overpop=3;
var gmin=3;
var gmax=3;
var interval;
var speed=1000;

function startSimulation(){
	interval=setInterval(step,speed)
}

function stopSimulation(){
	clearInterval(interval)
}

function newTable(width, height, percent){
	tableWidth=width;
	tableHeight=height
	var tableString="<table><tbody>";
		for(i=0; i<height; i++){
			tableString=tableString+"<tr index="+i+">";
			for(w=0;w<width;w++){
				if(Math.random()*100<percent){
					tableString=tableString+'<td class="alive" index='+w+'></td>';	
				}
				else{
					tableString=tableString+'<td class="dead" index='+w+'></td>';
				}
			}
			tableString=tableString+"</tr>";
		}
	tableString=tableString+"</tbody></table>";
	$('#table').html(tableString)
	$('#table td').click(function(event){
	if(event.shiftKey)
			$(this).removeClass('dead').addClass('alive').addClass('wasAlive');
	else if(event.altKey)
		$(this).removeClass('alive').addClass('dead').addClass('wasAlive');
		
	else if($(this).hasClass("alive"))
			$(this).removeClass('alive').addClass('dead').addClass('wasAlive');
			
	else
			$(this).removeClass('dead').addClass('alive').addClass('wasAlive');
		
	})

}



function countAlive(x,y){
	var count=0;
	for(i=x-neighborRadius;i<=x+neighborRadius;i++){
		for(j=y-neighborRadius;j<=y+neighborRadius;j++){
			if($('#table table tr[index='+j+'] td[index='+i+']').hasClass("alive")){
				if(i!=x || j!=y)
				count++
				}
			}
		}
	return count;
}

function step(){
	for(a=0; a<tableWidth; a++){
		for(b=0;b<tableHeight;b++){
			var element=$('#table tr[index='+b+'] td[index='+a+']')
			var isAlive=$(element).hasClass("alive");
			var aliveNeighbors = countAlive(a,b);
			if(isAlive && aliveNeighbors<lonliness)// checks if the current one is alive and if there are two neighbors dead
				$(element).addClass("toDie");
			if(isAlive && aliveNeighbors>overpop)// checks if the current one is alive and if there are two neighbors dead
				$(element).addClass("toDie");
			if(!isAlive && aliveNeighbors>=gmin && aliveNeighbors<=gmax )// checks if the current one is alive and if there are two neighbors dead
				$(element).addClass("toLive");
		}
	}
	$('.toDie').removeClass('alive').removeClass('toDie').addClass('dead').addClass('wasAlive');
	$('.toLive').removeClass('dead').removeClass('toLive').addClass('alive').addClass('wasAlive');
}
