import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GithubCorner';
import { useRouter } from 'next/router';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';
import {motion} from 'framer-motion'
// const BackgroundImages = styled.div`
// background-image: url(${db.bg});
// flex:1;
// background-size:cover;
// background-position:center;
// `;
export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

// function Title({children}) {
//   return (
//     <h1>
//       {children}
//     </h1>
//   )
// }

export default function Home() {
  const router = useRouter()
  const [name, setName] = React.useState('')

  function SubQuiz(event) {
    event.preventDefault()
    router.push(`/quiz?name=${name}`)
  }

  function InputName(event) {
    console.log(name)
    setName(event.target.value)
  }
  return (
 
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Alura Quiz</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget transition={{ delay: 0, duration: 0.5 }} as={motion.section} variants={{
          show: { opacity: 1,y:'0' },
          hidden:{opacity:0,y:'100%'}
        }}
          initial='hidden'
          animate='show'
        >
          <Widget.Header>
            <h1>The Legend of Zelda</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={SubQuiz} >
              <Input  placeholder="Digite seu nome" onChange={InputName} value='' name='name' />
              <Button type="submit" disabled={name.length === 0}>
                Jogar  {name}
              </Button>
            </form> 
          </Widget.Content>
        </Widget>
        <Widget transition={{delay:0.5,duration:0.5}} as={motion.section} variants={{
          show: { opacity: 1 },
          hidden: { opacity: 0 }
        }}
          initial='hidden'
          animate='show'
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <ul>
              {db.external.map((externo) => {
                const [projectName, githubUser] =  externo
                .replace(/\//g,'')
                .replace("https:"," ")
                .replace(".vercel.app"," ")
                .split(" ")
                  return(
                    <li key={externo}>
                      <Widget.Topic href={`${githubUser}__${projectName}`} as={Link}>
                        {`/quiz/${githubUser}__${projectName}`}
                  </Widget.Topic>
                    </li>
                  )
          
            })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://hithub.com/Math2121" />
    </QuizBackground >
  );
}
