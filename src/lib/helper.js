import { getTasks } from "./Firebase/firebase"
import toast from "react-hot-toast"

export const getJSDate = (timestamp) => {
    const date= new Date(timestamp)

    const jsDate =  date.getFullYear() + '-' + (date.getMonth()+1 < 10 ? '0' : '') +
                    (date.getMonth() + 1) + '-' + 
                    date.getDate()

    return jsDate
}

export const getFormattedDate = (timestamp) => {
    const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const date = new Date(timestamp)

    const completionDate = {
        month: month[date.getMonth()],
        date: date.getDate() + ',' + date.getFullYear(),
        
        // Formatting Time (TBI) - Included Later
        // hours: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        // minutes: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    }

    const formattedDate = completionDate.month + ' ' + 
                          completionDate.date + ' '

    // Formatting Time (TBI) - Included Later
    //   completionDate.hours + ':' + 
    //   completionDate.minutes + ' ' + (completionDate.hours > 12 ? 'PM' : 'AM')

    return formattedDate
}

export const generateUID = () => {
    // Modeled after base64 web-safe chars, but ordered by ASCII.
    var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
  
    // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
    var lastPushTime = 0;
  
    // We generate 72-bits of randomness which get turned into 12 characters and appended to the
    // timestamp to prevent collisions with other clients.  We store the last characters we
    // generated because in the event of a collision, we'll use those same characters except
    // "incremented" by one.
    var lastRandChars = [];

    var now = new Date().getTime();
    var duplicateTime = (now === lastPushTime);
    lastPushTime = now;

    var timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
    timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
    // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
    now = Math.floor(now / 64);
    }
    if (now !== 0) throw new Error('We should have converted the entire timestamp.');

    var id = timeStampChars.join('');

    if (!duplicateTime) {
    for (i = 0; i < 12; i++) {
        lastRandChars[i] = Math.floor(Math.random() * 64);
    }
    } else {
    // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
    for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
        lastRandChars[i] = 0;
    }
    lastRandChars[i]++;
    }
    for (i = 0; i < 12; i++) {
    id += PUSH_CHARS.charAt(lastRandChars[i]);
    }
    if(id.length !== 20) throw new Error('Length should be 20.');

    return id;
}

export const fetchTasks = async () => {
    try {
        const result = await getTasks();
        if(!result) return

        if(result.status){
            return result.data
        } else {
            throw new Error(result.message)
        }
    } catch (error) {
        toast.error(error.message)
        return
    }
}