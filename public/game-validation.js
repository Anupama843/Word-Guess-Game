"use strict";

const words = `
about above after again among began begin
black bring build carry cause check class
clear close color could cover cross drive
early earth every field final first force
found front great green group heard horse
house large laugh learn leave light might
money music never night north often order
other paper piece place plain plane plant
point pound power press quick reach ready
right river round serve shape short since
sleep small sound south spell stand start
state still stood story study table teach
their there these thing think those three
under until usual voice vowel watch water
wheel where which while white whole world
would write young
`.split(/[\s\n]+/).filter( item => !!item );

(function () {
    
    const guessInputEl = document.querySelector('.guess-input .guess-word-input');
    const submitButtonEl = document.querySelector('.guess-input .submit-button');
    const guessInputErrorEl = document.querySelector(".guess-input .guess-word-input-error");

    disableSubmitButtonIfNoInput();
    addAbilityToValidateGuessWord();

    function disableSubmitButtonIfNoInput() {
        submitButtonEl.disabled = !guessInputEl.value;
        guessInputEl.addEventListener('input', () => {
            guessInputErrorEl.innerHTML = ""
            submitButtonEl.disabled = !(words.some( word => word === guessInputEl.value.toLowerCase()));
        });
    }

    function addAbilityToValidateGuessWord() {
        guessInputEl.addEventListener('focusout', () => {
            const isValidInout = (words.some( word => word === guessInputEl.value.toLowerCase()));
            if (isValidInout || guessInputEl.value == "") {
                guessInputErrorEl.innerHTML = ""
            } else {
                guessInputErrorEl.innerHTML = "Invalid entry, please enter word from above list!"
            }
            submitButtonEl.disabled = !isValidInout;
        });
    }
})();