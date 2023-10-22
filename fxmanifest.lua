fx_version "adamant"
game "gta5"
lua54 "yes"

author "dortey_"
name "[SCAR] Navigation"
description "[SCAR] Navigation by dortey_"
version "1.0.0"

ui_page "UI/main.html"

files {
	"UI/main.html",
	"UI/main.css",
	"UI/main.js",
}

client_scripts {
	"config.lua",
	"Client/client.lua",
}

escrow_ignore {
    "config.lua",
	"Client/client.lua",
}