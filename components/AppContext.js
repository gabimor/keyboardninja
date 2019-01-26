import React, { Component } from 'react';

const AppContext = React.createContext();
const AppConsumer = AppContext.Consumer;

class AppProvider extends Component {  
 
  render() {
    return (
      <AppContext.Provider {...this.props}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
export { AppConsumer };