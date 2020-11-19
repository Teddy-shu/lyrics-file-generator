import React, { Component } from 'react';


class Lyrics extends Component{
  constructor(props){
    super(props);
    this.state = {
      songName : "",
      lyrics: [{
        line : "",
        time : ""
        }],
      numberOfLine: 0,
      showResult: false
    }
    this.handleSongNameChange = this.handleSongNameChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.hadleClickInsert = this.hadleClickInsert.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
    this.handleClickOutput = this.handleClickOutput.bind(this);
  }

  handleClick(event){
    const lyrics = this.state.lyrics.slice(0, this.state.numberOfLine + 1);
    //console.log(lyrics.length);
    const newLine = {
                    line : "test",
                    time : "test"
                    };
    this.setState({
      lyrics: lyrics.concat([newLine]),
      numberOfLine: lyrics.length
    });
  }

  handleClickClose(event){
    this.setState({
      showResult: false,
    });
  }

  hadleClickInsert(event){
    const thisName = event.target.name;
    const thisIndex = thisName.substring(6, thisName.length);
    var lyrics = this.state.lyrics.slice(0, this.state.numberOfLine + 1);

    lyrics.splice(Number(thisIndex) + 1, 0, {line : "",time : ""});

    this.setState({
      lyrics:lyrics.slice(),
      numberOfLine: lyrics.length
    });
  }

  handleClickDelete(event){
    const thisName = event.target.name;
    const thisIndex = thisName.substring(6, thisName.length);
    var lyrics = this.state.lyrics.slice(0, this.state.numberOfLine + 1);
      //console.log("thisIndex + 1 = " + (Number(thisIndex) + 1));
    var front = lyrics.slice(0, thisIndex);
    var back = lyrics.slice((Number(thisIndex) + 1));
    console.log("front = " + front.length + " back = " + back.length);
    this.setState({
      lyrics: front.concat(back),
      numberOfLine: lyrics.length
    });
  }

  handleChange(event) {
    const thisName = event.target.name;
    const thisType = thisName.replace(/[0-9]/, "");
    var thisIndex = thisName.substring(4, thisName.length);
    const thisValue = event.target.value;
    var lyrics = this.state.lyrics.slice(0, this.state.numberOfLine + 1);

    const chars = thisValue.split("\n");
    if(chars.length > 1){
      for(var i = 0; i < chars.length; i++){ //有換行符號直接開新的item
        var head = i === 0 ? 1 : 0;
        lyrics.splice(Number(thisIndex),head,{
          line : chars[i],
          time : ""
        });
        thisIndex++;
      }
    } else {

      if(thisType === "line"){
        lyrics[thisIndex].line = thisValue;
      } else {
        lyrics[thisIndex].time = thisValue;
      }
    }
    this.setState({
      lyrics: lyrics.slice(),
      numberOfLine: lyrics.length
    });
  }

  handleSongNameChange(event){
    this.setState({
      songName : event.target.value
    });
  }

  handleSubmit(event) {
    this.setState({
      showResult: true,
    });
  }

  handleClickOutput(event) {
    var lyrics = this.state.lyrics.slice(0, this.state.numberOfLine + 1);
    var songName = this.state.songName;
    var output = {lyrics: lyrics};

    var blob = new Blob([JSON.stringify(output)], {type: 'application/json'});

    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, songName + ".json");
    }
    else{
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = songName + ".json";
        document.body.appendChild(elem);
        //elem.innerHTML = "<span>download</span>";
        elem.click();
        document.body.removeChild(elem);
    }
  }

  render () {
    const lyrics = this.state.lyrics;
    const isShowResult = this.state.showResult;

    const editor = lyrics.map((item, index) => {
      return (
        <li key={index}>
          <label>
            {"line" + index}
            <textarea name={"line" + index} value={item.line} onChange={this.handleChange} />
          </label>
          <label>
            {"time" + index}
            <input type="text" name={"time" + index} value={item.time} onChange={this.handleChange} />
          </label>
          <button name={"insert" + index} onClick={this.hadleClickInsert}>{"insert new line"}</button>
          <button name={"delete" + index} onClick={this.handleClickDelete}>{"delete this line"}</button>
        </li>
      );
    });

    if(isShowResult){
        const generator = lyrics.map((item, index) => {
          return(
            <li key={"re" + index}>
              <span>{item.line}</span>
              <span>{item.time}</span>
            </li>
          );
        });

        return (
          <div>
            <div className="preview">
            </div>
            <div className="show-result">
              <button className="close-btn" onClick={this.handleClickClose}>{"Close"}</button>
              <button className="output-btn" onClick={this.handleClickOutput}>{"Output"}</button>
              <ol>{generator}</ol>
            </div>

            <div>
              <label>
                {"song Name :"}
                <input type="text" value={this.state.songName} onChange={this.handleSongNameChange} />
              </label>
              <ol>{editor}</ol>
              <button onClick={this.handleSubmit}>{"see result"}</button>
               <button onClick={this.handleClick}>{"add new line"}</button>
            </div>
          </div>
        );
    } else {
      return (
        <div>
          <label>
            {"song Name :"}
            <input type="text" value={this.state.songName} onChange={this.handleSongNameChange} />
          </label>
          <ol>{editor}</ol>
          <button onClick={this.handleSubmit}>{"see result"}</button>
           <button onClick={this.handleClick}>{"add new line"}</button>
        </div>
      );
    }
    /*return (
      <div class="show-result">
        <ol>{generator}</ol>
      </div>
      <div>
        <ol>{editor}</ol>
        <input type="submit" value="Submit" />
         <button onClick={this.handleClick}>{"add new line"}</button>
      </div>
    );*/
  }
}

/*class Lines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneLine: '',
      time: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    alert('A name was submitted: \n' + this.state.oneLine + "\n" + this.state.time);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          new line:
          <textarea
              name="oneLine"
              value={this.state.oneLine}
              onChange={this.handleChange} />
        </label>
        <label>
          new time:
          <input
              name="time"
              type="text"
              value={this.state.time}
              onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        <buttom onClick={this.hadleClickInsert}>insert</buttom>
      </form>
    );
  }
}*/

export default Lyrics;
