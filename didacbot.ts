//% color=#FFAD5A weight=10 icon="\uf1b9"

namespace didacbot {

    const PCA9685_ADDRESS = 0x40
    
    const MODE1 = 0x00
    const MODE2 = 0x01

    const SUBADR1 = 0x02
    const SUBADR2 = 0x03
    const SUBADR3 = 0x04
    const PRESCALE = 0xFE

    const LED0_ON_L = 0x06
    const LED0_ON_H = 0x07
    const LED0_OFF_L = 0x08
    const LED0_OFF_H = 0x09

    const ALL_LED_ON_L = 0xFA
    const ALL_LED_ON_H = 0xFB
    const ALL_LED_OFF_L = 0xFC
    const ALL_LED_OFF_H = 0xFD
    
    const STP_CHA_L = 2047
    const STP_CHA_H = 4095
    const STP_CHB_L = 1
    const STP_CHB_H = 2047
    const STP_CHC_L = 1023
    const STP_CHC_H = 3071
    const STP_CHD_L = 3071
    const STP_CHD_H = 1023
    
    const on = 0
    const off = 0
    const freq_hz = 60
    
    let initialized = false
    let matBuf = pins.createBuffer(17);
	
	export enum StepUnit {
		//% block="degrees"
		Degrees,
		//% block="rotations"
		Rotations
	}
	
	export enum Direction {
		//% block="forward"
		Forward,
		//% block="backward"
		Backward,
		//% block="right"
		Right,
		//% block="left"
		Left
	}

    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }
    
    function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }
    
    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE)
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE)
        return val
    }
    
    function initPCA9685(): void {
        i2cwrite(PCA9685_ADDRESS, MODE1, 0x00)
        setFreq(50); //1s / 20ms
        for (let idx = 0; idx < 16; idx++) {
            setPwm(idx, 0, 0);
        }
        initialized = true
    }

    function setFreq(freq: number): void {
		  // Constrain the frequency
		  let prescaleval = 25000000
		  prescaleval /= 4096
		  prescaleval /= freq
		  prescaleval = prescaleval * 25 / 24  // 0.915
		  prescaleval -= 1
		  let prescale = prescaleval //Math.Floor(prescaleval + 0.5);
		  let oldmode = i2cread(PCA9685_ADDRESS, MODE1)
		  let newmode = (oldmode & 0x7F) | 0x10 // sleep
			  i2cwrite(PCA9685_ADDRESS, MODE1, newmode) // go to sleep
		  i2cwrite(PCA9685_ADDRESS, PRESCALE, prescale) // set the prescaler
		  i2cwrite(PCA9685_ADDRESS, MODE1, oldmode)
		  basic.pause(1)
		  //control.waitMicros(5000);
		  i2cwrite(PCA9685_ADDRESS, MODE1, oldmode | 0xa1)  //1010 0001
      }
      
    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;

        let buf = pins.createBuffer(5)
        buf[0] = LED0_ON_L + 4 * channel
        buf[1] = on & 0xff
        buf[2] = (on >> 8) & 0xff
        buf[3] = off & 0xff
        buf[4] = (off >> 8) & 0xff
        pins.i2cWriteBuffer(PCA9685_ADDRESS, buf)
    }

    function stopMotor(index: number) {
        setPwm((index - 1) * 2, 0, 0)
        setPwm((index - 1) * 2 + 1, 0, 0)
    }

    function forward() {
        setPwm(2, STP_CHA_L, STP_CHA_H)
        setPwm(1, STP_CHB_L, STP_CHB_H)
        setPwm(3, STP_CHC_L, STP_CHC_H)
        setPwm(0, STP_CHD_L, STP_CHD_H)
        setPwm(4, STP_CHA_L, STP_CHA_H)
        setPwm(7, STP_CHB_L, STP_CHB_H)
        setPwm(5, STP_CHC_L, STP_CHC_H)
        setPwm(6, STP_CHD_L, STP_CHD_H)
    }

    function backward() {
        setPwm(0, STP_CHA_L, STP_CHA_H)
        setPwm(3, STP_CHB_L, STP_CHB_H)
        setPwm(1, STP_CHC_L, STP_CHC_H)
        setPwm(2, STP_CHD_L, STP_CHD_H)
        setPwm(6, STP_CHA_L, STP_CHA_H)
        setPwm(5, STP_CHB_L, STP_CHB_H)
        setPwm(7, STP_CHC_L, STP_CHC_H)
        setPwm(4, STP_CHD_L, STP_CHD_H)
    }

    function turnRight() {
		setPwm(2, STP_CHA_L, STP_CHA_H)
        setPwm(1, STP_CHB_L, STP_CHB_H)
        setPwm(3, STP_CHC_L, STP_CHC_H)
        setPwm(0, STP_CHD_L, STP_CHD_H)
        setPwm(4, 0, 0)
        setPwm(7, 0, 0)
        setPwm(5, 0, 0)
        setPwm(6, 0, 0)
    }

    function turnLeft() {
		setPwm(2, 0, 0)
        setPwm(1, 0, 0)
        setPwm(3, 0, 0)
        setPwm(0, 0, 0)
        setPwm(4, STP_CHA_L, STP_CHA_H)
        setPwm(7, STP_CHB_L, STP_CHB_H)
        setPwm(5, STP_CHC_L, STP_CHC_H)
        setPwm(6, STP_CHD_L, STP_CHD_H)
    }
	
	function spinRight() {
		setPwm(2, STP_CHA_L, STP_CHA_H)
        setPwm(1, STP_CHB_L, STP_CHB_H)
        setPwm(3, STP_CHC_L, STP_CHC_H)
        setPwm(0, STP_CHD_L, STP_CHD_H)
        setPwm(6, STP_CHA_L, STP_CHA_H)
        setPwm(5, STP_CHB_L, STP_CHB_H)
        setPwm(7, STP_CHC_L, STP_CHC_H)
        setPwm(4, STP_CHD_L, STP_CHD_H)
    }
	
	function spinLeft() {
        setPwm(0, STP_CHA_L, STP_CHA_H)
        setPwm(3, STP_CHB_L, STP_CHB_H)
        setPwm(1, STP_CHC_L, STP_CHC_H)
        setPwm(2, STP_CHD_L, STP_CHD_H)
        setPwm(4, STP_CHA_L, STP_CHA_H)
        setPwm(7, STP_CHB_L, STP_CHB_H)
        setPwm(5, STP_CHC_L, STP_CHC_H)
        setPwm(6, STP_CHD_L, STP_CHD_H)
    }
    
	function motorStopAll() {
		setPwm(2, 0, 0)
		setPwm(1, 0, 0)
		setPwm(3, 0, 0)
		setPwm(0, 0, 0)
		setPwm(6, 0, 0)
		setPwm(5, 0, 0)
		setPwm(7, 0, 0)
		setPwm(4, 0, 0)
	}

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
		* Didacbot Movement
		* @param movement type; eg: forward, backward, right, left
	*/
    //% blockId=didacbot_movement block="move Didacbot |%movement|"
    //% weight=120
    export function moveDidacbot(movement: Direction): void {
        if (!initialized) {
            initPCA9685()
        }
        if (movement == Direction.Forward) 
            forward()
        else if (movement == Direction.Backward)
            backward()
        else if (movement == Direction.Left)
            turnLeft()
        else if (movement == Direction.Right)
            turnRight()
    }

	/**
		* Didacbot Movement with params
		* @param movement type; eg: forward, backward, right, left
		* @param number of rotations or degrees; eg: -5, 5
		* @param unit; eg: rotations or degrees
	*/
	//% blockId=didacbot_movement_params block="move Didacbot |%movement| turning wheels |%num|%unit|"
    //% weight=150
    export function moveDidacbotParams(movement: Direction, num: number, unit: StepUnit): void {
        if (!initialized) {
            initPCA9685()
        }
        if (movement == Direction.Forward)
            forward()
        else if (movement == Direction.Backward)
            backward()
        else if (movement == Direction.Left)
            turnLeft()
        else if (movement == Direction.Right)
            turnRight()
		
       	num = Math.abs(num)
		
		switch (unit) {
            case StepUnit.Rotations: basic.pause(10750 * num)
            case StepUnit.Degrees: basic.pause(10750 * num / 360)
        }
		
        motorStopAll()
    }
	
	/**
		* Didacbot spin with params
		* @param degree [0-360] robot rotation degrees; eg: 0, 180, -180, 360
	*/
	//% blockId=didacbot_spin_params block="spin Didacbot |%degree| degrees"
    //% weight=100
    //% degree.min=-180 degree.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function spinDidacbot(degree: number): void {
        if (!initialized) {
            initPCA9685()
        }
		if (degree != 0) {
			if (degree < 0) {
				spinLeft()
			}    
			else if (degree > 0) {
				spinRight()
			}
			basic.pause(57.33 * Math.abs(degree))
			motorStopAll()
		}
        else {
            motorStopAll()
        }	  
    }
	
	/**
		* Didacbot stop movement
	*/
	//% blockId=didacbot_stop block="stop Didacbot"
    //% weight=90
    export function stopDidacbot(): void {
        if (!initialized) {
            initPCA9685()
        }
		motorStopAll()
	}
}
