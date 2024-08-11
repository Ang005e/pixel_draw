
const _TOTAL_BUTTONS = 1200;
// the total number of buttons

let _buttons = [_TOTAL_BUTTONS+1];
let _prevButtons = [_TOTAL_BUTTONS+1];

let _programFreeze = true;
let _drawButtonActive;
let _mouseDown;
let _eraseButtonActive;
let _action = "coloured";
let _type = "– oh no. something seems wrong..."

let r = 0;
let g = 35;
let b = 0;
let _redButtonState;
let _greenButtonState;
let _blueButtonState;

let _blueButton = document.getElementById("blue-button")
let _greenButton = document.getElementById("green-button")
let _redButton = document.getElementById("red-button")

let _rIncrement = 0;
let _gIncrement = 0;
let _bIncrement = 0;

// globals suck and I hate them, but I forgot how to do pointers so meh

const _drawOnOffButton = document.getElementById("draw-on-off-button");
const _eraseOnOffButton = document.getElementById("erase-on-off-button");

const _colourButton = document.getElementsByClassName("colour-button");
const _buttonSection = document.getElementById("button-section");
let _elements = "";
_buttonSection.innerHTML = "";

for (let i = 1; i < _TOTAL_BUTTONS; i++) {
    _elements += `<div class="colour-button" id="button${i}" onmouseover="mouseEventLogger(${i})"></div>`;
}
for (let i = 1; i < _TOTAL_BUTTONS; i++) {
    _buttons[i] = 1;
    _prevButtons[i] = 1;
}

_buttonSection.innerHTML = _elements;

// MAIN FUNCTIONS

function onButtonEvent(buttonNum) {
    const names = document.getElementsByTagName("div");

    switch (buttonNum) {
        case 0:
            return _mouseDown = true;

        case 1:
            return _mouseDown = false;

        case 2:
            return toggleState(_drawOnOffButton, _drawButtonActive);


        case 3:
            return toggleState(_eraseOnOffButton, _eraseButtonActive);

        case 4:
            // clear all
            debugger
            if (names.length <= 1) {break}
            for (let i = 0; i < _buttons.length; i++) {
                names[i].style.backgroundColor = "initial"
                _buttons[i] = 1;
            }
            return;

        case 5:
            // clear shading
            debugger
            if (names.length <= 1) {break}
            for (let i = 0; i < _buttons.length; i++) {
                if (_buttons[i] > 1) {
                    let buttonActive = document.getElementById(`button${i}`);

                    if (buttonActive != null) {
                        buttonActive.style.backgroundColor = "rgba(0, 55, 0, 1)";
                    }

                    // this is a type of inline if statement:
                    // (buttonActive != null) && ( buttonActive.style.backgroundColor = "rgba(0, 55, 0, 1)");
                    // it's equivalent to plain if (as opposed to if-else, which would be as follows):
                    // (variable true/false) ? (if true do this) : (else, if false do this);
                    _buttons[i] = 1;
                }
            }
            return;

        case 6:
            debugger
            //(r === 0) ? r = 50 : r = 0
            if (r === 0) {
                r = 95;
                b = 0;
                g = 0;
                toggleState(_redButton, _redButtonState)
            } else {
                r = 0;
            }
            return;

        case 7:
            debugger
            //(g === 0) ? g = 50 : g = 0
            if (g === 0) {
                r = 0;
                b = 0;
                g = 37;
                toggleState(_greenButton, _greenButtonState)
            } else {
                g = 0;
            }
            return;

        case 8:
            debugger
            if (b === 0) {
                r = 0;
                b = 37;
                g = 0;
                toggleState(_blueButton, _blueButtonState)
            } else {
                b = 0;
            }
            return;


    }
}
function toggleState(activeButton, state) {
    // toggles the clicked button active/inactive.
    // active buttons are turned green and inactive buttons turn red.
    state = !state;

    // if the state of the button is "true", it toggles it to false,
    // and vice-versa (this is an "inline if statement").
    state ? activeButton.style.backgroundColor = "darkolivegreen"
        : activeButton.style.backgroundColor = "lightcoral";


    switch (activeButton) {
        case _drawOnOffButton:
            _drawButtonActive = state;
            _eraseButtonActive = false;
            _eraseOnOffButton.style.backgroundColor = "lightcoral";
            return;
        case _eraseOnOffButton:
            _eraseButtonActive = state;
            _drawButtonActive = false;
            _drawOnOffButton.style.backgroundColor = "lightcoral";
            return;
        case _redButton:
            _redButtonState = state
            _greenButtonState = false
            _blueButtonState = false
            _greenButton.style.backgroundColor = "lightcoral";
            _blueButton.style.backgroundColor = "lightcoral";
            return;
        case _greenButton:
            _greenButtonState = state
            _redButtonState = false
            _blueButtonState = false
            _redButton.style.backgroundColor = "lightcoral";
            _blueButton.style.backgroundColor = "lightcoral";
            return;
        case _blueButton:
            _blueButtonState = state
            _greenButtonState = false
            _redButtonState = false
            _greenButton.style.backgroundColor = "lightcoral";
            _redButton.style.backgroundColor = "lightcoral";
            return;
    }

}

function mouseEventLogger(buttonPos) {
    const messageDisplay = document.getElementById('message-display');

    document.addEventListener("mousedown", () => {
        _programFreeze = false
    });

    if (_programFreeze) {
        return;
    }
    if ((!_mouseDown && !_drawButtonActive) || (!_mouseDown && !_eraseButtonActive))
    {
        return;
    }
    for (let i = 1; i <= _TOTAL_BUTTONS; i++) {
        if (buttonPos === i) {
            messageDisplay.innerText = `you've ${_action} #${i} ${_type}!`;

            for (let i = 0; i < _TOTAL_BUTTONS; i++) {
                // store the current state of the buttons for use next time the event is called (not currently used)
                _prevButtons[i] = _buttons[i];
            }
            onMouseEvent(buttonPos)

            _buttons[_TOTAL_BUTTONS+1] = buttonPos; // store the location of the previous button
        }
    }
}

function onMouseEvent(buttonPos) {

    const buttonActive = document.getElementById(`button${buttonPos}`);
    const prevButton = document.getElementById(`button${_buttons[_TOTAL_BUTTONS+1]}`);

    //buttonActive.style.backgroundColor = "red";
    if (prevButton === null) {return}

    if (_eraseButtonActive) {

        buttonActive.style.backgroundColor = "initial";
        _buttons[buttonPos] = 1;
        _action = "erased";
        _type = ""
        return;
    }
    let activationCount = _buttons[buttonPos];
    let colour = "";
    let rIncrement = 0
    let gIncrement = 0
    let bIncrement = 0

    for (let i = 0; i < activationCount; i++) {
        // sorry
        if (r>0) {rIncrement += 14; _action = "coloured"; _type = "red"}
        else if (g>0) {gIncrement += 12; _action = "coloured"; _type = "green"}
        else if (b>0) {bIncrement += 15; _action = "coloured"; _type = "blue"}
        else {
            _action = "hovered over"
            _type = ""
            return;
        }
        colour = `rgba(${r + rIncrement}, ${g + gIncrement}, ${b + bIncrement}, 1)`;
        buttonActive.style.backgroundColor = colour
    }

    _buttons[buttonPos]++; // stores one goat in the position of the activated button,
    // in case of future need of goats (I don't care, no one will read this)
    // ...
    // ok fine it stores the value that is attributed to the shade of each box :(
}