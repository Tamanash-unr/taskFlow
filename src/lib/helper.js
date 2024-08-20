
export const getJSDate = (timestamp) => {
    const date = timestamp.toDate();

    const jsDate =  date.getFullYear() + '-' + (date.getMonth()+1 < 10 ? '0' : '') +
                    (date.getMonth() + 1) + '-' + 
                    date.getDate()

    return jsDate
}

export const getFormattedDate = (timestamp) => {
    const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']  
    const date = timestamp.toDate();

    const completionDate = {
        month: month[date.getMonth()],
        date: date.getDate() + ',' + date.getFullYear(),
        hours: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        minutes: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    }

    const formattedDate = completionDate.month + ' ' + 
                          completionDate.date + ' ' + 
                          completionDate.hours + ':' + 
                          completionDate.minutes + ' ' + (completionDate.hours > 12 ? 'PM' : 'AM')

    return formattedDate
}