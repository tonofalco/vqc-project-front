import type { EventContentArg } from '@fullcalendar/core';

export const EventContent = (eventInfo: EventContentArg) => {
  const { event } = eventInfo;
  const { extendedProps } = event;

  const transport = extendedProps.transport || '';
  const nameClient = extendedProps.nameClient || '';
  const destination = extendedProps.destination || '';
  const eventUserId = extendedProps.userId || '';
  const currentUserId = extendedProps.currentUserId || '';

  const isOwner = eventUserId === currentUserId;
  const backgroundColor = isOwner ? '#1e40af' : '#465670';

  return (
    <div 
      className="p-1 w-full overflow-hidden rounded"
      style={{ backgroundColor }}
    >
      <div className=" truncate w-full">
        <strong className="fc-event-title-custom block truncate">{transport}</strong>
      </div>
      <div className="fc-event-details truncate text-xs w-full">
        <span className='block truncate'>{nameClient}</span> 
        <span className="block truncate">{destination}</span>
      </div>
    </div>
  );
};
