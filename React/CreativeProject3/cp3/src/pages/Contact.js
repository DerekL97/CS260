import React from "react";
import axios from 'axios';

class Xkcd extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comicNumber: 'latest',
			lastComic: 0,
			current: {
			  title: '',
			  img: '',
			  alt: ''
			},
		};

		this.getXKCD = this.getXKCD.bind(this);
		this.first = this.first.bind(this);
		this.prev = this.prev.bind(this);
		this.next = this.next.bind(this);
		this.last = this.last.bind(this);
		this.randomComic = this.randomComic.bind(this)
		this.getXKCD();
	}

	getXKCD() {
		var url = 'https://xkcd.vercel.app/?comic=' + this.state.comicNumber;
		axios.get(url)
		.then(response => {
		  let comicNum = response.data.num;
		  this.state.comicNumber = comicNum;
		  if(this.state.lastComic == 0) {
			  this.state.lastComic = comicNum;
		  }
		  console.log(this.state);
		  // Since we render current, we need to call setState()
		  this.setState(prevState => {
			// creating copy of state variable current
			let current = Object.assign({}, prevState.current);
			current = response.data;    // update the object
			return { current };         // return new object current
		  });
		  return true;
		})
		.catch(error => {
		  console.log(error)
		});
	}
	first() {
		this.state.comicNumber = 1;
		this.getXKCD();
	}
	prev() {
		if(this.state.comicNumber != 1){
			this.state.comicNumber = this.state.comicNumber - 1;
		}
		this.getXKCD();
	}
	next() {
		if(this.state.comicNumber != this.state.lastComic){
			this.state.comicNumber = this.state.comicNumber + 1;
		}
		this.getXKCD();
	}
	last() {
		this.state.comicNumber = 'latest';
		this.getXKCD();
	}

	getRandom(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
	}
	randomComic() {
		this.state.comicNumber = this.getRandom(1, this.state.lastComic);
		this.getXKCD();
	}

	render() {
		return (
			<div>
				<h1> XKCD Comics </h1>
				<div>
					<h2>{this.state.current.safe_title}</h2>
					<img src={this.state.current.img} alt={this.state.current.alt}></img>
					<p>{this.state.current.alt}</p>
					<p><i>#{this.state.current.num}, drawn on {this.state.current.month}-{this.state.current.day}-{this.state.current.year}</i></p>
					<button onClick={this.first}>First</button>
					<button onClick={this.prev}>Previous</button>
					<button onClick={this.next}>Next</button>
					<button onClick={this.last}>Last</button>
					<button onClick={this.randomComic}>Random</button>
					</div>
			</div>
		);
	}
}
const Contact = () => {
	return <Xkcd/>;
  };

  export default Xkcd;