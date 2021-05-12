let countdownTimer = 5;
let totalTime = 5;
let timer;
let score = 0;
let completeWords = [];
let words = {
    "5": ["smile","beach","house","alone","world","water","jocks","month","angel","party","piano","laugh","tiger","faith","earth","river","smile","watch","admin","santa","anime"],
    "7": ["goodbye","morning","perfect","special","pumpkin","country","monster","dolphin","teacher","forever","holiday","silence","courage","harmony","problem","musical","dancing"],
    "9": ["Nutrition","Crocodile","Education","identical","chocolate","christmas","adventure","knowledge","pollution","beautiful","celebrate","president","halloween","affection","vegetable","invisible"],
    "11": ["Undemanding","Syllabicate","Personality","Exterminate","Photography","Responsible","Accessories","Agriculture","Certificate","Abomination","Personality","Cleanliness","Anniversary","Serendipity"],
    "13": ["Righteousness","Determination","Revolutionary","Reincarnation","Concentration","Determination","Unconditional","Embarrassment","Mathematician","International","Sportsmanship","Reforestation"],
    "15": ["Congratulations","Procrastination","Accomplishments","Characteristics","Acknowledgement","Mischievousness","Trustworthiness","Kindheartedness","Procrastinating","Confidentiality","Experimentation"],
    "17": ["Telecommunication","Commercialization","Interdisciplinary","Chemiluminescence","Commercialisation","Irreconcilability","Radiobroadcasting","Comprehensibility","Desynchronization","Inappropriateness","Individualisation"],
    "19": ["Don't step on the broken glass.","I'd rather be a bird than a fish.","The book is in front of the table.","Nobody loves a pig wearing lipstick.","He shaved the peach to prove a point.","Flying fish flew by the space station."],
    "21": ["Situps are a terrible way to end your day.","The sky is clear; the stars are twinkling.","It's a skateboarding penguin with a sunhat!","The quick brown fox jumps over the lazy dog.","The best key lime pie is still up for debate."],
    "23": ["A kangaroo is really just a rabbit on steroids.","Everyone was busy, so I went to the movie alone.","I caught my squirrel rustling through my gym bag.","I want a giraffe, but I'm a turtle eating waffles.","Nothing is as cautiously cuddly as a pet porcupine."],
    "25": ["He was an introvert that extroverts seemed to love.","As he looked out the window, he saw a clown walk by.","They're playing the piano while flying in the plane.","They got there early, and they got really good seats.","I am counting my calories, yet I really want dessert."],
    "27": ["The sudden rainstorm washed crocodiles into the ocean.","The light that burns twice as bright burns half as long.","The fish listened intently to what the frogs had to say.","The swirled lollipop had issues with the pop rock candy.","It doesn't sound like that will ever be on my travel list."],
    "29": ["I currently have 4 windows opened up, and I don’t know why.","I would be delighted if the sea were full of cucumber juice.","Poison ivy grew through the fence they said was impenetrable.","There should have been a time and a place, but this wasn't it.","The elephant didn't want to talk about the person in the room."],
    "31": ["A suit of armor provides excellent sun protection on hot days.","He wondered if it could be called a beach if there was no sand.","They did nothing as the raccoon attacked the lady’s bag of food.","Improve your goldfish's physical fitness by getting him a bicycle.","I met an interesting turtle while the song on the radio blasted away."],
    "33": ["The view from the lighthouse excited even the most seasoned traveler.","I may struggle with geography, but I'm sure I'm somewhere around here.","After fighting off the alligator, Brian still had to face the anaconda.","When transplanting seedlings, candied teapots will make the task easier.","His confidence would have been admirable if it wasn't for his stupidity."],
    "35": ["I am happy to take your donation; any amount will be greatly appreciated.","He found the end of the rainbow and was surprised at what he found there.","He watched the dancing piglets with panda bear tummies in the swimming pool.","As the years pass by, we all know owners look more and more like their dogs.","She couldn't decide of the glass was half empty or half full so she drank it."],
    "37": ["Various sea birds are elegant, but nothing is as elegant as a gliding pelican.","He was disappointed when he found the beach to be so sandy and the sun so sunny.","He figured a few sticks of dynamite were easier than a fishing pole to catch fish.","8% of 25 is the same as 25% of 8 and one of them is much easier to do in your head.","He knew it was going to be a bad day when he saw mountain lions roaming the streets."],
    "39": ["The hummingbird's wings blurred while it eagerly sipped the sugar water from the feeder.","His ultimate dream fantasy consisted of being content and sleeping eight hours in a row.","He wondered why at 18 he was old enough to go to war, but not old enough to buy cigarettes.","They say that dogs are man's best friend, but this cat was setting out to sabotage that theory.","The newly planted trees were held up by wooden frames in hopes they could survive the next storm."],
    "41": ["When I cook spaghetti, I like to boil it a few minutes past al dente so the noodles are super slippery.","The group quickly understood that toxic waste was the most effective barrier to use against the zombies.","He used to get confused between soldiers and shoulders, but as a military man, he now soldiers responsibility."]
}
let allLetters = [];
let chrLimit = 5;
let emoji = ["(>_<)","(;-;)","(╥﹏╥)","( ╥ω╥ )","(｡T ω T｡)","( ; ω ; )","(ಥ﹏ಥ)","(* ^ ω ^)","(´ ∀ ` *)","(o^▽^o)","(￣ω￣)","(o･ω･o)","(o´▽`o)","( ´ ω ` )"];

document.getElementById("gameStart").addEventListener("click", startGame);
document.getElementById("replayGame").addEventListener("click", startGame);
document.getElementById("endGame").addEventListener("click", endGame);

let backgroundMusic = new Audio("media/happy_walk.mp3");
backgroundMusic.volume = 0.7;
let nextWordSound = new Audio("media/mixkit-player-jumping-in-a-video-game-2043.wav");
let timeLeftSound = new Audio("media/mixkit-game-ball-tap-2073.wav");

function startGame(){
    backgroundMusic.play();
    resetGame();
    startTime();
    chooseWord();
    document.querySelector(".startGame").style.display="none";
    document.querySelector(".gameArea").style.display="block";
    document.querySelector(".gameOver").style.display="none";
}

function endGame(){
    randomEmoji = emoji[Math.floor(Math.random() * emoji.length)];
    document.querySelector(".gameOver").setAttribute('kaomoji', randomEmoji);
    document.querySelector(".gameOver").style.display="block";
    document.querySelector(".gameArea").style.display="none";
    document.getElementById("showScore").innerHTML = score;
    completeWords.forEach(function(word){
        let wordComplete = document.createElement("span");
        wordComplete.innerText = word;
        document.getElementById("completedWords").append(wordComplete);
    })

    clearInterval(timer);
    totalTime = 5;
    countdownTimer = 5;
    document.querySelector(".timeBar").style.width = "100%";
}

function resetGame(){
    score = 0;
    completeWords = [];
    clearInterval(timer);
    chrLimit = 5;
    totalTime = 5;
    countdownTimer = 5;
    document.getElementById("completedWords").innerHTML = "";
    document.querySelector(".timeBar").style.width = ((countdownTimer/totalTime)*100) + "%";
    document.querySelector(".timeBar").style.backgroundColor = "#6f6f6f";
}

function startTime(){
    timer = setInterval(function(){
        if(countdownTimer <= 0){
            clearInterval(timer);
            endGame();
        }else if(countdownTimer <= 3){
            countdownTimer --;
            document.querySelector(".timeBar").style.width = ((countdownTimer/totalTime)*100) + "%";
            document.querySelector(".timeBar").style.backgroundColor = "#C43F3FFF";
            timeLeftSound.play();
        }else{
            countdownTimer --;
            document.querySelector(".timeBar").style.width = ((countdownTimer/totalTime)*100) + "%";
        }
    }, 1000)
}

function chooseWord(){
    //look through object, if key is same as chr limit, choose a random word
    document.getElementById("word").innerHTML = "";
    let splitWord = [];
    for (let chr in words){
        if (chr == chrLimit){
            //choose a word with the same chr limit in words object
            randomWord = words[chr][Math.floor(Math.random() * words[chr].length)];

            splitWord = randomWord.toLowerCase().split("");

            //add a div to each letter
            splitWord.forEach(function(letter){
                let eachLetterCtn = document.createElement("span");
                eachLetterCtn.classList.add("letterColor");
                eachLetterCtn.innerHTML = letter;

                //append all letters into word
                document.getElementById("word").append(eachLetterCtn);
            })
        }
    }
    //save all letters of chosen word into array
    allLetters = document.querySelectorAll(".letterColor");
}
document.addEventListener('keyup', checkInput);

function checkInput(e) {
    for (let i = 0; i < allLetters.length; i++) {
        if (allLetters[i].innerText === e.key) { // if the pressed key is the same as current letter in the array
            if (allLetters[i].classList.contains("success")){
                continue; //if the current letter is already green, continue
            }else if (allLetters[i-1] === undefined || allLetters[i-1].classList.contains("success") || allLetters[i].classList.contains("error")){
                if (allLetters[i].classList.contains("error")) { //if it's red
                    allLetters[i].classList.remove("error") // remove red class
                }
                allLetters[i].classList.add("success"); //add green class
                checkWord();
                break; //break at each letter;
            }
        }else{
            if (allLetters[i].classList.contains("success")){
                continue; //if current letter is green, continue
            }else{
                //if not add red and break;
                allLetters[i].classList.add("error");
                break;
            }
        }
    }
}

function checkWord(){
        let allGreen = [...allLetters].every(function(span){
            return span.classList.contains("success");
        })
        if(allGreen){
            completeWords.push(document.getElementById("word").innerText);
            score += chrLimit;
            chrLimit += 2;
            chrCount = 0;
            if(chrLimit < 19){
                totalTime = 5;
                countdownTimer = 5;
                document.querySelector(".timeBar").style.width = "100%";
            }else{
                totalTime = 10;
                countdownTimer = 10;
                document.querySelector(".timeBar").style.width = "100%";
            }
            if(chrLimit > 41){
                document.querySelector(".endTitle").innerHTML = "you completed the game!";
                endGame();
            }else{
                nextWordSound.play();
                chooseWord();
            }
        }
}