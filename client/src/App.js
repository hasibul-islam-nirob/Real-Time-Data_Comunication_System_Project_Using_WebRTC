import React, {Component} from 'react';
import io from 'socket.io-client';

class App extends Component {

    componentDidMount() {
        const socket = io.connect('/');
    }

    render() {
        return (
            <div>
              <h2>Hello</h2>
            </div>
        );
    }
}

export default App;