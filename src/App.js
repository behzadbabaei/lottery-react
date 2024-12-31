import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from "./lottery";

class App extends React.Component {
  state = {
    manager: '' ,
    players: [],
    balance: '',
    value: '',
    message: ''
  }
  async componentDidMount() {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);

      this.setState({manager,players,balance})
  }
  
  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    this.setState({message:'waiting on transaction success...'});

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'wei')
    });

    this.setState({message:'you have been entered!'});

  }

  pickWinner = async (event) => {
    event.preventDefault();
    
    const accounts = await web3.eth.getAccounts();
    this.setState({message:'waiting on transaction success...'});

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({message:'the winner has been picked!'});

  }


  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p> This contract managed by {this.state.manager}</p>
        <p>There are currently {this.state.players.length} entered the lotter
          competeing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether! </p>
      
        <hr />

        <form onSubmit={this.onSubmit}>
            <h4>Want to try your luck?</h4>
            <div>
              <label>Amount of ether</label>
              <input 
                value={this.state.value} 
                onChange={event => this.setState({value: event.target.value})}
              />
              <button>Enter</button>

              <h4>ready to pick the winner?</h4>
              <button onClick={this.pickWinner}>Pick Winner</button>
              <hr />
              <h1>{this.state.message}</h1>
            </div>
        </form>
      </div>
    );
  }
}
export default App;
