import 'core-js/stable'
import 'regenerator-runtime/runtime'
//we import ReactDOM only once!! for rendering our root component
//but we import React in every file we have a React Component.
import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main'

//we're rendering our root component into a root DOM node, we pass both
//to ReactDOM.render()
ReactDOM.render(<Main />, document.getElementById('app'))
