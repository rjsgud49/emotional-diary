import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const [curDiaryItem, setCurDiaryItem] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const res = await axios.get(`/api/diary/${id}`);
        setCurDiaryItem(res.data);
      } catch (err) {
        alert("존재하지 않는 일기입니다.");
        nav("/", { replace: true });
      }
    };

    if (id) {
      fetchDiary();
    }
  }, [id]);

  return curDiaryItem;
};

export default useDiary;
