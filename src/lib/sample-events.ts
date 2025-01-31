import { Event } from "./types"

const today = new Date()
today.setHours(0, 0, 0, 0)

export const sampleEvents: Event[] = [
  // {
  //   id: "1",
  //   title: "Breakfast",
  //   date: new Date(today.getTime()),
  //   startTime: "07:00",
  //   color: "blue",
  // },
  // {
  //   id: "2",
  //   title: "Flight to Paris",
  //   date: new Date(today.getTime()),
  //   startTime: "07:30",
  //   location: "John F. Kennedy International Airport",
  //   color: "pink",
  // },
  // {
  //   id: "3",
  //   title: "Sightseeing",
  //   date: new Date(today.getTime()),
  //   startTime: "11:00",
  //   location: "Eiffel Tower",
  //   color: "blue",
  // },
  // {
  //   id: "4",
  //   title: "Business Meeting",
  //   date: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
  //   startTime: "14:00",
  //   location: "Conference Room A",
  //   color: "pink",
  // },
  // {
  //   id: "5",
  //   title: "Dinner Reservation",
  //   date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
  //   startTime: "19:00",
  //   location: "Le Cheval d'Or",
  //   color: "blue",
  // },
]

