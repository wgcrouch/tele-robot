#!/usr/bin/env node
'use strict';
var socket = require('socket.io-client')('http://192.168.1.18:3000');
var ev3 = require('ev3dev');

var motorB = new ev3.Motor('outB');
var motorC = new ev3.Motor('outC');

motorB.rampUpSp = 100;
motorC.rampUpSp = 100;
motorB.rampDownSp = 100;
motorC.rampDownSp = 100;
motorB.timeSp = 100;
motorC.timeSp = 100;

var move = function(dir) {
    motorB.dutyCycleSp = -50;
    motorC.dutyCycleSp = -50;

    switch (dir) {
        case 'forward':
            motorB.dutyCycleSp = -50;
            motorC.dutyCycleSp = -50;
            break;
        case 'back':
            motorB.dutyCycleSp = 50;
            motorC.dutyCycleSp = 50;
            break;
        case 'left':
            motorB.dutyCycleSp = -50;
            motorC.dutyCycleSp = 50;
            break;
        case 'right':
            motorB.dutyCycleSp = 50;
            motorC.dutyCycleSp = -50;
            break;
    }

    motorB.command = 'run-timed';
    motorC.command = 'run-timed';
};

socket.on('connect', function () {
    console.log('connected');

    socket.on('move', function(data) {
        console.log('move', data);
        move(data.direction);
    });
});


