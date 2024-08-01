

const Booking = require('../model/booking');
const TimeSlot = require('../model/timeSlot');
const User=require('../model/timeSlot');

// Book a time slot
const BookSlot = async (req, res) => {
    const { user_id, date, time, district } = req.body;
    console.log('Request received:', { user_id, date, time, district });

    try {
        const user_email=await Booking.findOne({user_id:user_id});
        console.log(user_email)
        if(user_email){
           
           return res.status(404).json({error:"user can book only one slot"}) 
        }
       
       
        const parsedDate = new Date(date);
        parsedDate.setUTCHours(0, 0, 0, 0);
      

        const timeSlot = await TimeSlot.findOne({ date:parsedDate });
       


        if (!timeSlot) {
            return res.status(404).json({ error: 'Time slot not found' });
        }

        console.log('TimeSlot found:', timeSlot);

        const slot = timeSlot.slots.find(slot => slot.time === time);
        

        if (!slot) {
            return res.status(404).json({ error: 'Slot not found' });
        }

        console.log('Slot found:', slot);

        if (slot.bookings >= 3) {
            return res.status(400).json({ error: 'Slot is full' });
        }

        slot.bookings += 1;
        await timeSlot.save();

        const newBooking = new Booking({ user_id, date: parsedDate, time, district });
        await newBooking.save();

        res.status(200).json({ message: 'Slot booked successfully', booking: newBooking });
    } catch (error) {
        console.error('Error booking slot:', error);
        res.status(500).json({ error: 'Failed to book slot' });
    }
};



const viewBook=async(req,res)=>{
    try{
        const user_id=req.params.user_id;
const booking=await Booking.findOne({user_id:user_id});

res.send(booking);

    }catch(err){
        console.log('some internal error');
        res.status(500).json({err:"some internal error"});  
    }
}



const generateTimeSlots = () => {
    return [
        { time: '09:00 AM - 10:00 AM', bookings: 0 },
        { time: '12:00 PM - 01:00 PM', bookings: 0 },
        { time: '02:00 PM - 03:00 PM', bookings: 0 }
    ];
};


const getTimeSlots = async (req, res) => {



    const { date } = req.body;
    const parsedDate = new Date(date);
try{
    if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
    }
    

    

    let timeSlot = await TimeSlot.findOne({ date: parsedDate });
 
    if (!timeSlot) {
      
        const slots = generateTimeSlots();

        
        timeSlot = new TimeSlot({
            date: parsedDate,
            slots
        });
        await timeSlot.save();
    }

    res.status(200).json({ slots: timeSlot.slots });
}
   

     catch (error) {
        console.error('Failed to fetch time slots:', error);
        res.status(500).json({ error: 'Failed to fetch time slots' });
    }
    
  };

module.exports = {BookSlot,viewBook,getTimeSlots};











