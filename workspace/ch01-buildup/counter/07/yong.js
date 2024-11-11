const yong = (() => {
  // 변수를 전역변수로 쓰지 않고, 외부에서 접근 가능하지 못하도록
  // 객체를 함수형태로 바꾼 것이고, 함수 자체를 변수로 정의할 필요없이 한번만 실행되면 되는 함수기 때문에 IIFE 형태의 함수로 만들고, 변수를 외부에서의 접근을 차단하기 위해 내부로 이동시킨다.
  // _ : 내부에서만 사용가능한 변수(외부에서 접근 못하는 변수라는 뜻의 개발자들의 암묵적인 룰..)
  let _root;
  let _stateValue;

  // 지정한 속성과 자식 노드를 가지는 요소 노드를 생성해서 반환
  // <button type="button" onclick="handleUp()">+</button>
  // createElement('button', { type: 'button', onclick: 'handleUp()' }, '+');
  const createElement = (tag, props, ...children) => {
    // 요소 노드 생성
    const elem = document.createElement(tag);

    // 속성 추가
    if (props) {
      for (const attrName in props) {
        const value = props[attrName];
        if (attrName.toLowerCase().startsWith("on")) {
          elem.addEventListener(attrName.toLowerCase().substring(2), value);
        } else {
          elem.setAttribute(attrName, value);
        }
        // elem.setAttribute(attrName, props[attrName]);
      }
    }

    // 자식 노드 추가
    for (let child of children) {
      if (typeof child === "string" || typeof child === "number") {
        child = document.createTextNode(child);
      } else if (typeof child === "function") {
        child = child();
      }
      elem.appendChild(child);
    }

    return elem;
  };

  const createRoot = (rootNode) => {
    let _appComponent;
    return (_root = {
      // 루트노드 하위에 지정한 함수를 실행해서 받은 컴포넌트를 렌더링 한다.
      render(appFn) {
        _appComponent = _appComponent || appFn; // _appComponent가 값이 존재하면 그냥 쓰고, falsy value면 appFn을 써라.💎
        // 최초로 Render()가 호출될 때만 appComponent = undefined => appFn으로 고정됨! 그 다음부터는 무조건 appFn으로 고정.
        if (rootNode.firstChild) {
          rootNode.firstChild.remove();
        }
        rootNode.appendChild(_appComponent());
      },
    });
  };
  // 그럼 appFn을 한번 불러오게 되면, 그 이후에는 다른

  // ✨상태값 관리
  // let [count, setCount] = Yong.useState(10);
  const useState = (initValue) => {
    // 최초에 한번만 initState 값으로 저장하고, useState가 다시 호출되면 initState는 무시하고 저장된 값을 사용
    // 💎 같은 코드
    if (_stateValue === undefined) {
      // 최초 useState가 호출됐을 때, 한 번만 실행 - undefined일 때는 최초에 한번이기 때문.
      _stateValue = initValue;
    }

    function setValue(newValue) {
      const oldValue = _stateValue; // 10
      _stateValue = newValue; // 11

      // 두 값이 같은지 비교해서 같지 않을 경우에(상태가 변경된 경우) 리렌더링한다.
      if (!Object.is(oldValue, newValue)) {
        _root.render();
      }
    }

    return [_stateValue, setValue];
  };

  return { createElement, createRoot, useState };
})();

export default yong;

// IIFE
(() => {})();
(function () {})();
