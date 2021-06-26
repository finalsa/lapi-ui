import Moment from 'moment'

export default function dateToString(date, withTime = false) {

    return (withTime) ? Moment(date).format('YYYY-MM-DD HH:mm:ss') : Moment(date).format('YYYY-MM-DD 00:00:00');
}
