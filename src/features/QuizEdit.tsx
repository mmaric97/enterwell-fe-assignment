import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import type { Quiz } from "../models/quiz"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchQuizById, updateQuiz } from "../store/quizzesSlice";

export default function QuizEdit() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const { quizId } = useParams<{ quizId: string }>()

    const { currentQuiz, isLoading, isSaving, isSavedSuccessfully, loadingError, saveError } = useAppSelector(
        (state) => state.quizzes
    );

    if (quizId == null || quizId.trim() == "") {
        navigate('/')
    }

    const [quizCopy, setQuizCopy] = useState<Quiz | null>(null)

    useEffect(() => {
        dispatch(fetchQuizById(Number(quizId)));
    }, [quizId]);

    useEffect(() => {
        if (currentQuiz) setQuizCopy(currentQuiz);
    }, [currentQuiz]);

    if (isLoading && !isSaving) return <p>Loading quiz...</p>;
    if (loadingError) return <p>Error: {loadingError}</p>;
    if (!quizCopy) return <p>No quiz found</p>;

    const updateQuestion = (
        index: number,
        field: 'question' | 'answer',
        value: string
    ) => {
        const updatedQuestions = [...quizCopy!.questions]
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            [field]: value,
        }

        setQuizCopy({ ...quizCopy, questions: updatedQuestions })
    }

    const updateName = (
        value: string
    ) => {
        setQuizCopy({ ...quizCopy, name: value });
    }

    const handleSubmit = () => {
        if (quizCopy) {
            dispatch(updateQuiz(quizCopy));
        }
    };

    return (
        <div className="space-y-6 py-6">
            <h1 className="text-2xl font-bold">
                Edit Quiz {quizId}
            </h1>

            <input
                className="w-full border p-2 rounded"
                value={quizCopy!.name}
                onChange={(e) =>
                    updateName(e.target.value)
                }
            />

            {
                quizCopy.questions.map((q, index) => (
                    <div key={q.id} className="border rounded p-4 space-y-3">
                        <textarea
                            className="w-full border p-2 rounded"
                            value={q.question}
                            onChange={(e) =>
                                updateQuestion(index, 'question', e.target.value)
                            }
                        />

                        <input
                            className="w-full border p-2 rounded"
                            value={q.answer}
                            onChange={(e) =>
                                updateQuestion(index, 'answer', e.target.value)
                            }
                        />
                    </div>
                ))
            }

            <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {isSaving ? 'Saving...' : 'Save'} 
            </button>

            {isSavedSuccessfully && <h3 className="text-green-600"> Successfully saved. </h3>}
            {!isSavedSuccessfully && <h3 className="text-red-600"> {saveError} </h3>}
        </div>
    )
}


