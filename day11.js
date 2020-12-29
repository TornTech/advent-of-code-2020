const fs = require('fs');
const data = fs.readFileSync('day11.txt').toString();
const input = data.split('\r\n')

// returns number of adjacted seats that are occupied
const adjacentSeatCount = (seat, seats) => {
    // seat is {x: x-coordinate, y: y-coordinate}
    let seatCount = 0;

    const x = seat.x;
    const y = seat.y 
    const width = seats[0].length - 1;
    const length = seats.length - 1;

    // [x - 1, y] left
    if (x > 0 && seats[y][x - 1] === '#') seatCount++;
    // [x + 1, y] right
    if (x < width && seats[y][x + 1] === '#') seatCount++;
    // [x, y - 1] up
    if (y > 0 && seats[y - 1][x] === '#') seatCount++;
    // [x, y + 1] down
    if (y < length && seats[y + 1][x] === '#') seatCount++;
    // [x - 1, y - 1] upper left
    if (x > 0 && y > 0 && seats[y - 1][x - 1] === '#') seatCount++;
    // [x + 1, y - 1] upper right
    if (x < width && y > 0 && seats[y - 1][x + 1] === '#') seatCount++;
    // [x - 1, y + 1] bottom left 
    if (x > 0 && y < length && seats[y + 1][x - 1] === '#') seatCount++;
    // [x + 1, y + 1] bottom right
    if (x < width && y < length && seats[y + 1][x + 1] === '#') seatCount++;

    return seatCount;
}

// returns number of visible seats that are occupied
const visibleSeatCount = (seat, seats) => {
    // seat is {x: x-coordinate, y: y-coordinate}
    let seatCount = 0;

    const x = seat.x;
    const y = seat.y; 
    const width = seats[0].length - 1;
    const length = seats.length - 1;

    // [x - 1, y] left
    for (let i = 1; x - i >= 0; i++) {
        if (x > 0 && seats[y][x - i] === '#') {
            seatCount++;
            break;
        } else if (x > 0 && seats[y][x - i] === 'L') {
            break;
        }
    }
    // [x + 1, y] right
    for (let i = 1; x + i <= width; i++) {
        if (x < width && seats[y][x + i] === '#') {
            seatCount++;
            break;
        } else if (x < width && seats[y][x + i] === 'L') {
            break;
        }
    }
    // [x, y - 1] up
    for (let i = 1; y - i >= 0; i++) {
        if (y > 0 && seats[y - i][x] === '#') {
            seatCount++;
            break;
        } else if (y > 0 && seats[y - i][x] === 'L') {
            break;
        }
    }
    // [x, y + 1] down
    for (let i = 1; y + i <= length; i++) {
        if (y < length && seats[y + i][x] === '#') {
            seatCount++;
            break;
        } else if (y < length && seats[y + i][x] === 'L') {
            break;
        }
    }
    // [x - 1, y - 1] upper left
    for (let i = 1; x - i >= 0 && y - i >= 0; i++) {
        if (x > 0 && y > 0 && seats[y - i][x - i] === '#') {
            seatCount++;
            break;
        } else if (x > 0 && y > 0 && seats[y - i][x - i] === 'L') {
            break;
        }
    }
    // [x + 1, y - 1] upper right
    for (let i = 1; x + i <= width && y - i >= 0; i++) {
        if (x < width && y > 0 && seats[y - i][x + i] === '#') {
            seatCount++;
            break;
        } else if (x < width && y > 0 && seats[y - i][x + i] === 'L') {
            break;
        }
    }
    // [x - 1, y + 1] bottom left 
    for (let i = 1; x - i >= 0 && y + i <= length; i++) {
        if (x > 0 && y < length && seats[y + i][x - i] === '#') {
            seatCount++;
            break;
        } else if (x > 0 && y < length && seats[y + i][x - i] === 'L') {
            break;
        }
    }
    // [x + 1, y + 1] bottom right
    for (let i = 1; x + i <= width && y + i <= length; i++) {
        if (x < width && y < length && seats[y + i][x + i] === '#') {
            seatCount++;
            break;
        } else if (x < width && y < length && seats[y + i][x + i] === 'L') {
            break;
        }
    }

    return seatCount;
}

// Make a fuction to simulate a part one round
const simulateFirstRound = (seats) => 
    seats.map((row, rowIndex) => 
        row.split('').map((seat, columnIndex) => {
            const currentSeat = {x: columnIndex, y: rowIndex};
            return (seat === "L" && adjacentSeatCount(currentSeat,seats) === 0) ? "#" :
                (seat === "#" && adjacentSeatCount(currentSeat,seats) >= 4) ? "L" :
                seat;
        }).join('')
    )

// Make a fuction to simulate a part two round
const simulateSecondRound = (seats) => 
    seats.map((row, rowIndex) => 
        row.split('').map((seat, columnIndex) => {
            const currentSeat = {x: columnIndex, y: rowIndex};
            return (seat === "L" && visibleSeatCount(currentSeat,seats) === 0) ? "#" :
                (seat === "#" && visibleSeatCount(currentSeat,seats) >= 5) ? "L" :
                seat;
        }).join('')
    )

// Counts the total number of occupied seats
const countOccupiedSeats = (seats) => {
    let occupiedSeats = 0;

    seats.forEach(row => row.split('').forEach(seat => {
        if (seat === "#") occupiedSeats++;
    }))

    return occupiedSeats;
}

// Finds the final number of occupied seats with no more changes based on adjacent seats
const findLastStatePartOne = (seats) => {
    const oldSeatCount = countOccupiedSeats(seats);
    const newSeats = simulateFirstRound(seats);
    const NewSeatCount = countOccupiedSeats(newSeats);

    if (oldSeatCount === NewSeatCount) {
        return NewSeatCount;
    } else {
        return findLastStatePartOne(newSeats);
    }
}

// Finds the final number of occupied seats with no more changes based on visible seats
const findLastStatePartTwo = (seats) => {
    const oldSeatCount = countOccupiedSeats(seats);
    // console.log("old seat count", oldSeatCount)
    const newSeats = simulateSecondRound(seats);
    // console.table(newSeats)
    const NewSeatCount = countOccupiedSeats(newSeats);
    // console.log("new seat count", NewSeatCount)

    if (oldSeatCount === NewSeatCount) {
        return NewSeatCount;
    } else {
        return findLastStatePartTwo(newSeats);
    }
}

console.log("Part one answer is:",findLastStatePartOne(input))
console.log("Part two answer is:",findLastStatePartTwo(input))