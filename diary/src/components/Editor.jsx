import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constants";
import { getStringedDate } from "../util/get-stringed-date";
import { createDiary } from "../api/diaryAPI";

const Editor = ({ initData, onSubmit, isEdit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });

  const nav = useNavigate();

  // ✅ 수정 모드일 경우 초기값 세팅
  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(initData.date || initData.createdDate), // date or timestamp
      });
    }
  }, [initData]);

  // ✅ 입력 변경 핸들링
  const onChangeInput = (e) => {
    let { name, value } = e.target;

    if (name === "createdDate") {
      value = new Date(value);
    }

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ 작성 또는 수정 버튼 클릭 처리
  const onSubmitButtonClick = async () => {
    const diaryData = {
      id: initData?.id,
      date: input.createdDate.toISOString().slice(0, 10),
      emotion: input.emotionId,
      content: input.content,
    };

    try {
      if (isEdit) {
        await onSubmit(diaryData); // ✅ 수정
        alert("일기 수정 완료!");
      } else {
        await createDiary(diaryData); // ✅ 작성
        alert("일기 작성 완료!");
      }

      nav("/");
    } catch (e) {
      console.error("일기 저장 실패", e);
      alert("저장에 실패했습니다.");
    }
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          onChange={onChangeInput}
          value={getStringedDate(input.createdDate)}
          type="date"
        />
      </section>

      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
            />
          ))}
        </div>
      </section>

      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>

      <section className="button_section">
        <Button onClick={() => nav(-1)} text={"취소하기"} />
        <Button
          onClick={onSubmitButtonClick}
          text={isEdit ? "수정완료" : "작성완료"}
          type={"POSITIVE"}
        />
      </section>
    </div>
  );
};

export default Editor;
