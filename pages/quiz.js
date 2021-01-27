import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';
function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({ question, total, questionIndes,onSubmit }) {
  const alternativeId = `alternative__${questionIndes}`
  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndes + 1} de ${total}`}

        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>
        <form onSubmit={onSubmit}>
          {question.alternatives.map((alternative, index) => {
            return (
              <Widget.Topic
                as="label"
                htmlFor={index}
              >
                {alternative}
                <input style={{ display: 'none' }} type="radio" id={index} name={alternativeId} />
              </Widget.Topic>
            )
          })}
          {/* <pre style={{ color: 'white' }}>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit">
            Confirmar
            </Button>
        </form>
      </Widget.Content>
    </Widget>
  )
}
const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function Quiz() {
  const [screenState,setScreenState] = React.useState(screenStates.LOADING)
  const total = db.questions.length
  const [questionIndes,setQestionIndes] = React.useState(0)
  const question = db.questions[questionIndes]
  function SubQuiz(event) {
    event.preventDefault
    const next = questionIndes + 1
    if (next < total) {
      setQestionIndes(next)
    } else {
      setScreenState(screenStates.RESULT)
    }
    
  }
  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 1000)
 },[screenState])

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

       
        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.QUIZ && <QuestionWidget question={question} total={total} questionIndes={questionIndes} onSubmit={SubQuiz} />}
    
        {screenState === screenStates.RESULT && <div>Você acertou X questões!!</div>}
      </QuizContainer>
    </QuizBackground>
  );
}
