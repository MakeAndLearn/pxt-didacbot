input.onButtonPressed(Button.A, function () {
    didacbot.Didacbot_rotation(-90)
})
input.onButtonPressed(Button.B, function () {
    didacbot.Didacbot_rotation(90)
})

//Make the robot run in a square when the micro:bit's buttons A and B are pressed
input.onButtonPressed(Button.AB, function () {
    for (let index = 0; index < 4; index++) {
        didacbot.Didacbot(didacbot.direction.Forward, 1.3, didacbot.stepUnit.Rotations)
        didacbot.Didacbot_rotation(-90)
    }
})

basic.forever(function () {
    didacbot.Didacbot_move(didacbot.direction.Forward)
    basic.pause(2000)
    didacbot.DidacbotStop()
    basic.pause(1000)
    didacbot.Didacbot_move(didacbot.direction.Backward)
    basic.pause(2000)
    didacbot.DidacbotStop()
    basic.pause(1000)
})
