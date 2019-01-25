import React, { Component } from 'react';
import { apps, shortcuts, appCategories, appSections } from '../data'

const AppContext = React.createContext();
const AppConsumer = AppContext.Consumer;

class AppProvider extends Component {  
  render() {
    return (
      <AppContext.Provider
        value={{
          apps, shortcuts, appCategories, appSections,
          growAYearOlder: () =>
            this.setState({
              age: this.state.age + 1,
            }),
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
export { AppConsumer };