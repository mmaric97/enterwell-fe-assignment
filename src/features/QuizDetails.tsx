import { useParams } from "react-router-dom"

export default function QuizCard() {

    const { quizId } = useParams<{ quizId: string }>()

    return (
        <div>test {quizId}</div>
    )
}
