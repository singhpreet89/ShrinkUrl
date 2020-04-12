const moment = require('moment');

module.exports = {
    generator : () => {
        const date = moment().format('YYYY-MM-DD');
        console.log("Current date-time: " ,  moment().format('MMMM Do YYYY, h:mm:ss a'));
        if (!date) {
            return "shrink-it.log";
        }
        return date + "-shrink-it.log"
    },
}
