import { Todo } from "./types";

function getRandomDate(from: Date, to: Date) {
  const fromTime = from.getTime();
  const toTime = to.getTime();
  return new Date(fromTime + Math.random() * (toTime - fromTime));
}

const today = new Date();
const nextWeek = new Date();
nextWeek.setDate(today.getDate() + 7);

const data: Todo[] = [
  {
    id: 1,
    title: "Buy milk",
    description: "Buy milk from the store",
    dueDate: getRandomDate(today, nextWeek),
    coordinates: {
      latitude: 57.7106,
      longitude: 12.9423,
    },
    location: "Trandögatan 20, 504 33 Borås, Sweden",
    alertTime: new Date(),
    status: "Pending",
    priority: "Low",
  },
  {
    id: 2,
    title: "Buy eggs",
    description: "Buy eggs from the store",
    dueDate: getRandomDate(today, nextWeek),
    status: "Pending",
    priority: "Low",
  },
  {
    id: 3,
    title: "Buy bread",
    description: "Buy bread from the store",
    dueDate: getRandomDate(today, nextWeek),
    coordinates: {
      latitude: 57.7106,
      longitude: 12.9423,
    },
    location: "Trandögatan 20, 504 33 Borås, Sweden",
    status: "Pending",
    priority: "Low",
  },
  {
    id: 4,
    title: "Buy cheese",
    description: "Buy cheese from the store",
    dueDate: getRandomDate(today, nextWeek),
    coordinates: {
      latitude: 57.7387,
      longitude: 12.9326,
    },
    location: "Kolonigatan 1, 506 40 Borås, Sweden",
    alertOnLocation: true,
    status: "Pending",
    priority: "Low",
  },
  {
    id: 5,
    title: "Buy butter",
    description: "Buy butter from the store",
    dueDate: getRandomDate(today, nextWeek),
    coordinates: {
      latitude: 57.7106,
      longitude: 12.9423,
    },
    location: "Trandögatan 20, 504 33 Borås, Sweden",
    status: "Pending",
    priority: "Medium",
  },
  {
    id: 6,
    title: "Buy chocolate",
    description: "Buy chocolate from the store",
    dueDate: getRandomDate(today, nextWeek),
    status: "Pending",
    priority: "High",
  },
];

export default data;
