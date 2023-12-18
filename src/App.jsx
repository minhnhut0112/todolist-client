import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import { Fragment } from 'react'
import DefaultLayout from './components/Layout/DefaultLayout/DefaultLayout'

function App() {
  return (
    <>
      <Router>
        <Routes>
          {routes.map((route, index) => {
            const Page = route.component

            let Layout = DefaultLayout

            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
        </Routes>
      </Router>
    </>
  )
}

export default App
