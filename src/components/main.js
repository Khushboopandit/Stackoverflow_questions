import React, { Component } from "react";
import "../css/main.css";
import logo from "../images/logo.png";
import axios from "axios";
import Pagination from "./pagination";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      searched_data: [],
    };
  }
  componentDidMount = () => {
    // API call
    axios
      .get(
        "https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&notice=True&site=stackoverflow"
      )
      .then((response) => {
        // handle success
        this.setState({
          data: response.data,
          searched_data: response.data.items,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  // Get search output
  filterData = (e) => {
    let full_data = this.state.data;
    let search_data= []
    full_data.items.map((item,index)=>{
     for (let i = 0;item.tags.length > i; i++){
       if(item.tags[i].toLowerCase().match(e.target.value)){
         search_data.push(item)
         break
       }
     }
     this.setState({searched_data:search_data})
    })
  };
  render() {
    return (
      <div>
        <div className="bg-black text-light">
          <div className="container pt-2 pb-4">
            <span className="d-flex">
              <img className="w-icon" src={logo} alt="logo" />
              <h4 className="align-self-end pb-2">
                Search StackOverflow Questions
              </h4>
            </span>
            <div className="form-group mb-2">
              <label htmlFor="staticEmail2" className="sr-only ">
                Search
              </label>
              {/* Get input from user */}
              <input
                type="text"
                className="form-control-plaintext px-2 rounded input-border text-light"
                id="seach"
                placeholder="Search..."
                onChange={(e) => this.filterData(e)}
              />
            </div>
          </div>
        </div>
        {/* child component */}
        <Pagination searched_data={this.state.searched_data} />
      </div>
    );
  }
}

export default Main;
