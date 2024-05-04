import { apiObservation, apiReminder } from '../api/api'
import { ReminderWithObservation } from '../utils/types'

type Row = {
  reminder?: ReminderWithObservation
  text?: string
  setState?: React.Dispatch<
    React.SetStateAction<ReminderWithObservation | undefined>
  >
}

export function Row({ reminder, text, setState }: Row) {
  const handleDelete = async () => {
    if (reminder) {
      if (confirm('Are you sure?')) {
        try {
          const response = await apiReminder.delete(`/reminders/${reminder.id}`)

          if (response.status === 200) {
            alert('Reminder deleted!')
            window.location.reload()
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  const handleCreateObservation = async () => {
    if (reminder) {
      const observation = prompt('Observation:')

      if (observation && setState) {
        try {
          const response = await apiObservation.post(
            `/reminders/${reminder.id}/observations`,
            {
              text: observation
            }
          )

          if (response.status === 201) {
            alert('Observation created!')
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  const handleReminder = () => {
    if (setState) {
      setState(reminder)
    }
  }

  return (
    <div
      onClick={reminder && handleReminder}
      onDoubleClick={reminder && handleCreateObservation}
      className="flex cursor-pointer justify-between rounded-lg bg-gray-100 p-4"
    >
      <p>{reminder ? reminder.text : text}</p>
      <button
        onClick={handleDelete}
        className="z-10 cursor-pointer text-gray-400"
      >
        X
      </button>
    </div>
  )
}
