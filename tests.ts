input.onButtonPressed(Button.A, function () {
    didacbot.Didacbot(didacbot.direction.Right, 1, didacbot.stepUnit.Rotations)
})
input.onButtonPressed(Button.B, function () {
        didacbot.Didacbot(didacbot.direction.Left, 1, didacbot.stepUnit.Rotations)

})
didacbot.MotorStop()
