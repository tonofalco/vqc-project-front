import { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { useEarthEventsStore, useAuthStore } from 'src/stores';
import type { EventClickArg } from '@fullcalendar/core';
import { EventContent } from './EventContent';
import { useEarthEvent } from 'src/hooks';
import 'src/styles/calendar.css';
import { capitalizeText } from 'src/helpers';

export const EarthEventsCalendar = () => {
  const { earthEvents, fetchEarthEvents } = useEarthEventsStore();
  const { user } = useAuthStore();
  const { handleUpdateEarthEventModal } = useEarthEvent();
  
  const lastClickRef = useRef<{ id: string; time: number } | null>(null);
  const DOUBLE_CLICK_DELAY = 300;

  // Fetch inicial de eventos
  useEffect(() => {
    fetchEarthEvents();
  }, [fetchEarthEvents]);

  // Convertir los eventos para FullCalendar
  const calendarEvents = earthEvents.map((event) => ({
    id: event.id.toString(),
    title: `${event.nameClient} - ${event.departure} → ${event.destination}`,
    start: event.start,
    end: event.end,
    extendedProps: {
      transportNumber: event.transportNumber,
      transport: event.transport,
      nameClient: event.nameClient,
      destination: event.destination,
      userId: event.userId,
      currentUserId: String(user?.uid || ''),
      seats: event.seats,
      phone: event.phone,
      price: event.price,
      advance: event.advance,
      status: event.status,
      notes: event.notes,
    },
  }));

  const handleDateClick = (arg: any) => {
    console.log('Date clicked:', arg.dateStr);
  };

  const handleEventClick = (arg: EventClickArg) => {
    const event = arg.event;
    const eventId = event.id;
    const currentTime = Date.now();

    // Detectar doble click
    if (lastClickRef.current?.id === eventId && (currentTime - lastClickRef.current.time) < DOUBLE_CLICK_DELAY) {
      // Es un doble click
      const earthEvent = earthEvents.find(e => e.id === Number(eventId));
      if (earthEvent) {
        handleUpdateEarthEventModal(earthEvent);
      }
      lastClickRef.current = null;
    } else {
      // Es un click simple
      console.log('Event clicked:', {
        title: event.title,
        start: event.start,
        end: event.end,
        extendedProps: event.extendedProps,
      });
      lastClickRef.current = { id: eventId, time: currentTime };
    }
  };

  return (
    <div className="w-full">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={new Date()}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listMonth',
        }}
        // titleFormat={{ year: 'numeric', month: 'long' }}
        titleFormat={(info) => {
          const date = new Date(info.date.marker);
          // Ajustar por zona horaria
          date.setTime(date.getTime() + date.getTimezoneOffset() * 60000);
          const month = new Intl.DateTimeFormat('es-MX', { month: 'long' }).format(date);
          const year = date.getFullYear();
          
          // Capitalizamos la primera letra del mes
          const monthCapitalized = capitalizeText(month);
          
          return `${monthCapitalized} ${year}`;
        }}
        height="auto"
        events={calendarEvents}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventContent={EventContent}
        locale="es"
        buttonText={{
          today: 'Hoy',
          month: 'Mes',
          list: 'Agenda',
        }}
      />
    </div>
  );
};
