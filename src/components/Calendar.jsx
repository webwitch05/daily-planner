import { useState, useEffect, useRef } from 'react';
import { format, parseISO, addDays, subDays } from 'date-fns';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

const Calendar= ({selectedDate, onChange})=>{
    
    const calendarRef = useRef(null);
    const containerRef = useRef(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    // Handle calendar change
    useEffect(() => {
        const calendar = calendarRef.current;
        
        const handleChange = (e) => {
            const newDate = parseISO(e.target.value);
            console.log(newDate)
            onChange(newDate);
            setIsCalendarOpen(false); // Close after selection
        };

        calendar?.addEventListener('change', handleChange);
        return () => calendar?.removeEventListener('change', handleChange);
    }, [isCalendarOpen]);

    // Close calendar when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setIsCalendarOpen(false);
        }
        };

        if (isCalendarOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isCalendarOpen]);

    // Update calendar when selectedDate changes
    useEffect(() => {
        if (calendarRef.current) {
        calendarRef.current.value = selectedDate;
        }
    }, [selectedDate]);

    const handlePrevDay = () => {
        onChange(prev => subDays(prev, 1));
    };

    const handleNextDay = () => {
        onChange(prev => addDays(prev, 1));
    };

    return (
        <div ref={containerRef} className="relative inline-block">
        {/* Date Display with Arrows */}
        <div className="flex items-center gap-2">
            <button 
            onClick={handlePrevDay}
            className="p-2 hover:bg-gray-100 rounded"
            >
            <IoMdArrowDropleft size={24} />
            </button>
            
            <button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
            {format(selectedDate, 'MMMM d, yyyy')}
            </button>
            
            <button 
            onClick={handleNextDay}
            className="p-2 hover:bg-gray-100 rounded"
            >
            <IoMdArrowDropright size={24} />
            </button>
        </div>

        {/* Calendar Popup */}
        {isCalendarOpen && (
            <div className="absolute top-full mt-2 z-50">
            <calendar-date
                ref={calendarRef}
                value={format(selectedDate, 'yyyy-MM-dd')}
                className="bg-white border border-gray-300 rounded-sm shadow-lg p-3"
            >
                <IoMdArrowDropleft slot="previous"/>
                <IoMdArrowDropright slot="next"/>
                <calendar-month></calendar-month>
            </calendar-date>
            </div>
        )}
        </div>
    );
}

export default Calendar