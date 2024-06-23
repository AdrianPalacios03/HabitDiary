export const getPreviousDay = (date = new Date()) => {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
  
    return previous;
}

export const getNextDay = (date = new Date()) => {
    const next = new Date(date.getTime());
    next.setDate(date.getDate() + 1);
  
    return next;
}