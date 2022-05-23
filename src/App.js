import { useD2 } from '@dhis2/app-runtime-adapter-d2'
import React from 'react'
import AppContainer from './components/app/AppContainer.js'
import store from './store/index.js'
import './locales/index.js'

const App = () => {
    const { d2 } = useD2()

    if (!d2) {
        return null
    }

    return <AppContainer store={store} />
}

export default App
