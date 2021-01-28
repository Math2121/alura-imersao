import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';
import AlternativesForm from '../src/components/AlternativesForm';
function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado
      </Widget.Header>

      <Widget.Content>
        <p>Você acertou {results.reduce((somaAtual, resultAtual) => {
          const isAcerto = resultAtual === true;
          if (isAcerto) {
            return somaAtual + 1
          }
          return somaAtual
        }, 0)} perguntas</p>
        <ul>
          {results.map((result) => (
            <li key={`reslt__${result}`}>
              01 Resultado:
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}

        </ul>
      </Widget.Content>
    </Widget>
  );
}
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

function QuestionWidget({ question, total, questionIndes, onSubmit, addResult }) {
  const [selectedAlternative, setSelectAlternative] = React.useState(undefined)
  const alternativeId = `alternative__${questionIndes}`
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false)
  const isCorrect = selectedAlternative === question.answer
  const hasAlternativeSelected = selectedAlternative !== undefined;
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
        <AlternativesForm onSubmit={(event) => {
          event.preventDefault()
          setIsQuestionSubmited(true)
          setTimeout(() => {
            addResult(isCorrect)
            onSubmit()
            setIsQuestionSubmited(false)
            setSelectAlternative(undefined)
          }, 3 * 1000)
        }}>
          {question.alternatives.map((alternative, index) => {
            const alternativeid = `alternative__${index}`
            const alternativesStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === index
            return (
              <Widget.Topic
                as="label"
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativesStatus}
                key={alternativeid}
                htmlFor={index}
              >
                {alternative}
                <input type="radio" id={index} name={alternativeId} onChange={() => {
                  setSelectAlternative(index)
                }} />
              </Widget.Topic>
            )
          })}
          {/* <pre style={{ color: 'white' }}>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
            </Button>
          {/* <p>SelectedAlternative: {`${selectedAlternative}` }</p> */}
          {isQuestionSubmited && isCorrect && <p>Você acertou! </p>}
          {isQuestionSubmited && !isCorrect && <p> Você errou! </p>}
        </AlternativesForm>
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
  const [screenState, setScreenState] = React.useState(screenStates.LOADING)
  const total = db.questions.length
  const [results, setResult] = React.useState([]);
  const [questionIndes, setQestionIndes] = React.useState(0)
  const question = db.questions[questionIndes]
  function addResult(result) {
    setResult([
      ...results,
      result
    ])
  }
  function SubQuiz() {

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
  }, [screenState])

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            total={total}
            questionIndes={questionIndes}
            onSubmit={SubQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}



        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
