var randomcolors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userpattern = [];
var started = false;
var level = 0;
var click = 0;


$(".btn").click(function(){
    var user_chosen_color = $(this).attr("id");
    userpattern.push(user_chosen_color)
    playSound(user_chosen_color)
    animate(user_chosen_color)
    setTimeout(function(){
        $("#" + user_chosen_color).removeClass("pressed")
    }, 100)

    var pass = checkanswer();
    if(!pass) 
    {
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 300)
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        level = 0;
        $("#level-title").text("Game Over, Press any key to restart")
        started = false;
        gamepattern = [];
    }
    else
    {
        click++;
        if(click == level) 
        {
            console.log("Success");
            setTimeout(nextSequence, 700);
        }
    }

})



function checkanswer()
{
    for(var i = 0;i<userpattern.length;i++)
    {
        if(userpattern[i]!=gamepattern[i]) 
        {
            return false;
        }
    }
    return true;
}

function nextSequence()
{
    click = 0;
    level++;
    var txt = "Level " + level.toString();
    $("#level-title").text(txt)

    var random_number = Math.random();
    random_number*=4;
    random_number = Math.floor(random_number)

    var randomChosenColour = randomcolors[random_number]
    gamepattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour) 
    console.log(gamepattern)
    userpattern = [];
}


function animate(chosencolor)
{
    $("#" + chosencolor).addClass("pressed")
}

function playSound(randomChosenColour)
{
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

$(document).keypress(function() {
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
  });