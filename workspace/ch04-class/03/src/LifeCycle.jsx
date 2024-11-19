// 🔑 컴포넌트를 만드는 두가지 방법: 클래스형 vs 함수형
import { Component } from "react";
import PropTypes from "prop-types";

class ClickMe extends Component {
  state = { count: 0 };

  // 💥arrow function으로 작성해야 this.state에 접근 가능!! (lexical this)
  handleClick = () => {
    this.setState({ count: this.state.count + (this.props.level || 1) });
  };

  // ✨ 클래스형 컴포넌트는 React 라이프사이클 메서드를 사용해 컴포넌트의 상태 관리, 업데이트, 그리고 마운트/언마운트 과정을 제어할 수 있습니다
  // 1로 시작: 최초로 화면에 표시되는 과정 : Mount
  // 2로 시작: Update 과정

  // 1-1
  // 생성자 함수(props를 기준으로 state를 초기화할 경우 등에서 작성)
  constructor(props) {
    super(props); // 필수로 작성
    this.state = { count: props.level || 1 };
    console.log("1-1 constructor 호출됨.");
  }

  // 1-2/2-1
  // 부모 컴포넌트에 정의된 메소드를 재정의
  static getDerivedStateFromProps(props, state) {
    console.log("1-2/2-1 getDerivedStateFromProps 호출됨.");

    return null;
  }

  // 2-2
  shouldComponentUpdate(nextProps, nextState) {
    console.log("2-2 shouldComponentUpdate 호출됨.");
    return true;
  }

  // 1-3/2-3
  render() {
    console.log("1-3/2-3 render 호출됨.");
    return (
      <div>
        클릭 횟수 X {this.props.level || 1}: {this.state.count}
        <button onClick={this.handleClick}>클릭</button>
      </div>
    );
  }

  // 1-4
  componentDidMount() {
    console.log("1-4 componentDidMount 호출됨.");
  }

  // 2-4
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(" getSnapshotBeforeUpdate 호출됨.");
    return "hello";
  }

  // 2-5
  componentDidUpdate() {
    console.log("componentDidUpdate 호출됨.");
  }

  // 3-1
  componentWillUnmount() {
    console.log("componentWillUnmount 호출됨.");
  }
}

ClickMe.propTypes = {
  level: PropTypes.number,
};

class Parent extends Component {
  render() {
    return (
      <div>
        <h1>03 클래스 컴포넌트 - 컴포넌트의 라이프 사이클</h1>
        <ClickMe level={2} />
      </div>
    );
  }
}

export default Parent;
