input.onButtonPressed(Button.A, function () {
    didacbot.spinDidacbot(-90)
})

input.onButtonPressed(Button.AB, function () {
    for (let index = 0; index < 4; index++) {
        didacbot.moveDidacbotParams(didacbot.direction.Forward, 2, didacbot.stepUnit.Rotations)
        didacbot.spinDidacbot(-90)
    }
})

input.onButtonPressed(Button.B, function () {
    didacbot.spinDidacbot(90)
})

basic.forever(function () {
    didacbot.moveDidacbot(didacbot.direction.Forward)
    basic.pause(2000)
    didacbot.stopDidacbot()
    basic.pause(1000)
    didacbot.moveDidacbot(didacbot.direction.Backward)
    basic.pause(2000)
    didacbot.stopDidacbot()
    basic.pause(1000)
})
