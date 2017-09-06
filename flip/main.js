
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('book','assets/flip.png',170,130,5);

}

var facts=["In 10 minutes, a hurricane releases more energy than all the world's nuclear weapons combined." ,
    "On average, 100 people choke to death on ballpoint pens every year." ,
    "On average people fear spiders more than they do death." ,
    "Ninety percent of New York City cabbies are recently arrived immigrants." ,
    "Thirty-five percent of the people who use personal ads for dating are already married." ,
    "Only one person in two billion will live to be 116 or older." ,
    "It's possible to lead a cow upstairs...but not downstairs." ,
    "Women blink nearly twice as much as men." ,
    "The Main Library at Indiana University sinks over an inch every year because when it was built, engineers failed to take into account the weight of all the books that would occupy the building." ,
    "A crocodile cannot stick its tongue out." ,
    "Table tennis balls have been known to travel off the paddle at speeds up to 160 km/hr. " ,
    "Pepsi originally contained pepsin, thus the name. " ,
    "Our eyes are always the same size from birth, but our nose and ears never stop growing." ,
    "The electric chair was invented by a dentist. (hmmmmmmm)" ,
    "In ancient Egypt, priests plucked EVERY hair from their bodies, including their eyebrows and eyelashes." ,
    "TYPEWRITER is the longest word that can be made using the letters only on one row of the keyboard." ,
    "\"Go.\" is the shortest complete sentence in the English language." ,
    "If Barbie were life-size, her measurements would be 39-23-33. She would stand seven feet, two inches tall." ,
    "The original story from \"Tales of 1001 Arabian Nights\" begins, \"Aladdin was a little Chinese boy.\" " ,
    "Nutmeg is extremely poisonous if injected intravenously. " ,
    " 	" ,
    "Honey is the only natural food that is made without destroying any kind of life. What about milk you say? " ,
    "A snail can sleep for three years. " ,
    "No word in the English language rhymes with \"MONTH\"." ,
    "Average life span of a major league baseball: 7 pitches." ,
    "Michael Jordan makes more money from NIKE annually than all of the Nike factory workers in Malaysia combined. " ,
    "The volume of the earth's moon is the same as the volume of the Pacific Ocean. " ,
    "Cephalacaudal recapitulation is the reason our extremities develop faster than the rest of us. " ,
    "A cow has to eat grass to produce milk and grass is living. " ,
    "The most common name in the world is Mohammed. " ,
    "The cigarette lighter was invented before the match." ,
    "Americans on average eat 18 acres of pizza every day." ,
    "The \"pound\" key on your keyboard (#) is called an octotroph. " ,
    "The only domestic animal not mentioned in the Bible is the cat. " ,
    "The \"dot\" over the letter \"i\" is called a tittle. 	" ,
    " " ,
    "Dr. Freeman's" ,
    "Latest Book" ,
    "Spiral staircases in medieval castles are running clockwise. This is because all knights used to be" ,
    "right-handed. When the intruding army would climb the stairs they would not be able to use their right hand which was holding the sword because of the difficulties of climbing the stairs. Left-handed knights would have had no troubles, except left-handed people could never become knights because it was assumed that they were descendants of the devil. " ,
    "Ham radio operators got the term \"ham\" coined from the expression \"ham fisted operators,\" a term used to describe early radio users who sent Morse code (i.e., pounded their fist). " ,
    "The slogan on New Hampshire license plates is \"Live Free or Die.\" These license plates are manufactured by prisoners in the state prison in Concord. " ,
    "Chinese Crested dogs can get acne. " ,
    "Hydrogen gas is the least dense substance in the world, at 0.08988g/cc." ,
    "Hydrogen solid is the most dense substance in the world, at 70.6g/cc.  (A reader of this page stated that this statement is not true: Aerogel is the densest solid in the world at 1mg/cc.) " ,
    "Each year there is one ton of cement poured for each man woman and child in the world. " ,
    "The house fly hums in the middle octave key of F. " ,
    "The only capital letter in the Roman alphabet with exactly one end point is P. " ,
    "The giant red star Betelgeuse has a diameter larger than that of the Earth's orbit around the sun. " ,
    "The longest place name still in use is: " ,
    "Taumatawhakatangihangaoauauotameteat uripukakapikimaungahoronukupokaiwhenua kitanatahu" ,
    "-- a New Zealand hill. (See if your spell check has this word)" ,
    "Los Angeles's full name is: \"El Pueblo de Nuestra Senora la Reina de losAngeles de Poriuncula\" and can be abbreviated to 3.63% of its size, \"LA.\" " ,
    "Only 1 in 2,000,000,000 will live to be 116 or older. " ,
    "Tigers have striped skin, not just striped fur. " ,
    "According to Einstein's Special Theory of Relativity, it is possible to go slower than light and faster than" ,
    "light, but it is impossible to go the speed of light. Also, there is a particle called tackyon, which is supposed to go faster than light. This means if you fire a tackyon beam, it travels before you fire it. " ,
    "When you tie a noose, the rope is wrapped twelve times around because it's the same length as a person’s head. " ,
    "Hummingbirds are the only animals that can fly backwards. " ,
    "A cat's jaw cannot move sideways." ,
    "If you yelled for 8 years, 7 months and 6 days you would have produced enough sound energy to heat one cup of coffee. (Hardly seems worth it)" ,
    "If you passed gas consistently for 6 years and 9 months, enough gas is produced to create the energy of an atomic bomb." ,
    "The human heart creates enough pressure when it pumps out to the body to squirt blood 30 feet." ,
    "A pig's orgasm lasts 30 minutes. ( In your next life do you want to be a pig?)" ,
    "A cockroach will live nine days without its head before it starves to death. " ,
    "Banging your head against a wall uses 150 calories an hour. (Do not try this at home ..maybe at work)" ,
    "The male praying mantis cannot copulate while its head is attached to its body. The female initiates mating by ripping the male's head off. " ,
    "The flea can jump 350 times its body length. It's like a human jumping the length of a football field." ,
    "The catfish has over 27,000 taste buds. (What can be so tasty on the bottom of the pond?)" ,
    "Some lions mate over 50 times a day." ,
    "Butterflies taste with their feet. (Something I always wanted to know)" ,
    "The strongest muscle in the body is the tongue." ,
    "Elephants are the only animal that cannot jump. (OK, so that would be a good thing....)" ,
    "A cat's urine glows under a black light. (I wonder who was paid to figure that out.)" ,
    "An ostrich's eye is bigger than its brain. (I know some people like that.)" ,
    "Starfish have no brains. (I know some people like that too.)" ,
    "Polar bears are left-handed (Who knew...? Who cares!)" ,
    "Humans and dolphins are the only species that have sex for pleasure." ,
    " Rubber bands last longer when refrigerated. " ,
    "Peanuts are one of the ingredients of dynamite. " ,
    "There are 293 ways to make change for a dollar. " ,
    "The average person's left hand does 56% of the typing. " ,
    "The shark is the only fish that can blink with both eyes. " ,
    "There are more chickens than people in the world. " ,
    "Two-thirds of the world's eggplant is grown in New Jersey. " ,
    "The longest one-syllable word in the English language is \"screeched.\" " ,
    "On a Canadian two dollar bill, the flag flying over the Parliament building is an American flag. " ,
    "All of the clocks in the movie \"Pulp Fiction\" are stuck on 4:20. " ,
    "No word in the English language rhymes with month, orange, silver, or purple. " ,
    "\"Dreamt\" is the only English word that ends in the letters \"mt.\" " ,
    "All 50 states are listed across the top of the Lincoln Memorial on the back of the $5 bill. " ,
    "Almonds are a member of the peach family. " ,
    "Winston Churchill was born in a ladies' room during a dance. " ,
    "Maine is the only state (in USA) whose name is just one syllable. " ,
    "There are only four words in the English language which end in \"dous\": tremendous, horrendous, stupendous, and hazardous. " ,
    "Los Angeles' full name is \"El Pueblo de Nuestra Senora la Reina de los Angeles de Porciuncula\" " ,
    "A cat has 32 muscles in each ear. " ,
    "Tigers have striped skin, not just striped fur. " ,
    "In most advertisements, the time displayed on a watch is 10:10. " ,
    "Al Capone's business card said he was a used furniture dealer. " ,
    "The characters Bert and Ernie on Sesame Street were named after Bert the cop and Ernie the taxi driver in Frank Capra's \"It's a Wonderful Life.\" " ,
    "A dragonfly has a life span of 24 hours. " ,
    "A goldfish has a memory span of three seconds. " ,
    "A dime has 118 ridges around the edge. " ,
    "It's impossible to sneeze with your eyes open. " ,
    "The giant squid has the largest eyes in the world. " ,
    "In England, the Speaker of the House is not allowed to speak. " ,
    "The microwave was invented after a researcher walked by a radar tube and a chocolate bar melted in his pocket. " ,
    "Mr. Rogers was an ordained minister. " ,
    "The average person falls asleep in seven minutes. " ,
    "There are 336 dimples on a regulation golf ball. " ,
    "Stewardesses\" is the longest word that is typed with only the left hand. " ,
    "A rat can last longer without water than a camel." ,
    "Your stomach has to produce a new layer of mucus every two weeks or it will digest itself." ,
    "A raisin dropped in a glass of fresh champagne will bounce up and down continuously  from the bottom of the glass to the top." ,
    "A female ferret will die if it goes into heat and cannot find a mate." ,
    "A 2\" X 4\" is really 1-1/2\" by 3-1/2\"." ,
    "During the chariot scene in \"Ben Hur,\" a small red car can be seen in the distance." ,
    "On average, 12 newborns will be given to the wrong parents daily (I knew it!)." ,
    "Because metal was scarce, the Oscars given out during World War II were made of wood." ,
    "The number of possible ways of playing the first four moves per side in a game of chess is 318,979,564,000." ,
    "There are no words in the dictionary that rhyme with orange, purple, and silver. What about \"month?\"" ,
    "The name Wendy was made up for the book \"Peter Pan.\" There was never a recorded Wendy before." ,
    "The very first bomb dropped by the Allies on Berlin in World War II killed the only elephant in the Berlin Zoo." ,
    "If one places a tiny amount of liquor on a scorpion, it will instantly go mad and sting itself to death. (Who was the sadist that discovered this??)" ,
    "Bruce Lee was so fast that they actually had to slow film down while shooting so you could see his moves. That's the opposite of the norm." ,
    "The first CD pressed in the US was Bruce Springsteen's \"Born in the USA.\"" ,
    "The original name for butterfly was flutterby." ,
    "The phrase \"rule of thumb\" is derived from an old English law which stated that  you couldn't beat your wife with anything wider than your thumb." ,
    "The first product Motorola started to develop was a record player for automobiles. At that time, the most known player on the market was Victrola, so they called themselves Motorola." ,
    "Roses may be red, but violets are indeed violet." ,
    "By raising your legs slowly and laying on your back, you cannot sink into quicksand." ,
    "Celery has negative calories. It takes more calories to eat a piece of celery than the celery has in it to begin with." ,
    "Charlie Chaplin once won third prize in a Charlie Chaplin look-alike contest." ,
    "Chewing gum while peeling onions will keep you from crying." ,
    "Sherlock Holmes NEVER said, \"Elementary, my dear Watson.\"" ,
    "An old law in Bellingham, Washington made it illegal for a woman to take more than 3 steps backwards while dancing." ,
    "The glue on Israeli postage stamps is certified kosher." ,
    "The Guinness Book of Records holds the record for being the book most often stolen from public libraries." ,
    "Bats always turn left when exiting a cave."];


//input
var cursors;
var flips=0;
//sprites
var player;
var limit =Math.random()*1000+10;

function create() {
 var txtStyle = {font: "20px Arial", fill: "#11af00", wordWrap: true, wordWrapWidth: game.width-200, align: "center"};    
 fliptext=game.add.text(game.world.centerX,32,"Flips:");
 cheers=game.add.text(game.world.centerX,120,"Fun flip 3000",txtStyle);
 cheers.anchor.setTo(0.5);
 game.stage.backgroundColor=0xffffff;
 book=game.add.sprite(game.width/2,game.height/2,'book');
 fliptext.anchor.setTo(0.5);
 book.anchor.setTo(0.5);
 book.scale.setTo(2);
 book.animations.add('flip');
 game.input.onDown.add(flip,this);
}

function update() {
}

function render() {

}

function flip(){
    flips++;
    book.animations.play('flip', 50); 
    fliptext.text="Flips:"+flips;    
    cheers.text=facts[~~(Math.random()*facts.length-1)];    
    game.camera.shake(flips/limit);
}
