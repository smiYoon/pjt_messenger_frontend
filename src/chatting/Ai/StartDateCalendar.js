import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StartDateCalendar = () => {

    const [startDate, setStartDate] = useState(new Date());

        return (
            <div>
                <DatePicker
                 selected={startDate}
                 onChange={(date) => setStartDate(date)}
                 dateFormat="yyyy-MM-dd"
                />
            </div>
        );

    
};

export default StartDateCalendar;