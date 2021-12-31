import React from 'react'
import { hot } from 'react-hot-loader'

import { TokenAnnotator } from '../../src'

const TEXT = `COVID-19 is caused by virus SARS-CoV-2 which is a coronavirus.`

const TAG_COLORS = {
  SUBJECT: '#00ffa2',
  OBJECT: '#84d2ff',
}

const Card = ({ children }) => (
  <div
    style={{
      boxShadow: '0 2px 4px rgba(0,0,0,.1)',
      margin: 6,
      maxWidth: 500,
      padding: 16,
    }}
  >
    {children}
  </div>
)

class App extends React.Component<any, any> {
  state = {
    value: [],
    tag: 'SUBJECT',
  }

  handleChange = value => {
    this.setState({ value })
  }

  handleTagChange = e => {
    this.setState({ tag: e.target.value })
  }

  render() {
    return (
      <div style={{ padding: 24, fontFamily: 'IBM Plex Sans' }}>
        <h3 style={{ marginTop: 0 }}>react-text-annotate</h3>
        <a href="https://github.com/mcamac/react-text-annotate">Github</a>
        <p>A React component for interactively highlighting parts of text.</p>
        <div style={{ display: 'flex', marginBottom: 24 }}>
          <Card>
            <h4>Default</h4>
            <select onChange={this.handleTagChange} value={this.state.tag}>
              <option value="SUBJECT">SUBJECT</option>
              <option value="OBJECT">OBJECT</option>
            </select>
            <TokenAnnotator
              style={{
                fontFamily: 'IBM Plex Sans',
                maxWidth: 500,
                lineHeight: 1.5,
              }}
              tokens={TEXT.split(' ')}
              value={this.state.value}
              onChange={this.handleChange}
              getSpan={span => ({
                ...span,
                tag: this.state.tag,
                color: TAG_COLORS[this.state.tag],
              })}
            />
          </Card>
          <Card>
            <h4>Custom rendered mark</h4>
            <select onChange={this.handleTagChange} value={this.state.tag}>
              <option value="SUBJECT">SUBJECT</option>
              <option value="OBJECT">OBJECT</option>
            </select>
            <TokenAnnotator
              style={{
                fontFamily: 'IBM Plex Sans',
                maxWidth: 500,
                lineHeight: 1.5,
              }}
              tokens={TEXT.split(' ')}
              value={this.state.value}
              onChange={this.handleChange}
              getSpan={span => ({
                ...span,
                tag: this.state.tag,
                color: TAG_COLORS[this.state.tag],
              })}
              renderMark={props => (
                <mark
                  key={props.key}
                  onClick={() => props.onClick({ start: props.start, end: props.end })}
                >
                  {props.content} [{props.tag}]
                </mark>
              )}
            />
          </Card>
        </div>
        <Card>
          <h4>Current Value</h4>
          <pre>{JSON.stringify(this.state.value, null, 2)}</pre>
        </Card>
      </div>
    )
  }
}

export default hot(module)(App)
