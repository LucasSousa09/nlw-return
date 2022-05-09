import { useEffect, useState } from "react";
import { LoginBox } from "./components/LoginBox"
import { Widget } from "./components/Widget"
import { FeedbacksList } from './components/FeedbacksList'
import { api } from "./lib/api";

type User = {
  id: string;
  name: string;
  login: string;
}

type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    login: string;
  }
}

type FeedbackResponse = {
    id: string,

    type: string,
    comment: string,
    screenshot?: string,
    likes?: string,
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [feedbackList, setFedbackList] = useState<FeedbackResponse[]>([])
  const [updateList, setUpdateList] = useState(false)
  const [isLoadingFeedbackList, setIsLoadingFeedbackList] = useState(false)
  const [githubCode, setGithubCode] = useState(false)

  async function signIn(githubCode: string) {
    console.log(`Console inside SingIn Function githubCode: ${githubCode}`)
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    })

    const { token, user } = response.data

    // localStorage.setItem('@dowhile:token', token)
    // api.defaults.headers.common.authorization = `Bearer ${token}`;

    console.log(`Console inside SingIn Function user: ${user}`)
    setUser(user)
  }

  //Realizando o login
  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=')
    setGithubCode(hasGithubCode)

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=')

      window.history.pushState({}, '', urlWithoutCode);

      signIn(githubCode)
    }
  }, [])

  //Pegando os dados do Banco de Dados
  useEffect(() => {
    if(user){
      console.log(`Console inside useEffect ${user}`)
      setIsLoadingFeedbackList(true)

      api.post<FeedbackResponse[]>('/feedbacks-list', {
        user_id: user.id
      }).then(
        response => {
          setFedbackList(response.data)
          setIsLoadingFeedbackList(false)
        }
      )
      
    }
  },[user, updateList])

  // useEffect(() => {
  //   const token = localStorage.getItem('@dowhile:token')

  //   if (token) {
  //     api.defaults.headers.common.authorization = `Bearer ${token}`;

  //     api.get<User>('profile').then(response => {
  //       setUser(response.data)
  //     })
  //   }
  // }, [])

  // function signOut() {
  //   setUser(null)
  //   localStorage.removeItem('@dowhile:token')
  // }

  return (
      <div className='relative flex justify-center items-center w-full max-w-screen mx-auto h-screen'>
        <FeedbacksList user={user &&  user.id } feedbackList={feedbackList} isLoadingFeedbackList={isLoadingFeedbackList}/>
        { !!user ? <Widget updateFeedbackList={setUpdateList} user_id={user.id} /> : <LoginBox code={githubCode}/> } 
      </div>
  )
}

export default App
