export type Reminder = {
  id: string
  text: string
}

export type Observation = {
  id: string
  text: string
  reminderId: string
}

export type ReminderWithObservation = {
  id: string
  text: string
  observations: Observation[]
}
