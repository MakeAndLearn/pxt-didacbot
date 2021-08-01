input.onGesture(Gesture.Shake, function () {
    didacbot.Servo(didacbot.Servos.S7, 180)
    basic.pause(100)
    didacbot.Servo(didacbot.Servos.S7, 90)
})
input.onButtonPressed(Button.A, function () {
    didacbot.Stepper(didacbot.Steppers.STEP1, 45,1)
    didacbot.Stepper(didacbot.Steppers.STEP2, -45,1)
    didacbot.MotorRun(didacbot.Motors.M4, 100)
})
input.onButtonPressed(Button.B, function () {
    didacbot.Stepper(didacbot.Steppers.STEP1, -90,1)
    didacbot.Stepper(didacbot.Steppers.STEP2, 90,1)
    didacbot.MotorRun(didacbot.Motors.M4, -100)
})
didacbot.MotorStop(didacbot.Motors.M4)
didacbot.Servo(didacbot.Servos.S7, 90)
basic.forever(function () {
	
})
