export const dateFormatter = (date) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: "numeric",
        month: 'short',
        day: 'numeric'
    });

    return formattedDate;
}