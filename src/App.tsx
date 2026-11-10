import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { ProgressProvider } from './context/ProgressContext'
import { Home } from './pages/Home'
import { LanguagePage } from './pages/LanguagePage'
import { LessonPage } from './pages/LessonPage'
import { NotFound } from './pages/NotFound'
import { ProgressPage } from './pages/ProgressPage'

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/languages/:languageId" element={<LanguagePage />} />
            <Route
              path="/languages/:languageId/lessons/:lessonId"
              element={<LessonPage />}
            />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  )
}
