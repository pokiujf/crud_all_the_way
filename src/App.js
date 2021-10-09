import 'antd/dist/antd.css'
import { Router } from '@reach/router'
import { Layout } from 'antd'
import { AppHeader, AppContent, APIIndicator } from './layout'
import { useLogin } from './hooks/useLogin'
import {
  Users,
  AnotherUsers,
  User,
  FeaturedUsers,
  Posts,
  Post,
  FeaturedPosts,
  LoginWrapper,
  PostCreate,
} from './routes'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
    },
  },
})

function App() {
  const { userId, login, logout } = useLogin()

  if (!userId) {
    return <LoginWrapper login={login} />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router>
          <AppHeader path="/*" logout={logout} />
        </Router>
        <AppContent>
          <Router>
            <Users path="/users" />
            <AnotherUsers path="/another/users" />
            <FeaturedUsers path="/users/featured" />
            <User path="/users/:userId" />
            <Posts path="/posts" />
            <FeaturedPosts path="/posts/featured" />
            <PostCreate path="/posts/create" />
            <Post path="/posts/:postId" />
            <Users path="/" />
          </Router>
        </AppContent>
        <APIIndicator />
      </Layout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
