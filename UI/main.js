const resource=GetParentResourceName();

var antiDoubleClick=false;

var cacheMark;

$(function(){
	var mainContainer=$(".MainUI");
	
	window.addEventListener("message",function(event){
		var item=event.data;
		
		if(item.Show==true){
			cacheMark=null;

			mainContainer.fadeIn();
			
			$(".MainUI").empty();
			$(".MainUI").append(`
				<div class="Title">${item.Config.Texts.UI.Title}</div>

				<div class="List">
					<div class="NavList"></div>
				</div>

				<button class="Button">${item.Config.Texts.UI.ButtonMark}</button>
			`);

			if(item.Config.Positions!=undefined){
				$(".NavList").html(
					showItems(item.Config.Positions, item.Config.Texts.UI.ButtonMark)
				)
			}else{
				$(".NavList").empty();
			}

			$(".Button").on("click",function(){
				if(!antiDoubleClick){
					antiDoubleClick=true;

					$.post("https://"+resource+"/Navigation:Mark",JSON.stringify({pos:cacheMark}));
					
					setTimeout(function(){
						antiDoubleClick=false;
					},200);
				}
			})
		}
		if(item.Show==false){
			mainContainer.fadeOut();
		}
	});
	
	document.onkeyup=function(event){
		if(event.key=="Escape"){
			if(mainContainer.is(":visible")){
				antiDoubleClick=false;
				cacheMark=null;
				
				$.post("https://"+resource+"/Navigation:CloseUI",JSON.stringify({}));
			}
		}
	}
});

function showItems(item,text){
	for(let i=0; i<item.length; i++){
		$(".NavList").append(`
			<div class="List-Items" id="ListItems">
				<div><li>${item[i].name}</li></div>
			</div>
		`);

		$(".List-Items").on("click",function(){
			if(!antiDoubleClick){
				$(this).addClass("List-Items-Active");
				$(".List-Items").not(this).removeClass("List-Items-Active");

				antiDoubleClick=true;
				cacheMark=item[i].xyz;
				
				setTimeout(function(){
					antiDoubleClick=false;
				},200);
			}
		})
	}
}