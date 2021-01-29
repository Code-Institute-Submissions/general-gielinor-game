// Constants for areas of quiz content in index.html
const buttonStart = document.getElementById('quiz-start');
const buttonRepeat = document.getElementById('quiz-repeat');
const buttonNext = document.getElementById('quiz-next');
const containerWelcome = document.getElementById('container-welcome');
const containerQuiz = document.getElementById('container-quiz')
const containerGuess  = document.getElementById('container-post-guess');
const responseGuess = document.getElementById('post-guess-content');
const verdictGuess = document.getElementById('post-guess-verdict');
const containerFinal = document.getElementById('container-final');
const answersCorrect = document.getElementById('answers-correct');
const remainingCount = document.getElementById('remaining-questions');
const answers = Array.from(document.getElementsByClassName('buttonAnswer'));
const questionsMax = 30;

//Variables that'll change throughout
let questionCurrent = {};
let questionsCounter;
let questionsRemaining = [];
let questionsCorrect = [];

//Initiating the quiz on start or repeat button being clicked
buttonStart.addEventListener('click', quizStart);
buttonRepeat.addEventListener('click', quizStart);

//The quizStart function will show the questions 
function quizStart() {
    //Hides welcome/final and displays quiz containers
    containerFinal.classList.add('contentHidden');
    containerWelcome.classList.add('contentHidden');
    containerQuiz.classList.remove('contentHidden');
    //Sets the questions remaining to a spread array from questions
    questionsRemaining = [...questions];
    //Sets the counter to 0 as it is the quiz start
    questionsCounter = 0;
    //Loads the questions into index.html
    questionsLoad();
}

function questionsLoad() {
    //checks if there are no questions left or the question count is the max amount for this instance of the game
    if (questionsRemaining.length === 0 || questionsCounter === questionsMax) {
        //displays finishing content
        containerQuiz.classList.add('contentHidden');
        containerFinal.classList.remove('contentHidden');
        let answerPercentage = Math.trunc((questionsCorrect / questionsMax)*100);
        answersCorrect.innerHTML = `${questionsCorrect} / ${questionsMax} - ${answerPercentage}%`
    }
    //increase question count
    questionsCounter++;
    //sets the question to be removed to a random number from the array of remaining questions
    questionToBeRemoved = Math.floor(Math.random() * questionsRemaining.length);
    //sets the current question to the variable questionToBeRemoved from the away of remaining questions
    questionCurrent = questionsRemaining[questionToBeRemoved];
    //sets the questions HTML for the current question
    question.innerHTML = questionCurrent.question;
    //sets the remainingCount innerHTML to display to the user how many questions they have left
    remainingCount.innerHTML = `<p>Questions remaining: ${questionsMax - questionsCounter}</p>`;
    //credit for adapted forEach loop (See README.md for details) - Used to iterate through the answers dataSet and set the innerText of each answer button to the correct text
    answers.forEach(answer => { let i = answer.dataset[`number`]; answer.innerText = questionCurrent[`answer${i}`];});
    //removes current question from the array of remaining questions
    questionsRemaining.splice(questionToBeRemoved, 1);
}

//Credit for forEach loop functionality - See README.md for more details
answers.forEach(answer => {
    //checks to see if the user clicks any of the answer buttons
    answer.addEventListener('click', userGuess => {
        //sets their guess to variable and shows the post guess content
        const selectedAnswer = userGuess.target.dataset[`number`];
        containerGuess.classList.remove('contentHidden'); 
        containerQuiz.classList.add('contentHidden');
        //changes the innerHTML of the post guess message based on whether it was correct
        if (selectedAnswer === questionCurrent.correct) {
            //changes the innerHTML of the verdict to a random response within an array
            verdictGuess.innerHTML = `<h2>${correctResponses[Math.floor(Math.random() * correctResponses.length)].message} <i class="fas fa-smile-beam"></i></h2>`;
            responseGuess.innerHTML = questionCurrent.messageCorrect;
            questionsCorrect++;
        } else {
            //changes the innerHTML of the verdict to a random response within an array
            verdictGuess.innerHTML = `<h2>${incorrectResponses[Math.floor(Math.random() * incorrectResponses.length)].message} <i class="fas fa-frown"></i></h2>`;
            responseGuess.innerHTML = questionCurrent.messageWrong;
        }
    });
});

//Checks to see if the next button has been clicked
//Removes the guess content, shows the quiz again and loads the next question
buttonNext.addEventListener('click', () => {
    containerGuess.classList.add('contentHidden');
    containerQuiz.classList.remove('contentHidden');
    questionsLoad();
})

//array with correct answer messages
const correctResponses = [
    {message:`GG!`},
    {message:`Wahey!`},
    {message:`w00t!`},
    {message:`Grats!`},
    {message:`Congrats!`},
    {message:`Congratulations!`},
    {message:`Well done!`},
    {message:`Great job!`},
    {message:`Valiant effort!`},
    {message:`Kudos!`},
    {message:`Squeck yeah!`},
    {message:`Woohoo!`},
    {message:`Yay!`},
    {message:`Awesome!`},
    {message:`Sweet!`},
    {message:`Holy Saradomin!`},
    {message:`Unholy Zamorak!`},
    {message:`Praise Guthix!`},
    {message:`That rocks!`},
    {message:`!!!!!!11`},
    {message:`You're right!`}
]

//array with incorrect answer messages
const incorrectResponses = [
    {message:`Uh-Oh!`},
    {message:`Oh no!`},
    {message:`Savage!`},
    {message:`RIP!`},
    {message:`Sad times!`},
    {message:`You're wrong!`},
    {message:`Close one!`},
    {message:`Aww!`},
    {message:`Not a great effort!`}
]

//array with each question as an object
const questions = [{
        //1
        question: `<img src="assets/images/answers/coding.png" class="question-img" alt="Coding Image"><br> <h2>What language was the original RuneScape coded in?</h2>`,
        answer1: 'HTML',
        answer2: 'Python',
        answer3: 'Java',
        answer4: 'mIRC',
        correct: '3', //Java
        messageCorrect: `<img src="assets/images/answers/java.png" class="question-img" alt="Java Logo Image"><br>
        <p>It was Java. The Gower brothers originally created RuneScape Classic all the way back in 2001! The game is alive today and is celebrating 20 years of being around, how incredible is that?</p>
        <p>You can check out Jagex' website <a href="https://www.jagex.com/en-GB/" target="blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: This information exists on the internet, it might be closer than you think <i class="fas fa-smile-beam"></i></p>`
    },
    {
        //2
        question: `<img src="assets/images/answers/raw-tuna.png" class="question-img" alt="Raw Tuna Image"> <h2>What fishing level do you need to catch raw tuna with a harpoon?</h2>`,
        answer1: '15',
        answer2: '25',
        answer3: '35',
        answer4: '45',
        correct: '3', //35
        messageCorrect: `<img src="assets/images/answers/raw-tuna.png" class="question-img" alt="Raw Tuna Image"><br>
        <p>It is level 35. You can fish them at 55 Fishing without a harpoon if you have unlocked the Barbarian ways of barehanded fishing! Either way you'll get 80 Fishing experience!</p>
        <p>Check out the wiki for Raw tuna <a href="https://runescape.wiki/w/Raw_tuna" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct!<br> Hint: The skillguide in game provides all required levels for content within RuneScape <i class="fas fa-smile-beam"></i></p>`
    },
    {
        //3
        question: `<img src="assets/images/answers/rope.png" class="question-img" alt="Rope Image"><h2>What NPC in Draynor Village will sell you rope for either 15 coins or 4 balls of wool?</h2>`,
        answer1: 'Bob',
        answer2: 'Gerald',
        answer3: 'Ned',
        answer4: 'Aggie',
        correct: '3', //Ned
        messageCorrect: `<img src="assets/images/answers/ned.png" class="question-img" alt="Ned Image"><br>
        <p>It was Ned. He lives in a house on the eastern side of Draynor Village, just north of the bank. You'll interact with him during Dragon Slayer quest but you can also get rope from him!</p>
        <p>Check out the wiki for him <a href="https://runescape.wiki/w/Ned" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: You talk to this NPC during the Dragon Slayer quest.</p>`
    },
    {
        //4
        question: `<img src="assets/images/answers/breathingsalts.png" class="question-img" alt="Breathing Salts Image"><h2>What NPC in Varrock gives you breathing salts in exchange for an airtight pot during the One Small Favour quest?</h2>`,
        answer1: 'Stray Dog',
        answer2: 'King Roald',
        answer3: 'Horvik',
        answer4: 'Apothecary',
        correct: '4', //Apothecary
        messageCorrect: `<img src="assets/images/answers/apothecary.png" class="question-img" alt="Apothecary Image"><br>
        <p>It was the Apothecary. He works in a building south west of Varrock Centre, just north of the bank. You'll interact with him during One Small Favour but also in Dimension of Disaster: Curse of Arrav.</p>
        <p>Check out the wiki for him <a href="https://runescape.wiki/w/Apothecary" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: This NPC can also make potions for you if brought the correct ingredients.</p>`
    },
    {
        //5
        question: `<img src="assets/images/answers/trimcomp.png" class="question-img" alt="Trimmed Completionist Image"><h2>Who do you talk to buy the Trimmed Completionist Cape?</h2>`,
        answer1: 'Gielinor Guide',
        answer2: 'Museum Guard',
        answer3: 'Elen Anterth',
        answer4: 'Wizard Sedridor',
        correct: '2', //Museum Guard
        messageCorrect: `<img src="assets/images/answers/trimcomp.png" class="question-img" alt="Trimmed Completionist Image"><br>
        <p>It was the Museum Guard. He works in Varrock museum, on the top floor. You interact with him and ask about the mysterious cape and he'll give you a description of the cape's history. There are a lot of requirements for this cape, making it prestigious.</p>
        <p>Check out the wiki for the cape <a href="https://runescape.wiki/w/Completionist_cape_(t)" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: They're surrounded by lots of artefacts from time gone by.</p>`
    },
    {
        //6
        question: `<img src="assets/images/answers/praymelee.png" class="question-img" alt="Pray Melee Image"><h2>What Prayer level do you need to use the Protect from Melee prayer?</h2>`,
        answer1: '22',
        answer2: '29',
        answer3: '37',
        answer4: '43',
        correct: '4', //43
        messageCorrect: `<img src="assets/images/answers/praymelee.png" class="question-img" alt="Pray Melee Image"><br>
        <p>It was 43. Back in the day protection prayers granted 100% protection from that style, now they provide a 50% reduction to the hit. Despite this protection prayers are still widely used in RuneScape PVM today.</p>
        <p>Check out the wiki for the prayer <a href="https://runescape.wiki/w/Protect_from_Melee" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: The skill guide ingame provides all required levels for content within RuneScape.</p>`
    },
    {
        //7
        question: `<img src="assets/images/answers/grandexchange.png" class="question-img" alt="GE Image"><h2>In what year was the Grand Exchange released?</h2>`,
        answer1: '2006',
        answer2: '2007',
        answer3: '2008',
        answer4: '2009',
        correct: '2', //2007
        messageCorrect: `<img src="assets/images/answers/grandexchange.png" class="question-img" alt="GE Image"><br>
        <p>It was 2007. Prior to this update the only trades that existed were player to player either through ingame or the forums. It provided a way for players to acquire items they required in an easier fashion.</p>
        <p>Check out the wiki for the GE <a href="https://runescape.wiki/w/Grand_Exchange" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: It was released the same year as the God Wars Dungeon.</p>`
    },
    {
        //8
        question: `<img src="assets/images/answers/fairyring.png" class="question-img" alt="Fairy Ring Image"><h2>What is the fairy ring code for McGrubor's Wood?</h2>`,
        answer1: 'AKQ',
        answer2: 'AJR',
        answer3: 'ALS',
        answer4: 'AKS',
        correct: '3', //ALS
        messageCorrect: `<img src="assets/images/answers/fairyring.png" class="question-img" alt="Fairy Ring Image"><br>
        <p>It was ALS. To access the Fairy ring network you must start A Fairy Tale II - Cure A Queen and it provides a fantastic way of getting around the RuneScape map.</p>
        <p>Check out the wiki for the Fairy rings <a href="https://runescape.wiki/w/Fairy_ring#Fairy_ring_codes" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: Once you travel to a fairy ring location, the information is shown next time you use the fairy ring.</p>`
    },
    {
        //9
        question: `<img src="assets/images/answers/fairyring.png" class="question-img" alt="Magic Tree Image"><h2>What do you need to pay a farmer to look after a patch with a magic tree in it?</h2>`,
        answer1: '25 Yew logs',
        answer2: '25 Papaya Fruit',
        answer3: '25 Coconuts',
        answer4: '25 Kandarin Hops',
        correct: '3', //25 Coconuts
        messageCorrect: `<img src="assets/images/answers/magictree.png" class="question-img" alt="Magic Tree Image"><br>
        <p>It was 25 coconuts. When you plant something in a farming patch, you can pay the farmer to look after your crops so they will not get diseased. There are exceptions to this but it is true for the majority.</p>
        <p>Check out the wiki for the Magic Tree (farming) <a href="https://runescape.wiki/w/Magic_Tree_(Farming)" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: The skill guide ingame provides all required levels for content within RuneScape. <i class="fas fa-smile-beam"></i></p>`
    },
    {
        //10
        question: `<img src="assets/images/answers/plaguesend.png" class="question-img" alt="Plagues End Image"><h2>What level do you need in 10 different skills for the quest Plagues End?</h2>`,
        answer1: '65',
        answer2: '70',
        answer3: '75',
        answer4: '80',
        correct: '3', //75
        messageCorrect: `<img src="assets/images/answers/plaguesend.png" class="question-img" alt="Plagues End Image"><br>
        <p>It was 75. The skills you need are: Agility, Construction, Crafting, Dungeoneering, Herblore, Mining, Prayer, Ranged, Summoning and Woodcutting. Completion of this quest grants access to Prifddinas, which is one of the most useful unlocks in RuneScape today.</p>
        <p>Check out the wiki for the quest <a href="https://runescape.wiki/w/Plague%27s_End" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: The Quest guide ingame provides all requirements for Quests within RuneScape. <i class="fas fa-smile-beam"></i></p>`
    },
    {
        //11
        question: `<img src="assets/images/answers/grandseedpod.png" class="question-img" alt="Grand seed pod Image"><h2>Where can you obtain a Grand seed pod?</h2>`,
        answer1: 'Fishing Trawler',
        answer2: `Sorceress's Garden`,
        answer3: 'Vinesweeper',
        answer4: 'Gnome Restaurant',
        correct: '4', //Gnome Restaurant
        messageCorrect: `<img src="assets/images/answers/grandseedpod.png" class="question-img" alt="Grand seed pod Image"><br>
        <p>It was Gnome Restaurant. You can talk to Aluft Gianne Junior on the 1st floor (UK) on the western side to start this minigame. You learn about gnome cooking and deliver food to gnomes throughout RuneScape for various rewards including the Grand seed pod and the Gnome Scarf.</p>
        <p>Check out the wiki for the Grand seed pod <a href="https://runescape.wiki/w/Grand_seed_pod" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: Those gnomes have big stomachs don't they?</p>`
    },
    {
        //12
        question: `<img src="assets/images/answers/trollheimtelly.png" class="question-img" alt="Trollheim Teleport Image"><h2>What runes are required to teleport to Trollheim?</h2>`,
        answer1: '2 Law, 2 Fire',
        answer2: '2 Law 2 Earth',
        answer3: '1 Law 1 Air 1 Water',
        answer4: '1 Law 3 Air 1 Earth',
        correct: '1', //2 Law, 2 Fire
        messageCorrect: `<img src="assets/images/answers/trollheimtelly.png" class="question-img" alt="Trollheim Teleport Image"><br>
        <p>It was 2 Law 2 Fire. You unlock this teleport after completing Eadgar's Ruse quest. It will teleport you to the centre of Trollheim and is used for herb runs and questing.</p>
        <p>Check out the wiki for the Trollheim Teleport <a href="https://runescape.wiki/w/Trollheim_Teleport" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: The teleport tab in the Magic abilities interface ingame provides all requirements for Quests within RuneScape. <i class="fas fa-smile-beam"></i></p>`
    },
    {
        //13
        question: `<img src="assets/images/answers/construction.png" class="question-img" alt="Construction Image"><h2>What is the name of the Construction pet?</h2>`,
        answer1: 'Ace',
        answer2: `Baby Yaga's House`,
        answer3: 'Brains',
        answer4: 'Sifu',
        correct: '2', //Baby Yaga's House
        messageCorrect: `<img src="assets/images/answers/babyyagashouse.png" class="question-img" alt="Baby Yaga's House Image"><br>
        <p>It was Baby Yaga's House. You unlock this skilling pet whilst training Construction. Some activities do not award the chance to roll for the pet such as protean planks and Royal Battleship kits.</p>
        <p>Check out the wiki for Baby Yaga's House <a href="https://runescape.wiki/w/Baby_Yaga%27s_House" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: The pet interface ingame has a filter to show all pets within RuneScape and how to obtain them. <i class="fas fa-smile-beam"></i></p>`
    },
    {
        //14
        question: `<img src="assets/images/answers/100.png" class="question-img" alt="Quest Image"><h2>What was the 100th quest to be released in RuneScape?</h2>`,
        answer1: 'Recipe for Disaster',
        answer2: 'Fremennik Trials',
        answer3: 'Swan Song',
        answer4: 'Cabin Fever',
        correct: '1', //Recipe for Disaster
        messageCorrect: `<img src="assets/images/answers/rfd.png" class="question-img" alt="Recipe for Disaster Image"><br>
        <p>It was Recipe for Disaster. This quest was released back on the 15th March 2006! It was a sequel to the first quest ever released in RuneScape and a staple in any players beginning experience, Cook's Assistant.</p>
        <p>Check out the wiki for the quest <a href="https://runescape.wiki/w/Recipe_for_Disaster" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: You make some interesting food in this quest.</p>`
    },
    {
        //15
        question: `<img src="assets/images/answers/brightfire.png" class="question-img" alt="Brightfire Potion Image"><h2>What ingredients do you need to make a Brightfire potion?</h2>`,
        answer1: 'Super antifire (4) and Super Restore (4)',
        answer2: 'Super antifire (4) and Bright potion (4)',
        answer3: 'Super antifire (4) and Prayer potion (4)',
        answer4: 'Super antifire (4) and Prayer Renewal (4)',
        correct: '4', //Super antifire (4) and Prayer Renewal (4)
        messageCorrect: `<img src="assets/images/answers/brightfire.png" class="question-img" alt="Brightfire potion Image"><br>
        <p>It was Super antifire (4) and Prayer Renewal (4). It is one of the combination potions released with Prifddinas and require you to buy a recipe from Lady Meilyr for 600,000gp.</p>
        <p>Check out the wiki for Brightfire potions <a href="https://runescape.wiki/w/Brightfire_potion#(6)" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: The skill guide ingame provides all required levels for content within RuneScape. <i class="fas fa-smile-beam"></i></p>`
    },
    {
        //16
        question: `<img src="assets/images/answers/fallymassacre.jpg" class="question-img" alt="Falador Massacre Image"><h2>In what year was the 'Falador Massacre'?</h2>`,
        answer1: '2004',
        answer2: '2006',
        answer3: '2008',
        answer4: '2010',
        correct: '2', //2006
        messageCorrect: `<img src="assets/images/answers/fallymassacre.jpg" class="question-img" alt="Falador Massacre Image"><br>
        <p>It was 2006. When Cursed You was due to be the first player to achieve 99 Construction, he hosted a party in his player owned house. Upon the level up and due to the amount of messages people were booted out of his house and those who had engaged in combat activities had somehow retained the ability to attack players and in turn abused this thus dubbing this event the Falador Massacre.</p>
        <p>Check out the wiki for the Falador Massacre <a href="https://runescape.fandom.com/wiki/Falador_Massacre" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: 6th June and is known as a triple number glitch.</p>`,
    },
    {
        //17
        question: `<img src="assets/images/answers/jagex.png" class="question-img" alt="Jagex Image"><h2>In which city is Jagex based?</h2>`,
        answer1: 'Oxford',
        answer2: 'Manchester',
        answer3: 'Cambridge',
        answer4: 'London',
        correct: '3', //Cambridge
        messageCorrect: `<img src="assets/images/answers/jagex.png" class="question-img" alt="Jagex Image"><br>
        <p>It was Cambridge. Founded in 1999, that was 22 years ago! They came up with Jagex as they wanted to be a company of **Ja**va **G**aming **Ex**perts specialzing in browser based Java games. They released RuneScape in January 2001 and it has only grown since.</p>
        <p>Check out the wiki for Jagex <a href="https://en.wikipedia.org/wiki/Jagex" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: Maybe their website has this information?</p>`
    },
    {
        //18
        question: `<img src="assets/images/answers/arnold.png" class="question-img" alt="Arnold Lydspor Image"><h2>In what quest do you meet Arnold Lydspor?</h2>`,
        answer1: 'Swan Song',
        answer2: 'Meeting History',
        answer3: 'A Tail of Two Cats',
        answer4: `Cook's Assisant`,
        correct: '1', //Swan Song
        messageCorrect: `<img src="assets/images/answers/arnold.png" class="question-img" alt="Arnold Lydspor Image"><br>
        <p>It was Arnold Lydspor. During Swan Song you help the Piscatoris Fishing Colony and its inhabitants fight off the sea troll invasion, among which is Arnold Lydspor who ends up being a bank and general store after the quest.</p>
        <p>Check out the wiki for Arnold <a href="https://runescape.wiki/w/Arnold_Lydspor" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: I'm sure the Wise Old Man is thankful for your help fighting those trolls!</p>`
    },
    {
        //19
        question: `<img src="assets/images/answers/unferth.png" class="question-img" alt="Unferth Image"><h2>In what quest do help Bob find items for Neite?</h2>`,
        answer1: `A Soul's Bane`,
        answer2: 'Desert Treasure',
        answer3: `Gertrude's Cat`,
        answer4: 'A Tail of Two Cats',
        correct: '4', //
        messageCorrect: `<img src="assets/images/answers/tailoftwocats.png" class="question-img" alt=" Tail of Two Cats Image"><br>
        <p>It was a Tail of Two Cats. During this quest you learn about the life of Bob the cat. Neite is his lover and you must find him items so he can woo her, you also complete tasks to help out Bob's owner, Unferth.</p>
        <p>Check out the wiki for Tail of Two Cats <a href="https://runescape.wiki/w/A_Tail_of_Two_Cats" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: You help two NPCs find love, it's furry fun!</p>`
    },
    {
        //20
        question: `<img src="assets/images/answers/stats.png" class="question-img" alt="Stats Image"><h2>Which one of these is an elite skill?</h2>`,
        answer1: 'Dungeoneering',
        answer2: 'Fishing',
        answer3: 'Invention',
        answer4: 'Farming',
        correct: '3', //Invention
        messageCorrect: `<img src="assets/images/answers/invention.png" class="question-img" alt="Invention Image"><br>
        <p>It was Invention. To even unlock this skill you require level 80 in Divination, Smithing and Crafting. You can then start the Invention tutorial north of Falador in the Invention Guild.
        <p>Check out the wiki for Invention <a href="https://runescape.wiki/w/Invention" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: This skill was released early 2016.</p>`
    },
    {
        //21
        question: `<img src="assets/images/answers/fishingguild.png" class="question-img" alt="Fishing Guild Image"><h2>What Fishing level do you require to enter the Fishing Guild?</h2>`,
        answer1: '40',
        answer2: '53',
        answer3: '68',
        answer4: '81',
        correct: '3', //68
        messageCorrect: `<img src="assets/images/answers/fishingguild.png" class="question-img" alt="Fishing Guild Image"><br>
        <p>It was 68. Once you have this Fishing level you can enter the guild north of the Ardougne lodestone. It provides a multitude of Fishing locations and access to the Deep Sea Fishing platform.</p>
        <p>Check out the wiki for the Fishing Guild <a href="https://runescape.wiki/w/Fishing_Guild" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: The skill guide ingame provides all required levels for content within RuneScape. <i class="fas fa-smile-beam"></i></p>`
    },
    {
        //22
        question: `<img src="assets/images/answers/yewtree.png" class="question-img" alt="Yew tree Image"><h2>What Woodcutting level do you need to chop down a Yew tree?</h2>`,
        answer1: '50',
        answer2: '60',
        answer3: '70',
        answer4: '80',
        correct: '2', //60
        messageCorrect: `<img src="assets/images/answers/yewtree.png" class="question-img" alt="Yew tree Image"><br>
        <p>It was 60. Yews can be found in multiple locations around the world of Gielinor, most notably west of Catherby bank, south of Edgeville bank and in the Crwys district of Prifddinas.
        <p>Check out the wiki for Yew trees <a href="https://runescape.wiki/w/Yew" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: The skill guide ingame provides all required levels for content within RuneScape. <i class="fas fa-smile-beam"></i></p>`
    },
    {
        //23
        question: `<img src="assets/images/answers/excalibur.png" class="question-img" alt="Excalibur Image"><h2>What quest must you get a portion of the way through to acquire the sword Excalibur?</h2>`,
        answer1: `Merlin's Crystal`,
        answer2: 'Holy Grail',
        answer3: `King's Ransom`,
        answer4: 'Defender of Varrock',
        correct: '1', //Merlin's Crystal
        messageCorrect: `<img src="assets/images/answers/excalibur.png" class="question-img" alt="Excalibur Image"><br>
        <p>It was Merlin's Crystal. This is a quest in which you work with King Arthur to help free Merlin who, like all amazing magicians is stuck inside a crystal.</p>
        <p>Check out the wiki for Excalibur <a href="https://runescape.wiki/w/Excalibur" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: This quest is one of the early quests in the Camelot series.</p>`
    },
    {
        //24
        question: `<img src="assets/images/answers/darkmeyer.png" class="question-img" alt="Darkmeyer Image"><h2>What Kingdom is Darkmeyer located in?</h2>`,
        answer1: 'Misthalin',
        answer2: 'Kandarin',
        answer3: 'Desert',
        answer4: 'Morytania',
        correct: '4', //Morytania
        messageCorrect: `<img src="assets/images/answers/darkmeyer.png" class="question-img" alt="Darkmeyer Image"><br>
        <p>It was Morytania. After the Branches of Darkmeyer, you have access to this city and have access to the Blisterwood tree which can be used to create weapons which can damage vampyres.</p>
        <p>Check out the wiki for Darkmeyer <a href="https://runescape.wiki/w/Darkmeyer" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: Vampyres love this place!</p>`
    },
    {
        //25
        question: `<img src="assets/images/answers/soulsplit.png" class="question-img" alt="Soul Split Image"><h2>What quest unlocks the ability to use the curse Soul Split at level 92 Prayer?</h2>`,
        answer1: 'Curse of Arrav',
        answer2: 'Temple at Senntisten',
        answer3: 'Lunar Diplomacy',
        answer4: 'One of a Kind',
        correct: '2', //Temple at Senntisten
        messageCorrect: `<img src="assets/images/answers/soulsplit.png" class="question-img" alt="Soul Split Image"><br>
        <p>It was Temple at Senntisten. After completing this quest you can access to the ancient curses prayer book which contains many useful curses that are widely used in today's RuneScape, most notably the deflect prayers and superheat/light form.
        <p>Check out the wiki for Soul Split <a href="https://runescape.wiki/w/Soul_Split" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: The skill guide ingame provides quest requirements for all content within RuneScape. <i class="fas fa-smile-beam"></i></p>`
    },
    {
        //26
        question: `<img src="assets/images/answers/map.png" class="question-img" alt="Map Image"><h2>Where are Mizgog, Grayzag, Sedridor and Traiborn located?</h2>`,
        answer1: `Wizards' Tower`,
        answer2: 'Magic Guild',
        answer3: `Sorcerer's Tower`,
        answer4: `Artisans' Workshop`,
        correct: '1', //Wizards' Tower
        messageCorrect: `<img src="assets/images/answers/wizardstower.png" class="question-img" alt="Wizards' Tower Image"><br>
        <p>It was Wizards' Tower. You speak to these wizards and others in multiple quests including Rune Mysteries, Rune Memories and Imp Catcher.</p>
        <p>Check out the wiki for the Wizards' Tower <a href="https://runescape.wiki/w/Wizards%27_Tower" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: Maybe those blue clothed people need your help? <i class="fas fa-smile-beam"></i></p>`
    },
    {
        //27
        question: `<img src="assets/images/answers/smokecloud.png" class="question-img" alt="Smoke Cloud spell scroll Image"><h2>In which archaeological site can you find the ‘Smoke Cloud’ spell scroll artefact?</h2>`,
        answer1: 'Everlight',
        answer2: 'Orthen',
        answer3: 'Infernal Source',
        answer4: 'Kharid-Et',
        correct: '4', //Kharid-Et
        messageCorrect: `<img src="assets/images/answers/smokecloud.png" class="question-img" alt="Smoke Cloud spell scroll Image"><br>
        <p>It was Kharid-Et. It is found whilst excavating Culinarum debris. It can be excavated and restored at level 100 Archaeology.</p>
        <p>Check out the wiki for the Smoke Cloud spell scroll <a href="https://runescape.wiki/w/%27Smoke_Cloud%27_spell_scroll_(damaged)" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: Maybe Zaros used this back in the day?</p>`
    },
    {
        //28
        question: `<img src="assets/images/answers/achievement.png" class="question-img" alt="Achievement Image"><h2>How do you unlock the Port Life achievement? (POP = Player Owned Ports)</h2>`,
        answer1: 'By reaching the first region in POP',
        answer2: 'By completing the POP tutorial',
        answer3: 'By unlocking your first captain in POP',
        answer4: 'By reaching the final region in POP',
        correct: '2', //By completing the Player Owned Ports tutorial
        messageCorrect: `<img src="assets/images/answers/pop.png" class="question-img" alt="Player Owned Ports Image"><br>
        <p>It was by completing the Player Owned Ports tutorial. To start, you need level 90 in one of the Ports skills (Agility, Construction, Cooking, Divination, Dungeoneering, Fishing, Herblore, Hunter, Prayer, Runecrafting, Slayer or Thieving).
        <p>Check out the wiki for the Port Life achievement <a href="https://runescape.fandom.com/wiki/Port_Life" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: Maybe someone can help show you around?</p>`
    },
    {
        //29
        question: `<img src="assets/images/answers/jumper.png" class="question-img" alt="Jumper Image"><h2>What is a Jumper?</h2>`,
        answer1: 'A cosmetic override',
        answer2: 'A slayer creature',
        answer3: 'A node in Runespan',
        answer4: 'A portal to use',
        correct: '3', //A node in Runespan
        messageCorrect: `<img src="assets/images/answers/jumper.png" class="question-img" alt="Jumper Image"><br>
        <p>It was a node in Runespan. They require 54 Runecrafting as you receive law runes when siphoning from them. They appear on the upper floor and rarely on the middle floor.</p>
        <p>Check out the wiki for Jumpers <a href="https://runescape.wiki/w/Jumper" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: You can receive law runes from it.</p>`
    },
    {
        //30
        question: `<img src="assets/images/answers/impressing.png" class="question-img" alt="Impressing the Locals Image"><h2>What region does completing "Impressing the Locals" quest grant you access to?</h2>`,
        answer1: 'The Arc',
        answer2: 'Menaphos',
        answer3: 'Prifddinas',
        answer4: 'Darkmeyer',
        correct: '1', //The Arc
        messageCorrect: `<img src="assets/images/answers/impressing.png" class="question-img" alt="Impressing the Locals Image"><br>
        <p>It was the Arc. The Arc provides a wide variety of content across Fishing, Hunter, Farming, Divination and Woodcutting with some of the highest level skill nodes being found on uncharted isles.
        <p>Check out the wiki for the Impressing the Locals miniquest <a href="https://runescape.wiki/w/Impressing_the_Locals" target="_blank">here!</a></p>`,
        messageWrong: `<p>That is not correct! <br> Hint: You end up sailing to the area you unlocked.</p>`
    }
];