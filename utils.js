const options = {
    month: 'long',
};

const nth = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
};

function getDate() {
    const date = new Date();
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", options).format(date)
    const year = date.getFullYear();
    const time = date.getTime();
    return { formatted: `${day}${nth(day)} ${month} ${year}`, unformatted: `${time}` }
}

function sort(arr, isLowToHigh) {
    if (isLowToHigh) {
        arr.sort((a, b) => a.date.unformatted - b.date.unformatted)
    } else {
        arr.sort((a, b) => b.date.unformatted - a.date.unformatted)
    }
}

export {
    getDate,
    sort
}