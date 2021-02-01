import React from 'react'
import { ThemeProvider } from 'styled-components'
import QuizScreen from '../../src/screens/Quiz'
export default function QuizdeGeral({ dbExterno }) {
  return (
    <div>
      <ThemeProvider theme={dbExterno.theme}>
        <QuizScreen
          externalQuestions={dbExterno.questions}
          externalBg={dbExterno.bg}
        />
      </ThemeProvider>
    </div>
  )
}

export async function getServerSideProps(context) {

  const [projectName, githubUser] = context.query.id.spli('__')
  try {

    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/`).then((respostaDoSever) => {
      if (respostaDoSever.ok) {
        return respostaDoSever.json()
      }
      throw new Error("Falha na busca")
    }).then((respostaConvertida) => {
      return respostaConvertida
    })
      .catch((err) => {
        console.log(err)
      })
    return {
      props: {
        dbExterno,
        projectName,
        githubUser
      }
    }
  } catch (error) {
    throw new Error(error)
  }

}