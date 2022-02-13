import { useRef, useState } from "react";

const DiaryItem = ({
  onEdit,
  onRemove,
  id,
  author,
  content,
  emotion,
  created_date,
}) => {
  //수정인이 아닌지 상태를 저장하는 부분
  const [isEdit, setIsEdit] = useState(false);
  //토글 기능 구현 하기...반전 처리
  const toggleIsEdit = () => setIsEdit(!isEdit);

  // focus()
  const localContentInput = useRef();

  // 수정에서 사용
  const [localContent, setLocalContent] = useState(content);

  const handleRemove = () => {
    console.log(id);
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까??`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };
  return (
    <div className="DiaryItem">
      <div className="info">
        <span className="author_info">
          | 작성자 : {author} | 감정점수 : {emotion} |
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.valude)}
            ></textarea>
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
