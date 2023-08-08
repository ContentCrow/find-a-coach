import { defineStore } from "pinia";
import hash from 'object-hash';

const defaultCoaches = [
  {
    id: 1,
    firstname: "Peter",
    lastname: "Parker",
    description: "I am THE spider for vue.js!",
    email: "pp@spider.com",
    rate: "55",
    interests: ['frontend', 'backend', 'career'],
  },
  {
    id: 2,
    firstname: "Alice",
    lastname: "Aizen",
    description: "I am aizens HARDcore chick!",
    email: "aa@hard.com",
    rate: "99",
    interests: ['career'],
  },
];

const defaultRequests = [
  {
    id: 1,
    coachId: 1,
    message: "Hi! I am sooo exited to be caught in your web! <3",
    email: "susanne@wondergirl.com",
  },
  {
    id: 2,
    coachId: 1,
    message:
      "Stop your heroic bullshit immediately or I call the green goblin!",
    email: "bob@rage.com",
  },
  {
    id: 3,
    coachId: 2,
    message: "You make me sooo wooozy! Marry me, now, pleazzze!",
    email: "fenn@fanboy.com",
  },
  {
    id: 4,
    coachId: 2,
    message: "You are the BOMB girl! Feminism FTW!!!!",
    email: "kati@actifism.com",
  },
];

let coaches = [];
const coachIdMap = new Map();
defaultCoaches.forEach((item) => {
  let itemClone = { ...item };
  delete itemClone['id'];
  const id = hash(itemClone);
  coachIdMap.set(item.id, id);
  coaches.push({ ...itemClone, id: id });
});

export const useCoachesStore = defineStore("coaches", {
  state: () => {
    return {
      coaches: coaches,
      interests: [
        {
          id: "frontend",
          title: "Frontend",
        },
        {
          id: "backend",
          title: "Backend",
        },
        {
          id: "career",
          title: "Career",
        },
      ],
    };
  },
  getters: {
    getInterestsWCheck(state) {
      return state.interests.map((item) => {
        return { ...item, checked: false };
      });
    },
  },
  actions: {
    registerCoach(coach) {
      this.coaches.push({ ...coach, id: hash(coach) });
    },
    getCoachById(id) {
      return this.coaches.find((coach) => coach.id === id);
    }
  },
});

let requests = [];
defaultRequests.forEach((req) => {
  let reqClone = { ...req };
  delete reqClone['id'];
  reqClone.coachId = coachIdMap.get(req.coachId);
  const id = hash(reqClone);
  requests.push({ ...reqClone, id: id });
});

export const useRequestsStore = defineStore("requests", {
  state: () => {
    return {
      requests: requests,
    };
  },
  getters: {
  },
  actions: {
    addRequest(request) {
      this.requests.push({ ...request, id: hash(request)});
    },
  },
});
