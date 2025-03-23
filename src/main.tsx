import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { EventProducerProvider } from './Contexts/EventProducer.api.tsx'
import { EventProvider } from './Contexts/Event.api.tsx'
import { EventDetailsForProducer } from './Components/EventDetailsForProducer.tsx'
import { ProducerMenu } from './Components/ProducerMenu.tsx'
import { SignIn } from './Components/SignIn.tsx'
import { VerifiedProducer } from './Components/VerifiedProducer.tsx'
import { EventListForUsers } from './Components/EventListForUsers.tsx'
import { ProducerDetailsForUser } from './Components/ProducerDetailsForUser.tsx'
import { EventDetailsForUser } from './Components/EventDetailsForUser.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <EventProducerProvider>
        <EventProvider>
          {/* <App /> */}
          <Routes>
            <Route path='/' element={<App></App>}></Route>
            <Route path="/eventDetailsForProducer/:eventId" element={<EventDetailsForProducer></EventDetailsForProducer>}></Route>
            <Route path="/eventDetailsForUser/:eventId" element={<EventDetailsForUser></EventDetailsForUser>}></Route>
            <Route path='/producerMenue' element={<ProducerMenu></ProducerMenu>}></Route>
            <Route path='/signIn' element={<SignIn></SignIn>}></Route>
            <Route path='/verifiedProducer' element={<VerifiedProducer></VerifiedProducer>} />
            <Route path='/eventListForUsers' element={<EventListForUsers></EventListForUsers>}></Route>
            <Route path="/producerDetailsForUser/:producerEmail" element={<ProducerDetailsForUser></ProducerDetailsForUser>}></Route>
          </Routes>
        </EventProvider>
      </EventProducerProvider>
    </BrowserRouter>
  </StrictMode>,
)
