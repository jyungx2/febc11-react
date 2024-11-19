import { useState } from "react";
import EditAddress from "./components/EditAddress";
import { produce } from "immer";

function App() {
  const [user, setUser] = useState({
    _id: 4,
    email: "u1@market.com",
    name: "데이지",
    phone: "01044445555",
    address: "서울시 강남구 논현동 222",
    type: "user",
    createdAt: "2024.01.25 21:08:14",
    updatedAt: "2024.02.04 09:38:14",
    extra: {
      birthday: "11-30",
      membershipClass: "MC02",
      addressBook: [
        {
          id: 1,
          name: "회사",
          value: "서울시 강동구 천호동 123",
        },
        {
          id: 2,
          name: "집",
          value: "서울시 강동구 성내동 234",
        },
      ],
    },
  });

  const handleAddressChange = (event) => {
    /*
    // 💥상태의 불변성이 지켜지지 않음💥
    const address = user.extra.addressBook.find(
      (address) => address.id === Number(event.target.name)
    );
    address.value = event.target.value;
    // const newState = { ...user }; // 새로운 메모리 주소를 가지는 객체로 업데이트 해야 함! -> 하지만 이 경우는 user만 복사했으므로, 얕은 복사🗯️
    // setUser(newState); // 리액트가 가상 돔과 진짜 돔을 비교할 때, 여전히 같은 메모리 주소이므로 리렌더링x
    // 깊은 복사를 위해...
    // ✅ extra 객체도 새로 만들어줘야 함!! (처음에 밑에서 2번째 줄이 true로 나온 이유)
    // ✅ addressbook 배열도 새로 만들어줘야 함!! (밑에서 3번째줄이 true로 나온 이유)
    */

    // ✅ 상태의 불변성을 지키기 위해 복잡한 추가 작업 필요
    // 👉 그마나 주소를 바꾼다는 전제이기 때문에 덜 복잡
    /*
    const newAddressBook = user.extra.addressBook.map((address) => {
      if (address.id === Number(event.target.name)) {
        return { ...address, value: event.target.value };
      }
      return address;
    });

    const newState = {
      ...user,
      exrta: {
        ...user.extra,
        addressBook: newAddressBook,
      },
    };
    setUser(newState);
    */

    // ✅ immer를 사용해서 불변성 유지
    // 리액트 아니었다면 했을 작업을 할 수 있게 하는 라이브러리!
    // 직접 해당 속성에 접근하여 특정 조건 하에 value값을 변경한 후, setter 함수로 리렌더링
    // draft = user 복사본 - User와 아예 다른 메모리주소를 가지는 객체들을 가지고 있다고 판단하여 우리가 수정하고 싶은 address에 접근하여 직접적으로 변경&리렌더링 가능케 함!
    // user 내부의 모든 객체가 새로운 객체로 복사된 게 아닌(=전체적 깊은 복사), immer 라이브러리가 수정하고자 하는 객체의 부모에 해당하는 객체들을 모두 새롭게 복사하여 바꿔치기
    // --> ✨선택적 깊은 복사✨
    // 바뀐 라인만 교체하고, 안바뀐 객체는 그대로 원본 주소를 참조함, 모든 객체를 다 복사해서 새롭게 교체하는게 아님...
    // 메모리가 2배로 늘어나고, 시간도 오래 걸리기 때문에 딱 바꾸고싶은 것만 타겟팅해서 복사한 후, 고 수정된 요소만 리렌더링하는 게 훨씬 효율적이기 때문에 좋은 방법!!
    const newState = produce(user, (draft) => {
      const address = draft.extra.addressBook.find(
        (address) => address.id === Number(event.target.name)
      );
      address.value = event.target.value;
      console.log(user, draft);
    });
    setUser(newState);

    // 회사 주소가 변경될 경우
    console.log("user", user === newState); // false
    console.log("user.extra", user.extra === newState.extra); // false
    console.log(
      "user.extra.addressBook",
      user.extra.addressBook === newState.extra.addressBook
    ); // false
    console.log(
      "회사",
      user.extra.addressBook[0] === newState.extra.addressBook[0]
    ); // false
    console.log(
      "집",
      user.extra.addressBook[1] === newState.extra.addressBook[1]
    ); // true (집주소는 안 바꿀 것이므로 굳이 False가 아니어도 괜춘)
    console.log(
      "회사 주소",
      user.extra.addressBook[0].value === newState.extra.addressBook[0].value
    ); // false
    console.log(
      "집 주소",
      user.extra.addressBook[1].value === newState.extra.addressBook[1].value
    ); // true
    console.log("기존 회사 주소", user.extra.addressBook[0].value);
  };

  return (
    <>
      <h2>04 상태관리 대상이 복합 객체일 경우 불변성 관리</h2>
      <p>
        이메일: {user.email} <br />
        이름: {user.name} <br />
        전화번호: {user.phone}
        <br />
      </p>

      <ul>
        {user.extra.addressBook?.map((address) => (
          <li key={address.id}>
            {address.name}: {address.value}
          </li>
        ))}
      </ul>

      <p>
        <EditAddress
          addressBook={user.extra.addressBook}
          handleAddressChange={handleAddressChange}
        />
      </p>
    </>
  );
}

export default App;
