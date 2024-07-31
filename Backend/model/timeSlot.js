// models/TimeSlot.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const timeSlotSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    slots: [{
        time: {
            type: String,
            required: true
        },
        bookings: {
            type: Number,
            default: 0
        }
    }]
});

module.exports = mongoose.model('TimeSlot', timeSlotSchema);
