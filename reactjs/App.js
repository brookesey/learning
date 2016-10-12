import React from 'react'
import ReactDOM from 'react-dom'

let Mixin = InnerComponent => class extends React.Component {
    constructor(){
        super();
        this.update = this.update.bind(this);
        this.state = {val:0};
    }
    update() {
        this.setState({val: this.state.val + 1});
    }
    componentWillMount() {
        console.log("mount");
    }
    componentDidMount() {
        console.log("mounted");
    }
    render() {
        return <InnerComponent
        update={this.update}
        {...this.state}
        {...this.props}/>
    }
};

const ButtonMix = (props) => <button onClick={props.update}> {props.txt} - {props.val}</button>
const LabelMix = (props) => <label onMouseMove={props.update}> {props.txt} - {props.val}</label>

let ButtonMixed = Mixin(ButtonMix);
let LabelMixed = Mixin(LabelMix);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      red: 0,
      green: 0,
      blue: 0,
      val: 0,
      increasing: false
    };
    this.update = this.update.bind(this);
  }
  update(e) {
    this.setState({
      red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
      green: ReactDOM.findDOMNode(this.refs.green.refs.inp).value,
      blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value,
      val: this.state.val + 1
    });
    ReactDOM.render(<App val={this.props.val+1}/>, document.getElementById('a'))

  }
  componentWillMount() {
    console.log("Mounting")
    this.setState({m: 1});
  }
  componentDidMount() {
    console.log("Mounted")
    // this.inc = setInterval(this.update, 500)
  }
  componentWillUnmount() {
    console.log("Unmounted")
    // clearInterval(this.inc)
  }
  componentWillReceiveProps(nextProps) {
      this.setState({increasing: nextProps.val > this.props.val});
  }
  shouldComponentUpdate(nextProps, nextState) {
      return nextProps.val % 5 === 0;
  }
  componentDidUpdate(prevProps, prevState) {
      // console.log('prevProps', prevProps);
  }
  render() {
    console.log("Rendering", this.state.increasing)
    return (
        <div>
          <h1>Hello World</h1>
          <p>{this.state.red}</p>
          <p>{this.state.green}</p>
          <p>{this.state.blue}</p>
          <Slider ref="red" update={this.update}/>
          <Slider ref="green" update={this.update}/>
          <Slider ref="blue" update={this.update}/>
            <NumInput ref="red"
                      min={0}
                      max={255}
                      step={1}
                      val={+this.state.red}
                      label="Red"
                      update={this.update}/>
          <Button>I <Heart/> React</Button>
          <button onClick={this.update}>{this.state.val * this.state.m}</button>
          <button onClick={this.update}>{this.props.val}</button>
            <p></p>
            <ButtonMixed txt="Button"/>
            <LabelMixed txt="Button"/>
        </div>
    );
  }
}

class Wrapper extends React.Component {
  constructor() {
    super()
  }
  mount() {
    ReactDOM.render(<App />, document.getElementById('a'))
  }
  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('a'))
  }
  render() {
    return (
        <div>
          <button onClick={this.mount.bind(this)}>Mount</button>
          <button onClick={this.unmount.bind(this)}>Unmount</button>
          <div id="a"></div>
        </div>
    )
  }
}

App.propTypes = {
  txt: React.PropTypes.string,
  cat: React.PropTypes.number.isRequired
};

App.defaultProps = {
  txt: "DEFAULT",
  val: 0
};

class NumInput extends React.Component {
    render() {
        let label = this.props.label != '' ? <label>{this.props.label} - {this.props.val}</label> :''
        return (
            <div>
                <input ref="inp"
                       type={this.props.type}
                       min={this.props.min} max={this.props.max}
                       onChange={this.props.update}/>
                {label}
            </div>
        );
    }
}

NumInput.propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    val: React.PropTypes.number,
    label: React.PropTypes.string,
    update: React.PropTypes.func.isRequired,
    type: React.PropTypes.oneOf(['number', 'range']),
};

NumInput.defaultProps = {
    min: 0,
    max: 0,
    step: 1,
    label: '',
    type: 'range'
}

class Slider extends React.Component {
  render() {
    return (
        <div>
          <input ref="inp" type="range" min="0" max="255" onChange={this.props.update}/>
        </div>
    );
  }
}

class Button extends React.Component {
  render() {
    return (
        <button>{this.props.children}</button>
    );
  }
}

const Heart = () => <span className="glyphicon glyphicon-heart">HEART</span>

// const Widget = (props) => {
//   return (
//       <div>
//         <p>{props.txt} {props.cat}</p>
//         <input type="text" onChange={props.update}/>
//       </div>
//   );
// };

export default Wrapper //App
