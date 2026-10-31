import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/Layout';
import { Home } from './pages/Home';

const Schedule = lazy(() => import('./pages/Schedule'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const Wardrobe = lazy(() => import('./pages/Wardrobe'));
const Travel = lazy(() => import('./pages/Travel'));
const Guide = lazy(() => import('./pages/Guide'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Rsvp = lazy(() => import('./pages/Rsvp'));
const More = lazy(() => import('./pages/More'));
const ThingsToDo = lazy(() => import('./pages/ThingsToDo'));
const Faq = lazy(() => import('./pages/Faq'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Gifts = lazy(() => import('./pages/Gifts'));
const Story = lazy(() => import('./pages/Story'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Loading() {
  return <div className="min-h-screen bg-paper" aria-busy="true" />;
}

export function App() {
  // The invite route is lazy. Fetch it while the cover is still up so opening
  // it does not wait on a second download.
  useEffect(() => {
    void import('./pages/Schedule');
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Home />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="schedule/:slug" element={<EventDetail />} />
            <Route path="wardrobe" element={<Wardrobe />} />
            <Route path="travel" element={<Travel />} />
            <Route path="guide" element={<Guide />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="rsvp" element={<Rsvp />} />
            <Route path="more" element={<More />} />
            <Route path="things-to-do" element={<ThingsToDo />} />
            <Route path="faq" element={<Faq />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="gifts" element={<Gifts />} />
            <Route path="story" element={<Story />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
