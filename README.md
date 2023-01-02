## Didacbot package
Didacbot is an educational robot to learn programming in early ages. This Didacbot package was developed by [Make&Learn](https://www.makeandlearn.cat/). If you're interested in this robot, you can get it through the [Make&Learn's online shop](https://botiga.makeandlearn.cat/producto/didacbot).

The robot Didacbot works thanks to the module micro:shield, a flexible board where you can connect components of many kinds, especially the ones that the educational community uses more frequently. You can find its own MakeCode extension [here](https://github.com/MakeAndLearn/pxt-microshield).

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

## License
MIT

## Supported targets
for PXT/microbit (The metadata above is needed for package search.)
