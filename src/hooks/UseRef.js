import React , { useRef } from "react";

function UseRef() {
    const inputEl = useRef();
    const onButtonClick = () => {
      // `current` 指向已挂载到 DOM 上的文本输入元素
      console.log(inputEl.current.value);
    };
    return (
      <>
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Focus the input</button>
      </>
    );
}
export default UseRef