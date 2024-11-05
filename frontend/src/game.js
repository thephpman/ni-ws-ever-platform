const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Array of animals and their hints
const animals = [
    { name: 'Lion', hint: 'I am known as the king of the jungle.' },
    { name: 'Elephant', hint: 'I have a trunk and big ears.' },
    { name: 'Dolphin', hint: 'I am a smart marine mammal.' },
    { name: 'Kangaroo', hint: 'I carry my baby in a pouch.' },
    { name: 'Penguin', hint: 'I cannot fly but I am a great swimmer.' },
];

// Function to play the game
const playGame = () => {
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    console.log(`Hint: ${randomAnimal.hint}`);

    rl.question('Guess the animal: ', (answer) => {
        if (answer.toLowerCase() === randomAnimal.name.toLowerCase()) {
            console.log('Correct! 🎉');
        } else {
            console.log(`Wrong! The correct answer was: ${randomAnimal.name}.`);
        }

        rl.question('Do you want to play again? (yes/no): ', (playAgain) => {
            if (playAgain.toLowerCase() === 'yes') {
                playGame();
            } else {
                console.log('Thanks for playing! Goodbye! 👋');
                rl.close();
            }
        });
    });
};

// Start the game
console.log('Welcome to the Animal Guessing Game! 🐾');
playGame();
