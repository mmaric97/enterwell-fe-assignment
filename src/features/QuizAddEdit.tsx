import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addQuiz, fetchQuestions, fetchQuizById, resetEditState, updateQuiz } from "../store/quizzesSlice";
import type { Question } from "../models/question";
import type { Quiz } from "../models/quiz";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function QuizAddEdit() {
    const navigate = useNavigate()
    const location = useLocation();
    const isEditMode = location.pathname.includes('edit');
    const dispatch = useAppDispatch();

    const { currentQuiz, isLoading, loadingError, isSaving, isSavedSuccessfully, saveError, allQuestions } = useAppSelector(
        (state) => state.quizzes
    );

    const { quizId: id } = useParams<{ quizId: string }>();

    const [quizCopy, setQuizCopy] = useState<Quiz>(currentQuiz ?? {
        name: '',
        questions: [{ question: '', answer: '' }]
    } as Quiz)

    useEffect(() => { // Reset on url change
        if(!isEditMode) {
            setQuizCopy({ name: '', questions: [{ question: '', answer: '' }] });
        }
    }, [isEditMode]);

    useEffect(() => {
        if (isEditMode && id) {
            dispatch(fetchQuizById(Number(id)));
        }
    }, [isEditMode, id, dispatch]);

    useEffect(() => {
        if (isEditMode) {
            setQuizCopy(currentQuiz!);
        }
    }, [currentQuiz, isEditMode]);

    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);

    useEffect(() => {
        if (isSavedSuccessfully) {
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    }, [isSavedSuccessfully]);

    useEffect(() => {
        return () => {
            dispatch(resetEditState())
        };
    }, [dispatch])

    if (isEditMode && !currentQuiz) return <p>Loading quiz...</p>;
    if (!quizCopy || !quizCopy.questions) return <p>Loading quiz...</p>;
    if (isLoading && !isSaving) return <p>Loading quiz...</p>;
    if (loadingError) return <p>Error: {loadingError}</p>;

    const handleNameChange = (value: string) => {
        setQuizCopy({ ...quizCopy, name: value });
    };

    const handleQuestionChange = (index: number, questionToAdd: Question) => {
        const updatedQuestions = [...quizCopy.questions];
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            id: questionToAdd.id,
            question: questionToAdd.question,
            answer: questionToAdd.answer,
        };
        setQuizCopy({ ...quizCopy, questions: updatedQuestions });
    };

    const handleQuestionInputChange = (index: number,
        field: 'question' | 'answer', value: string) => {
        const questions = quizCopy.questions ?? [];

        const updatedQuestions = [...questions];

        updatedQuestions[index] = {
            ...updatedQuestions[index],
            [field]: value,
        };

        setQuizCopy({
            ...quizCopy,
            questions: updatedQuestions,
        });
    };

    const addNewQuestion = () => {
        const updatedQuestions =
            [...quizCopy!.questions,
            {
                question: '',
                answer: ''
            } as Question
            ]
        setQuizCopy({ ...quizCopy, questions: updatedQuestions })
    };

    const removeQuestion = (index: number) => {
        const updatedQuestions = [
            ...quizCopy!.questions.filter((_, i) => i !== index)
        ]

        setQuizCopy({ ...quizCopy, questions: updatedQuestions })
    };

    const handleDropdownChange = (id: string, index: number) => {

        if (!id) {
            return;
        }
        const questionToAdd = allQuestions.find(q => q.id == Number(id))!;

        handleQuestionChange(index, questionToAdd);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditMode) {
            dispatch(updateQuiz(quizCopy));
        } else {
            dispatch(addQuiz(quizCopy));
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mt-4">
                {isEditMode ? 'Edit Quiz' : 'Create Quiz'}
            </h1>

            <form className="space-y-6 py-6" onSubmit={handleSubmit}>
                <div>
                    <input
                        className="w-full border p-2 rounded"
                        value={quizCopy.name}
                        placeholder="Quiz name"
                        onChange={(e) => handleNameChange(e.target.value)}
                        required
                    />
                </div>

                <h3>Questions</h3>
                {
                    quizCopy.questions.map((q, index) => (

                        <div key={q.id ?? index} className="border rounded p-4 space-y-3">
                            <p>Enter question and answer...</p>
                            <textarea
                                className="w-full border p-2 rounded"
                                placeholder="Question"
                                value={q.question}
                                onChange={(e) => handleQuestionInputChange(index, 'question', e.target.value)}
                                disabled={q.id != null}
                                required
                            />

                            <input
                                className="w-full border p-2 rounded"
                                value={q.answer}
                                placeholder="Answer"
                                onChange={(e) => handleQuestionInputChange(index, 'answer', e.target.value)}
                                disabled={q.id != null}
                                required
                            />

                            {
                                quizCopy.questions.length > 1 && (
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
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded"
                        disabled={isSaving}
                    >
                        {isSaving
                            ? 'Saving...'
                            : isEditMode
                                ? 'Update Quiz'
                                : 'Save Quiz'}
                    </button>
                </div>
            </form>

            {isSavedSuccessfully && <h3 className="text-green-600"> Successfully saved. </h3>}
            {!isSavedSuccessfully && <h3 className="text-red-600"> {saveError} </h3>}
        </div>
    )
}


