'use strict'
React = require('react')
ReactDom = require('react-Dom')
Router = require('react-router').Router
Route = require('react-router').Route
Link = require('react-router').Link

About = React.createClass
  render: ->
    <h1>This is About</h1>

Inbox = React.createClass
  render: ->
    <div>
      <div style={{'background-color':'black'}}>
      </div>
      <h1>這是黑箱</h1>
    </div>

App = React.createClass
  render: ->
      <div>
        <h1>App</h1>
        <nav>
          <div>
            <ul>
              <li><Link to='/job/create'>About</Link></li>
              <li><Link to='/myjobs'>InBox</Link></li>
            </ul>
          </div>
        </nav>
        {this.props.children}
      </div>

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="jobs" component={About} />
      <Route path="myjobs" component={Inbox} />
    </Route>
  </Router>
), document.body)
