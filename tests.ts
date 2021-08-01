input.onGesture(Gesture.Shake, function () {
    didacbot.DidacbotEndavant()
    basic.pause(1000)
    DidacbotDarrera()
	basic.pause(1000)
})
input.onButtonPressed(Button.A, function () {
    didacbot.DidacbotGirDreta()
    basic.pause(1000)
})
input.onButtonPressed(Button.B, function () {
    didacbot.DidacbotGirEsquerra()
    basic.pause(1000)
})
didacbot.MotorStopAll()
	
})
