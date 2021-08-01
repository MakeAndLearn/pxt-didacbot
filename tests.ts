input.onGesture(Gesture.Shake, function () {
    didacbot.Didacbot_move(Forwadrs)
    basic.pause(1000)
    didacbot.Didacbot_move(Backwards)
basic.pause(1000)
})
input.onButtonPressed(Button.A, function () {
    didacbot.Didacbot_move(Right)
    basic.pause(1000)
})
input.onButtonPressed(Button.B, function () {
    didacbot.Didacbot_move(Left)
    basic.pause(1000)
})
didacbot.MotorStopAll()
