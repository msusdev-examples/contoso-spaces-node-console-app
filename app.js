#!/usr/bin/env node

import { program } from 'commander';
import accounting from 'accounting';
import chalk from 'chalk';
import align from 'string-align';
import data from './data.js';

program
    .option('-s, --seats <int>');

await program.parseAsync();

const options = program.opts();

var seatFilter = options.seats ?? 0;
if (options.seats) {
    console.log(`Seat Filter: ${String(seatFilter).padStart(2, '0')}`);
}

for(var location of data.locations.filter(l => l.rooms.some(r => r.seats >= seatFilter))) {
    console.log();
    console.log(location.name);
    console.log(location.mailingAddress);
    console.log("Rooms:");
    console.log(`\t${align('Description', 25, 'right')}\t${align('Seats', 2, 'right')}\t${align('MonthlyRate', 8, 'left')}`);
    for (var room of location.rooms.filter(r => r.seats >= seatFilter)) {
        console.log(`\t${align(room.description, 25, 'right')}\t${align(room.seats, 2, 'right')}\t${align(accounting.formatMoney(room.monthlyRate), 8, 'left')}`);
    }
}