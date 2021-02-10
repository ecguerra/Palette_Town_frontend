import {Switch, Route} from 'react-router-dom'
import Layout from './components/common/Layout'

import Home from './components/Home'

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path={['/', '/home']} component={Home} />
      </Switch>
    </Layout>
  )
}

export default App
