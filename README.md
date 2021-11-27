# tic-tac-toe

## Cats In Space Edition

#### Aim of the Game: To get three cats in a row before your opponent does!

#### Instructions:

To begin: Each player enters their name, and their avatar will be randomly chosen. Once both players have entered the game, A player will be randomly selected to start first. Players take turns selecting squares until a player gets three of their cats in a row or all squares are filled up. Multiple rounds can be played, where a win adds one point to a players score.

## Technologies Used

* HTML
* CSS
* Javascript

## Approach Taken

### HTML/CSS :

I designed the game board using CSS Grid and created seperate containers for the start screen and player name screens that would be shown or hidden as needed. I used CSS animation to give some elements a “floating” effect to lend towards the space theme. For each box in my grid I gave a data cell index number as a way to reference each box in the javascript .

### Javascript:

#### Game Board:

I created an array with nine empty spaces to account for the nine boxes. I used a for loop to add an event listener to each box so that when a box is clicked, it will create an image element of the player’s avatar image and append it into the selected box. I also got the data cell index attribute from the selected box and logged it into the game board array in the specific position for that box with the player’s name as a way to log which player has selected which box.

Every time a player selects a box it also runs tow functions, on that will switch the players turn to the next player, and another function that checks if the game is won or not. I did this by creating an array of arrays that contain all the possible winning combinations on the board based of their data cell index number. The function will loop through each winning combination and check if a player holds all those boxes based off the game board array. If not, the game will continue, otherwise another function will be initialised to account for a win or a draw depending on whether a player has won or if all nine spaces have been used without any matches.

If a player wins, this function will display a pop up box to say that the player has won, and will add to their score. If it’s a draw, the display will say it’s a draw instead, and no point will be given. The display has a button the start the next round.

When the next round button is clicked, it runs three functions:
resetBoard - This clears the game board array, updates the round to the next round and loops through all the boxes, removing the images.
choosePlayerToStart - This function randomly chooses which player to start.
initializeGame - This function assigns which way the pointing cat will point based off whose turn it is, and displays whose turn it is to start.

#### Player Input Screens:

I created an object to hold the username, avatar and score for each player. When the game start button is pressed, the initial screen will be hidden and a new display will show up for the first player to input their name. A player must input a name to continue. After the first player has submitted their name, the name will be logged in the player object and another screen will display for the second player to input their name.

The avatars for each player are randomly generated from an array of images using a function. The function checks to make sure that both players don’t get the same image, and logs it into the player object.

#### Additional:

There is a reset button below the game board, which will refresh the page taking the user back to the very start.

## Unsolved / Unfinished Tasks

The plan was for the box displaying the round number to be floating all the way around the edge of the game board, but I was having trouble getting the animation right.

The game is not built with responsive design, and is not suitable for smaller or extra large screens. This is a feature I would like to eventually implement.

Would like to add sound effects and time limits
