var fastn = require('^fastn'),
    debug = require('debug')('tutorme:app.time'),
    start = new Date(),
    startMil = start.getTime(),
    h = start.getHours(), 
    m = ( '00' + + Math.floor( start.getMinutes() )).slice(-2) ,
    _time = (h > 12) ? (h-12 + ':' + m +' PM') : (h + ':' + m +' AM'),
    now = 0,
    fiveMin = 1000 * 60 * 5,
    thirtySec = 1000 * 30;

var timeModel = new fastn.Model({
    hours: '00',
    minutes: '00',
    startTime: _time,
    currentTime: startMil,
    elapsedTime: 0,
    fiveMinCounter: fiveMin,
    thirtySecCounter: thirtySec,
    timeIncrement: 1
});


var timeData = timeModel.get('.'),
        nextTime = timeData.currentTime + ( timeData.timeIncrement * 60000 ),
        timeUpdate = new Date(nextTime);

        timeModel.update({
            fiveMinCounter : timeData.fiveMinCounter - 10000, 
            currentTime: nextTime
        })

module.exports = {
    timeModel : timeModel
}