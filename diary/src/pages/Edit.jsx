import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import usePageTitle from "../hooks/usePageTitle";
import { useEffect, useState } from "react";
import { updateDiary } from "../api/diaryAPI";
import axios from "axios";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const [curDiaryItem, setCurDiaryItem] = useState(null);
  usePageTitle(`${params.id}번 일기 수정`);

  // ✅ 일기 불러오기
  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const res = await axios.get(`/diaries/${params.id}`);
        setCurDiaryItem(res.data);
      } catch (err) {
        alert("해당 일기를 불러올 수 없습니다.");
        nav("/", { replace: true });
      }
    };

    fetchDiary();
  }, [params.id, nav]);

  // ✅ 삭제 처리
  const onClickDelete = async () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      try {
        await axios.delete(`/diaries/${params.id}`);
        nav("/", { replace: true });
      } catch (err) {
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  // ✅ 수정 처리
  const onSubmit = async (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      try {
        const updatedData = {
          id: Number(params.id),
          date: input.createdDate.toISOString().split("T")[0],
          emotion: input.emotionId,
          content: input.content,
        };

        console.log("🛠️ 수정 요청 실행됨:", updatedData);

        await updateDiary(params.id, updatedData); // ✅ API 파일 사용

        nav("/", { replace: true });
      } catch (err) {
        alert("수정 중 오류가 발생했습니다.");
        console.error("❌ 수정 요청 실패:", err);
      }
    }
  };


  if (!curDiaryItem) {
    return <div>📦 데이터 로딩중...</div>;
  }

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
