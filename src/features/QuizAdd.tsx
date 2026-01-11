import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addQuiz, fetchQuestions } from "../store/quizzesSlice";
import type { Question } from "../models/question";
import type { Quiz } from "../models/quiz";

export default function QuizAdd() {
    const dispatch = useAppDispatch();

    const [quizName, setQuizName] = useState('');
    const [questions, setQuestions] = useState<Question[]>([
        { question: '', answer: '' },
    ]);

    const { isSaving, isSavedSuccessfully, saveError, allQuestions } = useAppSelector(
        (state) => state.quizzes
    );

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch]);

    useEffect(() => {
        if (isSavedSuccessfully) {
            setQuizName('');
            setQuestions([{ question: '', answer: '' }]);
        }
    }, [isSavedSuccessfully]);

    const handleNameChange = (value: string) => {
        setQuizName(value);
    };

    const handleQuestionChange = (index: number, field: 'question' | 'answer' | 'id', value: string | number) => {
        setQuestions((prev) =>
            prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
        );
    };

    const addNewQuestion = () => {
        setQuestions((prev) => [...prev, { question: '', answer: '' }]);
    };

    const removeQuestion = (index: number) => {
        setQuestions((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDropdownChange = (id: string, index: number ) => {

        if (!id) {
            return;
        }
        let questionToAdd = allQuestions.find(q => q.id == Number(id))!;

        handleQuestionChange(index, "id", questionToAdd.id!);
        handleQuestionChange(index, "question", questionToAdd.question);
        handleQuestionChange(index, "answer", questionToAdd.answer);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newQuiz: Quiz = {
            name: quizName,
            questions,
        };

        dispatch(addQuiz(newQuiz));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">
                Create Quiz
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

                        <div key={q.id ?? 0} className="border rounded p-4 space-y-3">
                            <p>Enter question and answer...</p>
                            <textarea
                                className="w-full border p-2 rounded"
                                placeholder="Question"
                                value={q.question}
                                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                disabled={q.id != null}
                                required
                            />

                            <input
                                className="w-full border p-2 rounded"
                                value={q.answer}
                                placeholder="Answer"
                                onChange={(e) => handleQuestionChange(index, 'answer', e.target.value, )}
                                disabled={q.id != null}
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

                            <div className="flex flex-col gap-2 pt-1">
                                <label htmlFor="questions">Or select existing question</label>

                                <select
                                    id="questions"
                                    className="h-10 rounded border-2 border-gray-400 rounde text-sm text-gray-500
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500
                                        focus:border-indigo-500
                                        disabled:bg-gray-100
                                        disabled:cursor-not-allowed
                                        "
                                    onChange={(e) => handleDropdownChange(e.target.value, index)}
                                >
                                    <option value="">-- Choose a question --</option>

                                    {allQuestions.map((question) => (
                                        <option key={question.id} value={question.id}>
                                            {question.question}
                                        </option>
                                    ))}
                                </select>
                            </div>
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


