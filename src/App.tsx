import { useEffect, useState } from 'react'
import { apiReminder, apiConsult } from './api/api'
import { Reminder, ReminderWithObservation } from './utils/types'
import { Row } from './components/Row'

export default function App() {
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [reminders, setReminders] = useState<
    ReminderWithObservation[] | undefined
  >([])
  const [reminder, setReminder] = useState<ReminderWithObservation>()

  const fetchReminders = async () => {
    try {
      const response = await apiConsult.get('/reminders')
      setReminders(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchReminders()
  }, [])

  const handleReminderAdd = async () => {
    setIsLoading(true)
    try {
      const response = await apiReminder.post<{
        reminder: Reminder
        message: string
      }>('/reminders', {
        text: input
      })
      alert(response.data.message)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-8 py-24">
      <div className="flex h-1/5 flex-col gap-8">
        <h1 className="text-center text-5xl font-bold text-zinc-500">SIBAS!</h1>
        <div>
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="rounded-l-lg bg-gray-100 px-3 py-1 outline-none"
          />
          <button
            onClick={handleReminderAdd}
            disabled={isLoading}
            className="rounded-r-lg bg-blue-200 px-3 py-1 transition-all duration-500 hover:bg-blue-500"
          >
            Add
          </button>
        </div>
      </div>
      <section className="flex h-4/5 w-full gap-8 px-24">
        <div className="flex h-full w-1/2 flex-col gap-2">
          <h2 className="w-full text-center text-xl font-bold">Reminders</h2>
          <div className="flex h-full w-full flex-col gap-2 rounded-lg bg-gray-200 p-4">
            {reminders?.map((reminder) => (
              <Row
                key={reminder.id}
                reminder={reminder}
                setState={setReminder}
              />
            ))}
          </div>
        </div>
        <div className="flex h-full w-1/2 flex-col gap-2">
          <h2 className="w-full text-center text-xl font-bold">Observations</h2>
          <div className="flex h-full w-full flex-col gap-2 rounded-lg bg-gray-200 p-4">
            {reminder?.observations.map((observation) => (
              <Row key={observation.id} text={observation.text} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
