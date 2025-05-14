import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import { getStringedDate } from "../util/get-stringed-date";
import usePageTitle from "../hooks/usePageTitle";

const Diary = () => {
  const params = useParams();
  const nav = useNavigate();
  const [curDiaryItem, setCurDiaryItem] = useState(null);

  usePageTitle(`${params.id}번 일기`);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const res = await axios.get(`/diaries/${params.id}`);
        setCurDiaryItem(res.data);
      } catch (err) {
        alert("❌ 해당 일기를 불러올 수 없습니다.");
        nav("/", { replace: true });
      }
    };

    fetchDiary();
  }, [params.id, nav]);

  if (!curDiaryItem) {
    return <div>📦 데이터 로딩중...</div>;
  }

  const { date, emotion, content } = curDiaryItem;
  const title = getStringedDate(new Date(date));

  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
        rightChild={<Button onClick={() => nav(`/edit/${params.id}`)} text={"수정하기"} />}
      />
      <Viewer emotion={emotion} content={content} />
    </div>
  );
};

export default Diary;
