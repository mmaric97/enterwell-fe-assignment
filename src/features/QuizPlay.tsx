import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    selectCurrentQuestion,
    selectCurrentQuestionIndex,
    selectTotalQuestions,
    selectCorrectAnswers,
    submitAnswer,
    startQuiz,
    finishQuiz,
} from "../store/quizSolveSlice";
import { nextQuestion } from "../store/quizSolveSlice";
import { fetchQuizById } from "../store/quizzesSlice";

const QuizPlay = () => {
    const navigate = useNavigate()

    const { quizId } = useParams<{ quizId: string }>();
    const id = Number(quizId);
    const dispatch = useAppDispatch();

    const { currentQuiz } = useAppSelector(
        (state) => state.quizzes
    );

    const question = useAppSelector(selectCurrentQuestion(id));
    const currentIndex = useAppSelector(selectCurrentQuestionIndex(id));
    const totalQuestions = useAppSelector(selectTotalQuestions(id));
    const correctAnswers = useAppSelector(selectCorrectAnswers(id));

    const [answer, setAnswer] = useState<string>('');

    useEffect(() => {
        dispatch(fetchQuizById(Number(quizId)));
    }, [quizId]);

    useEffect(() => {
        if (!question && currentQuiz) {
            dispatch(startQuiz(currentQuiz));
        }
    }, [currentQuiz]);

    if (!question && totalQuestions == 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {currentIndex < totalQuestions &&
                <div>
                    <div className="flex flex-row justify-between">
                        <p className="text-sm text-gray-500">
                            Question {currentIndex + 1} of {totalQuestions}
                        </p>
                        <p className="text-sm text-green-700">
                            Correct answers: {correctAnswers}
                        </p>
                    </div>

                    <h2 className="text-lg font-semibold mt-2">
                        {question?.question}
                    </h2>


                    <div className="mt-4 space-y-2">

                        <input
                            className="w-full border p-2 rounded"
                            placeholder="Answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />

                        <div>
                            <button
                                className="px-6 py-2 mt-2 bg-blue-600 text-white rounded"
                                onClick={() => {
                                    dispatch(
                                        submitAnswer({
                                            quizId: id,
                                            answer: answer
                                        })
                                    );
                                    dispatch(nextQuestion({ quizId: id }));
                                    setAnswer("");
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            }

            {currentIndex == totalQuestions &&
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold mt-2">
                        Quiz is done.
                    </h2>

                    <h3 className="text-m font-semibold mt-2">
                        Correct answers: <span className="text-green-600"> {correctAnswers} </span> out of {totalQuestions} questions.
                    </h3>

                    <button
                        className="px-6 py-2 mt-2 bg-blue-600 text-white rounded"
                        onClick={() => {
                            dispatch(finishQuiz({ quizId: id }));
                            setAnswer("");
                            navigate('/')
                        }}
                    >
                        Finish
                    </button>
                </div>
            }
        </div>
    );
};

export default QuizPlay;
