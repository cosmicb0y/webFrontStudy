/*
This is empty on purpose! Your code to build the resume will go here.
*/

var name = "HyoWon Jang";

var formattedName = HTMLheaderName.replace("%data%", name);



var role = "Undergraduate";

var formattedRole = HTMLheaderRole.replace("%data%", role);

$("#header").prepend(formattedRole);
$("#header").prepend(formattedName);