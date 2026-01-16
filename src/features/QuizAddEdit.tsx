import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addQuestion, addQuiz, fetchQuestions, fetchQuizById, removeQuestion, resetEditState, startCreateQuiz, swapQuestion, updateQuiz, updateQuizName, updateQuizQuestion } from "../store/quizzesSlice";
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

    useEffect(() => {
        if (isEditMode && id) {
            dispatch(fetchQuizById(Number(id)));
        } else {
            dispatch(startCreateQuiz());
        }
    }, [isEditMode, id, dispatch]);

    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);

    useEffect(() => {
        if (isSavedSuccessfully) {
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    }, [isSavedSuccessfully, navigate]);

    useEffect(() => {
        return () => {
            dispatch(resetEditState())
        };
    }, [dispatch])

    if (!currentQuiz) return <p>Loading quiz...</p>;
    if (isLoading && !isSaving) return <p>Loading quiz...</p>;
    if (loadingError) return <p>Error: {loadingError}</p>;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditMode) {
            dispatch(updateQuiz(currentQuiz));
        } else {
            dispatch(addQuiz(currentQuiz!));
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
                        value={currentQuiz!.name}
                        placeholder="Quiz name"
                        onChange={(e) => { dispatch(updateQuizName(e.target.value)) }}
                        required
                    />
                </div>

                <h3>Questions</h3>
                {
                    currentQuiz!.questions.map((q, index) => (

                        <div key={index} className="border rounded p-4 space-y-3">
                            <p>Enter question and answer...</p>
                            <textarea
                                className="w-full border p-2 rounded"
                                placeholder="Question"
                                value={q.question}
                                onChange={(e) => dispatch(updateQuizQuestion({ index, field: 'question', value: e.target.value }))}
                                disabled={q.id != null}
                                required
                            />

                            <input
                                className="w-full border p-2 rounded"
                                value={q.answer}
                                placeholder="Answer"
                                onChange={(e) => dispatch(updateQuizQuestion({ index, field: 'answer', value: e.target.value }))}
                                disabled={q.id != null}
                                required
                            />

                            {
                                currentQuiz!.questions.length > 1 && (
                                    <button type="button"
                                        className="px-6 py-2 border-2 border-blue-600 rounded text-white text-sm"
                                        onClick={() => { dispatch(removeQuestion({ index })); }}>
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
                                    onChange={(e) => { dispatch(swapQuestion({ index, newQuestionId: Number(e.target.value) })) }}
                                >
                                    <option value="">-- Choose a question --</option>

                                    {allQuestions.map((question) => (
                                        <option key={"o-" + question.id} value={question.id}>
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
                    onClick={() => { dispatch(addQuestion()); }}>
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


