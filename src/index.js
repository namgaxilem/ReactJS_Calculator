import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './index.css';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.type === 'numberButton') {
      this.button = (
        <div className="col-3 cell">
          <button className="button bg-dark text-white" onClick={this.props.onClick}>
            {this.props.value}
          </button>
        </div>
      );
    }
    else if (this.props.type === 'calculateButton') {
      this.button = (
        <div className="col-3 cell">
          <button className="button bg-warning text-white" onClick={this.props.onClick}>
            {this.props.value}
          </button>
        </div>
      );
    }
    else {
      this.button = (
        <div className="col-3 cell">
          <button className="button bg-secondary text-white" onClick={this.props.onClick} title={this.props.title}>
            {this.props.value}
          </button>
        </div>
      );
    }

    return this.button;
  }
}

class Case extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 0,
      operandA: 0,
      operandB: '',
      operator: null
    };
  }

  numberButtonClick(i) {
    if (this.state.operator === null) {
        let number = this.state.operandA + ('' + i);
        let check = Number(number);
        this.setState({operandA: (check <= 999999999 ? number : this.state.operandA)});
    }
    else {
        let number = this.state.operandB + '' + i;
        let check = Number(number);
        this.setState({operandB: (check <= 999999999 ? number : this.state.operandB)});
    }
  }

  dotButtonClick() {
    if (this.state.operator === null) {
      let number = Number(this.state.operandA);
      if(number % 1 === 0) {
        number = number + '.';
        this.setState({operandA: number});
      }
      else return;
    }
    else {
      let number = Number(this.state.operandB);
      if(number % 1 === 0) {
        number = number + '.';
        this.setState({operandB: number});
      }
      else return;
    }
  }

  calculateButtonCLick(i) {
    this.setState({operator: i});
  }

  equalButtonCLick() {
    let statement;
    let result = 0;
    let a = Number(this.state.operandA);
    let b = Number(this.state.operandB);

    switch(this.state.operator) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '*':
        result = a * b;
        break;
      case '/':
        result = a / b;
        break;
      case '%':
        result = a % b;
        break;
    }

    if (this.state.operator == null || result === Infinity) {
      return;
    }

    this.setState({
      result: numberWithCommas(a) + ' ' + this.state.operator + ' ' + numberWithCommas(b),
      operandA: result,
      operandB: '',
      operator: null
    });
  }

  clearButtonCLick() {
    this.setState({
      result: 0,
      operandA: 0,
      operandB: '',
      operator: null
    });
  }

  backspaceButtonClick() {
    if (this.state.operator === null) {
      let str = this.state.operandA.toString();
      str = str == null ? ('0') : (str.slice(0, -1));
      this.setState({operandA: str});
    }
    else {
      let str = this.state.operandB.toString();
      str = str == null ? ('0') : (str.slice(0, -1));
      this.setState({operandB: str});
    }
  }

  render() {
    return (
      <div className="case container">

        <div className="row">
          <div className="screen">
              <p> {this.state.result} </p>
              <p className="text-right" style={{color: 'white'}}> = </p>
              <p className="text-right"> &nbsp;
                {numberWithCommas(this.state.operandA)}
                {this.state.operator}
                {this.state.operator == null ? null : numberWithCommas(this.state.operandB)}
              </p>
          </div>
        </div>

        <div className="row">
          <Button value="AC" onClick={() => this.clearButtonCLick()}/>
          <Button value="√" title={'Chưa làm'} />
          <Button value="%" onClick={() => this.calculateButtonCLick('%')}/>
          <Button value="/" type="calculateButton" onClick={() => this.calculateButtonCLick('/')}/>
        </div>
        <div className="row">
          <Button value="7" type="numberButton" onClick={() => this.numberButtonClick(7)}/>
          <Button value="8" type="numberButton" onClick={() => this.numberButtonClick(8)}/>
          <Button value="9" type="numberButton" onClick={() => this.numberButtonClick(9)}/>
          <Button value="*" type="calculateButton" onClick={() => this.calculateButtonCLick('*')}/>
        </div>
        <div className="row">
          <Button value="4" type="numberButton" onClick={() => this.numberButtonClick(4)}/>
          <Button value="5" type="numberButton" onClick={() => this.numberButtonClick(5)}/>
          <Button value="6" type="numberButton" onClick={() => this.numberButtonClick(6)}/>
          <Button value="-" type="calculateButton" onClick={() => this.calculateButtonCLick('-')}/>
        </div>
        <div className="row">
          <Button value="1" type="numberButton" onClick={() => this.numberButtonClick(1)}/>
          <Button value="2" type="numberButton" onClick={() => this.numberButtonClick(2)}/>
          <Button value="3" type="numberButton" onClick={() => this.numberButtonClick(3)}/>
          <Button value="+" type="calculateButton" onClick={() => this.calculateButtonCLick('+')}/>
        </div>
        <div className="row">
          <Button value="." type="numberButton" onClick={() => this.dotButtonClick()}/>
          <Button value="0" type="numberButton" onClick={() => this.numberButtonClick(0)}/>
          <Button value="<=" type="numberButton" onClick={() => this.backspaceButtonClick()}/>
          <Button value="=" type="calculateButton" onClick={() => this.equalButtonCLick()}/>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Case />,
  document.getElementById('root')
);

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = Number(parts[0]);
    parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");//' + (cc % 1 === 0 ? '.' : '');
    return parts.join(".");
}
