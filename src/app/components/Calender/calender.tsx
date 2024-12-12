import React, { useState, useEffect } from 'react';

interface CalendarProps {
  events: Date[];
  onSelect: (date: Date | undefined) => void;
}

const Calendar: React.FC<CalendarProps> = ({ events, onSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const handleClickOutside = () => {
      setSelectedDate(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onSelect]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstDayOfWeek = firstDayOfMonth.getDay();
    const lastDayOfWeek = lastDayOfMonth.getDay();

    const daysInMonth = [];
    const prevMonthDays = [];
    const nextMonthDays = [];

    const prevMonth = new Date(year, month - 1, 1);
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      prevMonthDays.push(prevMonthLastDay - i);
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysInMonth.push(i);
    }

    const nextMonth = new Date(year, month + 1, 1);
    for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
      nextMonthDays.push(i);
    }

    return { prevMonthDays, daysInMonth, nextMonthDays };
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleSelectDay = (day: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (newSelectedDate.getMonth() === currentDate.getMonth()) {
      setSelectedDate(newSelectedDate);
      onSelect(newSelectedDate);
    }
  };

  const renderCalendar = () => {
    const { prevMonthDays, daysInMonth, nextMonthDays } = getDaysInMonth(currentDate);
    const currentDay = new Date();

    return (
      <div className="grid grid-cols-7 gap-1 text-sm text-gray-500 ">
        {prevMonthDays.map((day, index) => (
          <button
            key={`prev-${index}`}
            className="py-1.5 text-center text-gray-400"
            disabled
          >
            {day}
          </button>
        ))}
        {daysInMonth.map((day, index) => {
          const isToday = currentDay.getDate() === day && currentDay.getMonth() === currentDate.getMonth();
          const isSelected = selectedDate?.getDate() === day && selectedDate.getMonth() === currentDate.getMonth();
          const isEvent = events.some(event => event.getDate() === day && event.getMonth() === currentDate.getMonth());
          const isPast = new Date(currentDate.getFullYear(), currentDate.getMonth(), day) < currentDay && !isToday;
          return (
            <button
              key={index}
              className={`py-1.5 text-center rounded-lg relative ${
                isToday
                  ? 'bg-orange-600 text-white !opacity-100 !cursor-pointer'
                  : isSelected
                  ? 'bg-orange-300 text-white'
                  : 'bg-white text-gray-900'
              } ${isPast ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={(event) => !isPast && handleSelectDay(day, event)}
              disabled={isPast}
            >
              {day}
              {isEvent && <span className="block w-1.5 h-1.5 bg-red-500 rounded-full left-1/2 bottom-1 -translate-x-1/2 absolute"></span>}
            </button>
          );
        })}
        {nextMonthDays.map((day, index) => (
          <button
            key={`next-${index}`}
            className="py-1.5 text-center text-gray-400"
            disabled
          >
            {day}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="" onClick={(e) => e.stopPropagation()}>
      <div className="mt-4">
        <div className="text-center">
          <div className="flex items-center text-gray-900">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="flex-auto text-sm font-semibold">
              {currentDate.toLocaleString('default', { month: 'long' })}
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-back gap-1 px-1">
            <div className='border border-orange-600 py-1 rounded-lg bg-orange-500/40 font-bold'>S</div>
            <div className='border border-orange-600 py-1 rounded-lg bg-orange-500/40 font-bold'>M</div>
            <div className='border border-orange-600 py-1 rounded-lg bg-orange-500/40 font-bold'>T</div>
            <div className='border border-orange-600 py-1 rounded-lg bg-orange-500/40 font-bold'>W</div>
            <div className='border border-orange-600 py-1 rounded-lg bg-orange-500/40 font-bold'>T</div>
            <div className='border border-orange-600 py-1 rounded-lg bg-orange-500/40 font-bold'>F</div>
            <div className='border border-orange-600 py-1 rounded-lg bg-orange-500/40 font-bold'>S</div>
          </div>
          <div className="isolate mt-2 gap-px overflow-hidden rounded-lg bg-gray-50 text-sm shadow ring-1 ring-gray-200 p-1">
            {renderCalendar()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
