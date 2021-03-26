import React from 'react';
import Player from '../players';
import Buttons from '../buttons';
import Victory from '../victory';
import './App.css';


export default class App extends React.Component {

  constructor(props){
    super(props)
    this.vicArr = ['012','345','678','036','147','258','048','246'];
    this.history = [];
    this.whoVic = ''; 
    this.score = {
      x: 0,
      o: 0
    };
  }

  state = {
    itemsArr: ['','','',
               '','','',
               '','','',],
    player: Math.floor(Math.random() * 2) === 0 ? 'o' : 'x',
    victory: false
  }

  isVictory = (player, vicArr) => {
    let playerArr = [],
      vic = false;
    vicArr.forEach((item, id)=>{
      if (item === player){
        playerArr.push(id.toString());
      }
    });

    this.vicArr.forEach((item) => {
      const vicArrArr = item.split('');

      const rightItems = playerArr.filter(pItem => {
        return pItem === vicArrArr[0] || pItem === vicArrArr[1] || pItem === vicArrArr[2];
      })

      if (rightItems.length > 2){
        this.whoVic = player;
        vic = true;
        this.setState({victory: vic});
        this.score[player] ++;
      }
    })

    if (playerArr.length > 4 && !this.state.victory){
      this.whoVic = 'Никто не';
      vic = true;
      this.setState({victory: vic});
    }
  
    if (!vic) {
      this.setState({player: this.changePlayer(player)});
    }
  }

  restart = () =>{
    this.setHistory(0);
    this.history = [];
    this.setState({victory: false, player: this.changePlayer(this.state.player)});
  }

  setHistory = (pos) => {
    this.setState({itemsArr: this.history[pos]});
  }

  componentDidMount() {
    this.history.push(this.state.itemsArr);
  }

  componentDidUpdate() {
    this.history.push(this.state.itemsArr);
  }

  changePlayer = (player) => {
    if(player === 'o') {
      player = 'x';
    } else {
      player = 'o';
    }
    return player;
  }

  changeItem = (id) =>{
    if (this.state.itemsArr[id] === '' && !this.state.victory) {
      const {itemsArr, player} = this.state;

      let newArr = [...itemsArr.slice(0, id), player, ...itemsArr.slice(id + 1)];
      this.setState({itemsArr: newArr})

      this.isVictory(player, newArr);
    } else {
      console.log('block');
    }
  }

  renderItem = (arr) => {
    return arr.map((item, id)=>{
      return(
        <button key={id}
          onClick={() => this.changeItem(id)}
          className='cell'>
            {item}
        </button>
      )
    })
  }

  cancelMove = () => {
    if (this.history.length > 1 && !this.state.victory) {

      this.history.pop();
      this.setHistory(this.history.length-1)
      this.history.pop();

      this.setState(({player})=>{
        return {
          player: this.changePlayer(player)
        }
    })}
  }

  render() {
    const {x, o} = this.score;
    const items = this.renderItem(this.state.itemsArr);

    const victory = this.state.victory ? <Victory whoVic={this.whoVic} /> : null;

    return (
      <div className="App">
        {victory}
        <Player player={this.state.player} scoreX={x} scoreY={o} />

        <Buttons cancel={this.cancelMove} restart={this.restart} />

        <div className='cell-box'>
          {items}
        </div>
      </div>
    )
  }
};