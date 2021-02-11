import {Switch, Route} from 'react-router-dom'
import Layout from './components/common/Layout'

import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path={['/', '/home']} component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
      </Switch>
    </Layout>
  )
}

export default App
