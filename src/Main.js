import React from "react";
const { Component } = React;
import ReactDOM from "react-dom";
import axios from "axios";
import Child from "./Child";

class Main extends Component {
    constructor() {
      super();
      this.state = {
          children: [], 
          selectId: "",
      };
    }
    async componentDidMount() {
        const children = await (await axios.get("/children")).data;
        console.log(children);
        this.setState({ children });
        window.addEventListener("hashchange", () => {
          this.setState({ selectId: window.location.hash.slice(1) });
        });
        this.setState({ selectId: window.location.hash.slice(1) });
      }
      render() {
        const { children, selectId } = this.state;
        return (
          <div>
            <h1>Toy Fundraiser Winners</h1>
            <ul>
              {children.map((child) => {
                return (
                  <li className={selectId === child.id ? "selected" : ''}>
                    <a href={`#${child.id}`}>{child.name}</a>
                  </li>
                );
              })}
            </ul>
            <div>
              {!!selectId && <Child selectId={selectId} />}
            </div>
          </div>
        );
      }
    }
    
    export default Main;
