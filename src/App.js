import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props)
    console.log("I excetuded");
    this.state = {
      searchContent: "",
      searchFlag: "",
      searchedArr: [],
      arr:[1,2,3]
    }
  }

  handleSearch(e) {
    console.log("--> ", e.target.value);
    this.setState({
      searchFlag: true,
      searchContent: e.target.value
    }, () => {
      this.search();
    })
  }



  search() {
    console.log("Api call");
    axios({
      method: "get",
      url: `http://localhost:4000/getnames/get/${this.state.searchContent}`,
      headers: ""
    }).then((results) => {
      if(results.data.code===200){
      this.setState({
        searchedArr:results.data.result
      },()=>{
        console.log("-->  ",this.state.searchedArr);
      })
    }else{
      this.setState({
        searchedArr:[]
      })
    }
    }).catch((error) => {
      console.log("got logged here")
      this.setState({
        searchedArr: []
      })
      console.log(error);
    });
    //
  }

  render() {
    var view
    if(this.state.searchedArr.length > 1){
    view = <div id="divX">
      <ul id="ulX">
        {this.state.searchedArr.map((item, key) => (
          <li key={key}>{item}</li>
        ))}
      </ul>
    </div>
    }else{}
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Auto Complete Feature for Names</h1>
        </header>
        <div>
          <h1>Type Here : </h1>
          <div id="divX">
          <input type="text" key="myterm" value={this.state.searchContent} onChange={(e) => this.handleSearch(e)} size="45" placeholder="Start Typing...." />
          </div>
          {view}
        </div>
      </div>
    );
  }
}

export default App;
