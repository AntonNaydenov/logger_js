const eventEmmiter =  require('events');
const fs = require('fs');
const path = require('path');

function pretter(dateNum){
    if (dateNum < 10){
        dateNum = '0'+ dateNum;
    }
    // console.log(dateNum);
    return dateNum;
}

function dateTime(){
    let dateObj = new Date();
    let date = dateObj.getDate();
    let month = dateObj.getMonth();
    let year = dateObj.getFullYear();
    let hour = dateObj.getHours();
    let min = dateObj.getMinutes();
    let sec = dateObj.getSeconds();
    
    let currentDate = 
        year + '-' + pretter(month) + 
        '-' + pretter(date) + ' ' + 
        pretter(hour) + ':'+ pretter(min) + ':'+ pretter(sec) + '  -  ';
    return currentDate;
    // console.log(currentDate);
}

const logger = new eventEmmiter();
 logger.on('message', message => {
    fs.appendFile(path.join(__dirname, 'message.log'), message, err => {
        if (err) throw new Error(err);
    });
    //  console.log('Message: ', message);
 });
 logger.on('error', error => {
    fs.appendFile(path.join(__dirname, 'error.log'), error, err => {
        if (err) throw new Error(err);
    });
    //  console.log('Error: ', error);
 });

 const eventLog = message => logger.emit('message', `${dateTime()}` + message + '\n');
 const errorLog = error => logger.emit('error', `${dateTime()}` + error + '\n');

// dateTime();
// eventLog('Some event message');
// errorLog('Some error message');
exports.eventLog = eventLog;
exports.errorLog = errorLog;
