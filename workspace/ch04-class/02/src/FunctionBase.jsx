// 🔑 컴포넌트를 만드는 두가지 방법: 클래스형 vs 함수형
// 함수형은 보시다피시 클래스형 컴포넌트보다 훨씬 간단하다! (this, props 키워드 고려할 필요성 없다)
// 초창기에는 클래스형 컴포넌트를 많이 사용했지만, 요즘에는 함수형이 거의 주로 쓰인다.
// >> 16.8 버전이 들어오면서 클래스형에서만 쓸 수 있었던 상태관리툴(hook) 또한 함수형에서 쓸수 있게 되면서 요즘엔 거의 함수형만 쓰인다.

// import { Component } from "react";
import PropTypes from "prop-types";

function ClickMe({ level }) {
  const [count, setCount] = useState(level || 1);
  // state = { count: 0 };
  //  constructor(props) {
  //   super(props);
  //   this.state = { count: props.level || 1 };
  // }

  const handleClick = () => {
    setCount(count + (level || 1));
  };
  // handleClick = () => {
  //   this.setState({ count: this.state.count + (this.props.level || 1) });
  // };

  return (
    <div>
      클릭 횟수 X {level || 1} : {count}
      <button onClick={handleClick}>클릭</button>
    </div>
  );

  //   render() {
  //   return (
  //     <div>
  //       클릭 횟수 X {this.props.level || 1}: {this.state.count}
  //       <button onClick={this.handleClick}>클릭</button>
  //     </div>
  //   );
  // }
}

ClickMe.propTypes = {
  level: PropTypes.number,
};

function Parent() {
  return (
    <div>
      <h1>02 클래스 컴포넌트 - 함수 컴포넌트와 같이 사용</h1>
      <ClickMe level={2} />
      <ClickMe level={5} />
      <ClickMe />
    </div>
  );
}

export default Parent;
