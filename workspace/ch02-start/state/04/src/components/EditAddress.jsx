import { Fragment } from "react";

export default function EditAddress({ addressBook, handleAddressChange }) {
  const list = addressBook.map((address) => {
    return (
      // 이 컴포넌트를 담는 요소가 무조건 <p>이어야 하는 상황일 때, <p>안에는 <div> 쓰지 못하기 때문에 바로 이때 fragment 태그를 써야한다! 단, <>라고만 쓰면 Key 속성을 못쓰기 때문에 Fragment를 명시하여 Key속성까지 같이 쓰일 수 있게..
      <Fragment key={address.id}>
        {/* JS 루프인 for문과 겹치기 때문에 for -> htmlFor를 써야 한다. */}
        <label htmlFor={address.id}>{address.name}</label>
        <input
          id={address.id}
          type="text"
          name={address.name}
          value={address.value}
          onChange={handleAddressChange}
        />
        <br />
      </Fragment>
    );
  });

  return list;
}
