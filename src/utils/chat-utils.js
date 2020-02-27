import {date} from 'quasar';

export const getStatus = (currentDate, date) => {
    const time = (new Date(currentDate) - new Date(date)) / 1000 / 60;
    return time < 5 ? 'online' :
        time > 30 ? 'offline' : 'away'
}

export const lastActivity = (dateString) => {
    const time = (new Date() - new Date(dateString)) / 1000;
    if(time < 60) {
        return 'just now';
    } else if (time < 60 * 60) {
        return Math.floor(time / 60) + 'm';
    } else if ( (60 * 60 <= time) && (time < 60 * 60 * 24)) {
        return Math.floor(time / 60 / 60) + 'h';
    } else if ( (60 * 60 * 24 < time) && (time < 60 * 60 * 24 *30)) {
        return Math.floor(time / 60 / 60 / 24) + ' days ago';
    } else {
        return date.formatDate(time, 'DD/MM/YYYY' );
    }
}