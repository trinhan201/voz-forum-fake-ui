export const formatDate = (dateTime) => {
    const date = new Date(dateTime);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullDate = year + '-' + month + '-' + day;
    return fullDate;
};
