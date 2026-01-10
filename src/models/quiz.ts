import type { Question } from "./question"

export interface Quiz {
  id?: number
  name: string
  questions: Question[]
}