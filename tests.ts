input.onGesture(Gesture.Shake, function () {
    didacbot.Servo(microshield.Servos.S7, 180)
    basic.pause(100)
    didacbot.Servo(microshield.Servos.S7, 90)
})
input.onButtonPressed(Button.A, function () {
    didacbot.StepperDegree(didacbot.Steppers.STEP1, 45)
    didacbot.StepperDegree(didacbot.Steppers.STEP2, -45)
    didacbot.MotorRun(didacbot.Motors.M4, 100)
})
input.onButtonPressed(Button.B, function () {
    didacbot.StepperDegree(didacbot.Steppers.STEP1, -90)
    didacbot.StepperDegree(didacbot.Steppers.STEP2, 90)
    didacbot.MotorRun(didacbot.Motors.M4, -100)
})
didacbot.MotorStop(didacbot.Motors.M4)
didacbot.Servo(didacbot.Servos.S7, 90)
basic.forever(function () {
	
})
