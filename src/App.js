import {Switch, Route} from 'react-router-dom'
import Layout from './components/common/Layout'

import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import ColorSelector from './components/ColorSelector'
import Profile from './components/Profile'
import Palette from './components/Palette'
import PaletteDetail from './components/PaletteDetail'
import PaletteEdit from './components/PaletteEdit'

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path={['/', '/home']} component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/color' component={ColorSelector} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/palettes' component={Palette} />
        <Route exact path='/palettes/:id' component={PaletteDetail} />
        <Route exact path='/palettes/edit/:id' component={PaletteEdit} />
      </Switch>
    </Layout>
  )
}

export default App
