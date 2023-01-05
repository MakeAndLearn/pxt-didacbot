## Didacbot package
Didacbot is an educational robot to learn programming in early ages. This Didacbot package was developed by [Make&Learn](https://www.makeandlearn.cat/). If you're interested in this robot, you can get it through the [Make&Learn's online shop](https://botiga.makeandlearn.cat/producto/didacbot).

The robot Didacbot works thanks to the module micro:shield, a flexible board where you can connect components of many kinds, especially the ones that the educational community uses more frequently. You can find its own MakeCode extension [here](https://github.com/MakeAndLearn/pxt-microshield).

<p align="center">
  <img src="https://github.com/MakeAndLearn/pxt-didacbot/blob/master/icon.png">
</p>

## Hint

To use this package, go to https://makecode.microbit.org, click ``Add package`` and search for **Didacbot**. The package is located [here](https://makecode.microbit.org/pkg/makeandlearn/pxt-didacbot).


## Basic usage

* Set Didacbot movement in a specific direction

```sig
didacbot.Didacbot_move(didacbot.direction.Forward)
```

* Set the number of Didacbot wheels rotation in a specific direction

```sig
didacbot.Didacbot(didacbot.direction.Forward, 3, didacbot.stepUnit.Rotations)
```

* Stop Didacbot's any kind of movement 

```sig
didacbot.DidacbotStop()
```

## Example 1: Make a square

```blocks
//Make the robot run in a square when the micro:bit's button A is pressed
input.onButtonPressed(Button.A, function () {
    for (let index = 0; index < 4; index++) {
        didacbot.Didacbot(didacbot.direction.Forward, 1.3, didacbot.stepUnit.Rotations)
        didacbot.Didacbot_rotation(-90)
    }
})
```

## Example 2: Magic push

```blocks
//"Push" the robot back with your hand without touching it using a ultrasound sensor
basic.forever(function () {
    if (sonar.ping(DigitalPin.P14, DigitalPin.P15, PingUnit.Centimeters) < 10) {
        didacbot.Didacbot_move(didacbot.direction.Backward)
    } else {
        didacbot.Didacbot_move(didacbot.direction.Forward)
    }
})
```

## Example 3: Line follower

```blocks
//Run the robot following a black line on the floor using a IR sensor
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P12) == 0) {
        didacbot.Didacbot_move(didacbot.direction.Right)
    } else {
        didacbot.Didacbot_move(didacbot.direction.Left)
    }
})
```

## License
MIT

## Supported targets
for PXT/microbit (The metadata above is needed for package search.)
