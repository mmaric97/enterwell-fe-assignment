import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addQuiz } from "../store/quizzesSlice";
import type { Question } from "../models/question";
import type { Quiz } from "../models/quiz";

export default function QuizAdd() {
    const dispatch = useAppDispatch();

    const [quizName, setQuizName] = useState('');
    const [questions, setQuestions] = useState<Question[]>([
        { id: 1, question: '', answer: '' },
    ]);

    const { isSaving, isSavedSuccessfully, saveError } = useAppSelector(
        (state) => state.quizzes
    );

    useEffect(() => {
        if (isSavedSuccessfully) {
            setQuizName('');
            setQuestions([{ id: 1, question: '', answer: '' }]);
        }
    }, [isSavedSuccessfully]);

    const handleNameChange = (value: string) => {
        setQuizName(value);
    };

    const handleQuestionChange = (id: number, field: 'question' | 'answer', value: string) => {
        setQuestions((prev) =>
            prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
        );
    };

    const addNewQuestion = () => {
        const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
        setQuestions((prev) => [...prev, { id: newId, question: '', answer: '' }]);
    };

    const removeQuestion = (index: number) => {
        setQuestions((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!quizName.trim()) return alert('Quiz name is required');

        const newQuiz: Quiz = {
            name: quizName,
            questions,
        };

        dispatch(addQuiz(newQuiz));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">
                Add Quiz
            </h1>

            <form className="space-y-6 py-6" onSubmit={handleSubmit}>
                <div>
                    <input
                        className="w-full border p-2 rounded"
                        value={quizName}
                        placeholder="Quiz name"
                        onChange={(e) => handleNameChange(e.target.value)}
                        required
                    />
                </div>

                <h3>Questions</h3>
                {
                    questions.map((q, index) => (

                        <div key={q.id} className="border rounded p-4 space-y-3">
                            <textarea
                                className="w-full border p-2 rounded"
                                placeholder="Question"
                                value={q.question}
                                onChange={(e) => handleQuestionChange(q.id, 'question', e.target.value)}
                                required
                            />

                            <input
                                className="w-full border p-2 rounded"
                                value={q.answer}
                                placeholder="Answer"
                                onChange={(e) => handleQuestionChange(q.id, 'answer', e.target.value)}
                                required
                            />

                            {
                                questions.length > 1 && (
                                    <button type="button"
                                        className="px-6 py-2 border-2 border-blue-600 rounded text-white text-sm"
                                        onClick={() => removeQuestion(index)}>
                                        Remove Question
                                    </button>
                                )
                            }
                        </div>
                    ))
                }

                <button type="button"
                    className="px-6 py-2 border-2 border-blue-600 rounded text-white text-sm"
                    onClick={addNewQuestion}>
                    Add Question
                </button>

                <div style={{ marginTop: '1rem' }}>
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded" disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Quiz'}
                    </button>
                </div>
            </form>

            {isSavedSuccessfully && <h3 className="text-green-600"> Successfully saved. </h3>}
            {!isSavedSuccessfully && <h3 className="text-red-600"> {saveError} </h3>}
        </div>
    )
}


