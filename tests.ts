input.onButtonPressed(Button.A, function () {
    didacbot.Didacbot(didacbot.direction.Forward, 30, didacbot.stepUnit.Degrees)
})
input.onButtonPressed(Button.B, function () {
    didacbot.Didacbot(didacbot.direction.Backward, 30, didacbot.stepUnit.Degrees)
})
basic.forever(function () {
    didacbot.Didacbot(didacbot.direction.Forward, 3, didacbot.stepUnit.Rotations)
    didacbot.DidacbotStop()
    basic.pause(1000)
    didacbot.Didacbot(didacbot.direction.Backward, 3, didacbot.stepUnit.Rotations)
    didacbot.DidacbotStop()
    basic.pause(1000)
})
