import axios from 'axios'

const {
  VITE_OBSERVATION_API_URL,
  VITE_REMINDER_API_URL,
  VITE_CONSULT_API_URL
} = import.meta.env

export const apiReminder = axios.create({
  baseURL: VITE_REMINDER_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const apiObservation = axios.create({
  baseURL: VITE_OBSERVATION_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const apiConsult = axios.create({
  baseURL: VITE_CONSULT_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
