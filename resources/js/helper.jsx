export const formateMessageDate = (date , format) => {
    const now = new Date();
    const input_date = new Date(date);

    if(isToday(input_date)){
        return input_date.toLocaleTimeString([],{
            hour : '2-digit',
            minute : '2-digit'
        });
    }else if(isYesterday(input_date)){
        const formatedDate = 'Yesterday';
        {format === 'long' && (formatedDate + ' ' + input_date.toLocaleTimeString([],{
            hour : '2-digit',
            minute : '2-digit'
        }))}
        return formatedDate;


    }else if(now.getFullYear() === input_date.getFullYear()){
        return input_date.toLocaleDateString([],{
            month : 'short',
            day : '2-digit',
        });
    }else{
        return input_date.toLocaleDateString();

    }
};

export const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

export const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();
};
