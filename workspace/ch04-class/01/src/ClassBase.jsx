// 🔑 컴포넌트를 만드는 두가지 방법: 클래스형 vs 함수형
import { Component } from "react";
import PropTypes from "prop-types";

class ClickMe extends Component {
  // 컴포넌트를 클래스로 만들 때는, prop 이름이 정해져 있다!
  // state, setState: 부모 컴포넌트(ClickMe)에 정의되어 있는 Prop 이름
  // 상태는 state 변수 하나만 사용 가능해서 여러개의 상태를 관리하려면 객체로 지정해야 한다
  // cf) 함수형에서는 state변수를 여러개 지정 가능(useState 훅)
  state = { count: 0 };

  // 생성자 함수(props를 기준으로 state를 초기할 경우 등에서 작성)
  constructor(props) {
    // 부모 클래스의 생성자를 통해 this가 초기화되므로
    // super()를 호출해야 자식 클래스에서 This를 사용할 수 있고,
    // super(props)를 호출해야 자식클래스에서 this.props를 사용할 수 있다.
    super(props); // 필수로 작성
    this.state = { count: props.level || 1 };
  }

  // 💥arrow function으로 작성해야 this.state에 접근 가능!!
  handleClick = () => {
    // this = 함수가 생성(호출X)될 당시에 부착되어 있는 요소를 뜻함
    this.setState({ count: this.state.count + (this.props.level || 1) });
  };

  render() {
    return (
      <div>
        클릭 횟수 X {this.props.level || 1}: {this.state.count}
        <button onClick={this.handleClick}>클릭</button>
      </div>
    );
  }
}

ClickMe.propTypes = {
  level: PropTypes.number,
};

class Parent extends Component {
  render() {
    return (
      <div>
        <h1>01 클래스 컴포넌트</h1>
        <ClickMe level={2} />
        <ClickMe level={5} />
        <ClickMe />
      </div>
    );
  }
}

export default Parent;
