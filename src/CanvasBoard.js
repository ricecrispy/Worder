import React from "react";

class CanvasBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", textLengthLimit: 50 };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //handle the typing-in-text-field event
  handleChange(event) {
    let hasReachedTextLengthLimit =
      this.state.textLengthLimit - this.state.value.length <= 0;
    if (
      !hasReachedTextLengthLimit ||
      (hasReachedTextLengthLimit && event.target.value.length < this.state.value.length)
    ) {
      this.setState({ value: event.target.value });
    }
  }

  //handle the button onclick event
  handleSubmit(event) {
    let canvas = this.refs.canvasBody;
    let ctx = canvas.getContext("2d");
    this.fillCanvasBackgroundColor(ctx, canvas);
    let inputText = this.state.value;
    this.addTextToCanvas(ctx, canvas, inputText);
    event.preventDefault();
  }

  //add text to the canvas element
  addTextToCanvas(ctx, canvas, inputText) {
    ctx.fillStyle = "black";
    ctx.font = "40px Courier";
    ctx.textAlign = "center";

    let lineHeight = 36;
    this.wrapText(
      ctx,
      inputText,
      canvas.width / 2,
      canvas.height / 2,
      400,
      lineHeight
    );
  }

  //Source: https://codepen.io/bramus/pen/eZYqoO
  wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(" ");
    var line = "";

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  //Fill the canvas element with the chosen background color
  fillCanvasBackgroundColor(ctx, canvas) {
    ctx.fillStyle = "#FEF5E7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  //Initialize the canvas element
  componentDidMount() {
    let canvas = this.refs.canvasBody;
    let ctx = canvas.getContext("2d");
    this.fillCanvasBackgroundColor(ctx, canvas);
  }

  render() {
    return (
      <div id="canvasBoard" ref="canvasBoard">
        <canvas id="canvasBody" ref="canvasBody" width={500} height={500} />
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Create" />
        </form>
        <p id="wordCount" ref="wordCount">
          characters left:
          {this.state.textLengthLimit - this.state.value.length}
        </p>
      </div>
    );
  }
}

export default CanvasBoard;
