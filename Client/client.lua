CreateThread(function()
	while not NetworkIsPlayerActive(PlayerId())do
		Wait(0);
	end
	
    while true do
		local PlayerPED=GetPlayerPed(-1);
		local sleep=0;
			
		if(IsControlJustPressed(1,Config.Bindkey)and GetLastInputMethod(0))then
			if(not(UI))then
				UI=true;
				
				SetNuiFocus(UI,UI);
				SendNUIMessage({Show=UI,Config=Config,});
			else
				sleep=250;
			end
		end
		Wait(sleep);
	end
end)


RegisterNUICallback("Navigation:Mark",function(data,cb)
	if(UI)then
		SetNewWaypoint(data.pos[1],data.pos[2]);
	end
	
	cb("ok");
end)

RegisterNUICallback("Navigation:CloseUI",function(data,cb)
	if(UI)then
		UI=false;
		
		SetNuiFocus(UI,UI);
		SendNUIMessage({Show=UI,});
	end
	
	cb("ok");
end)