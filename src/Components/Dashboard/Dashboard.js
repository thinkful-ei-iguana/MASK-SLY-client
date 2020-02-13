import React from 'react';
import SideBar from './sidebar';

import './Dashboard.css';

export default function Dashboard() {
  return (
    <div id="Dashboard">
      <SideBar />
      <div id="page-wrap">
        <h1>Sidebar</h1>
        <h2>Placeholder</h2>
      </div>
    </div>
  );
}

class Dashboard extends React.Component {
    constructor(props){
      super(props);
      
    //   this.state = {
    //     language: '',
    //     words: ['Placeholder']
      }
    }
  
   componentDidMount() {
     
   }
  
   static defaultProps = {
    language: {
      name: 'Default Language',
      total_score: 0
    },
    user: {
      user: {
        name: 'Default username'
      }
    }
   }
  
   static contextType = ContentContext
  
    render(){
      console.log(this.context)
      return(
        <div className="dashboardContainer">
  
          <h2>Welcome back, {this.props.user.user.name}!
          </h2>
  
          <Link to='/learn'>
          <button>Start practicing</button>
            </Link>
          <div className="infoArea">
            <div className="infoHeader"><h3>Next Question</h3></div>
            
          </div>
        </div>
      )
    }
  }
  
  export default Dashboard;