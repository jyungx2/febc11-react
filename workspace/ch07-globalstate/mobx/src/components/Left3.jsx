import { useEffect } from "react";
import counterStore from "@mobx/counterStore";
import { observer } from "mobx-react-lite";

// 스토어의 상태 변경 여부를 감시해서 상태가 변경될 때 리렌더링을 하도록
// mobx-react-lite 라이브러리부터 observer()을 사용해야 함
const Left3 = observer(function Left3() {
  useEffect(() => {
    console.log("      # Left3 렌더링.");
  });

  return (
    <div>
      <h3>Left3</h3>
      <span>{counterStore.count}</span>
    </div>
  );
});

export default Left3;

// 전역 상태 관리를 위해 이러한 리덕스와 같은 라이브러리를 사용하는 이유:
// 저기 저 멀리(증조할아버지급)있는 부모 컴포넌트로부터 받아서 상태값을 관리하고 저장하고 싶은데,
// 그럴려면 그 사이에 있는 모든 컴포넌트를 거쳐서(prop drilling) useState()를 사용해야 한다.
// 이렇게 되면 해당 상태값이 거쳐간 모든 컴포넌트들이 쓰지도 않는데, 걔네들까지 불필요하게 리렌더링이 되는 현상 발생! -> 이런 현상을 막기 위해 리덕스(+리덕스 툴킷)/리코일/jotai/mobX(=>2세대 툴로, Context API를 활용해 리덕스/리코일보다 간단하게 상태관리 가능) 등등을 사용...
// 하지만 아직도 규모가 큰 프로젝트에서는 리덕스를 많이 쓴다.
