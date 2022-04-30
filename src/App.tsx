import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSpinner } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import { setUserState } from './redux/actions'
import { useDispatch } from 'react-redux'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { chatboxOutline, cogOutline, ellipse, personOutline, square, triangle } from 'ionicons/icons';
import MessageTab from './pages/MessageTab';
import MainTab from './pages/MainTab';
import QuestionTab from './pages/QuestionTab';
import Menu from './components/menu';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';



/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useEffect } from 'react';
import { getCurrentUser } from './firebaseConfig'
import RoomTab from './pages/RoomTab';

const RoutingSystem: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
      <Route exact path="/home">
          <Home />
          <Menu/>
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/MainTab" component={MainTab} />
        <Route exact path="/QuestionTab" component={QuestionTab} />
        <Route exact path="/RoomTab" component={RoomTab} />
        <Route exact path="/messages" component={MessageTab} />

        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

const App: React.FC = () => {
  const [busy, setBusy] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    (getCurrentUser().then((user: any) => {
      if (user) {
        dispatch(setUserState(user.email))
        window.history.replaceState({}, '', '/MainTab')
      } else {
        window.history.replaceState({}, '', '/')
      }
      setBusy(false)
    })
  )}, [dispatch])

  return <IonApp>{busy ? <IonSpinner /> : <RoutingSystem />}</IonApp>
}

export default App;
