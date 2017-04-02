
import React from 'react';
import ReactDOM from 'react-dom';
import {SketchPicker} from 'react-color';
import {Button, Container} from 'muicss/react';

import WatchMeLoad from '../../src/watch-me-load';

const watchMeLoad = new WatchMeLoad(document.body);

/**
 * The core App component
 */
class App extends React.Component {
  /**
   * Construct a new App component.
   */
  constructor() {
    super();

    this.state = {
      color: 'red',
    };

    this.handleColorChange = this.handleColorChange.bind(this);
  }

  /**
   * Handle the color change via the SketchPicker.
   * @param {object} color The color to change to. It should have a hex
   * property.
   */
  handleColorChange({hex}) {
    this.setState({color: hex});
  }

  /**
   * Render the component
   * @return {JSX} The renderable component.
   */
  render() {
    return (
      <Container style={{padding: '50px 0'}}>
        <div>
          <SketchPicker
              color={this.state.color}
              onChangeComplete={this.handleColorChange}
          />
        </div>
        <br/>
        <Button
            color="primary"
            onClick={() => watchMeLoad.startLoading(this.state.color)}
        >
          Start
        </Button>
        <Button
            color="accent"
            onClick={() => watchMeLoad.stopLoading()}
        >
          Stop
        </Button>
      </Container>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'));
