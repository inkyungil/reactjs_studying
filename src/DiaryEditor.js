import React, { useRef, useState } from "react";

const DiaryEditor = ({ onCreate }) => {
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    //console.log(state);

    if (state.author.length < 1) {
      //alert("작성자는 최소1 글자 이상 입력해주세요");
      authorInput.current.focus();
      //focus
      return;
    }

    if (state.content.length < 5) {
      alert("일기 본문은 최소 5자리 글자 이상 입력해주세요");
      contentInput.current.focus();
      //focus

      return;
    }
    onCreate(state.author, state.content, state.emotion);

    alert("저장성공하기");

    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  //const [author, setAuthor] = useState("")
  //const [content, setContent] = useState("")

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          // onChange={(e)=> {
          //     setState({
          //         ...state,
          //         author:e.target.value,
          //         //content:state.content,

          //     })
          // } }

          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          value={state.content}
          name="content"
          // onChange={(e)=>{
          //     setState({
          //         ...state,
          //         content: e.target.value,
          //         //content: e.target.value,

          //     })
          // }}

          onChange={handleChangeState}
        ></textarea>
      </div>

      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
