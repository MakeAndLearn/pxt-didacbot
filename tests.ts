input.onButtonPressed(Button.A, function () {
    didacbot.spinDidacbot(-90)
})

input.onButtonPressed(Button.AB, function () {
    for (let index = 0; index < 4; index++) {
        didacbot.moveDidacbotParams(didacbot.Direction.Forward, 2, didacbot.StepUnit.Rotations)
        didacbot.spinDidacbot(-90)
    }
})

input.onButtonPressed(Button.B, function () {
    didacbot.spinDidacbot(90)
})

basic.forever(function () {
    didacbot.moveDidacbot(didacbot.Direction.Forward)
    basic.pause(2000)
    didacbot.stopDidacbot()
    basic.pause(1000)
    didacbot.moveDidacbot(didacbot.Direction.Backward)
    basic.pause(2000)
    didacbot.stopDidacbot()
    basic.pause(1000)
})
