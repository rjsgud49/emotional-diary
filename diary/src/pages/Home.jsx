import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import usePageTitle from "../hooks/usePageTitle";

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1
  ).getTime();

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter((item) => {
    const created = new Date(item.date).getTime(); // ✅ 여기 고쳤음!
    return beginTime <= created && created <= endTime;
  });
};


const Home = () => {
  const [diaries, setDiaries] = useState([]);
  const [pivotDate, setPivotDate] = useState(new Date());

  usePageTitle("감정 일기장");

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const res = await axios.get("/diaries"); // ⚠️ baseURL 확인 필요
        console.log("📦 받아온 일기 데이터:", res.data); // ✅ 로그 추가
        setDiaries(res.data);
      } catch (error) {
        console.error("❌ 일기 데이터 불러오기 실패:", error);
      }
    };

    fetchDiaries();
  }, []);

  const monthlyData = getMonthlyData(pivotDate, diaries);
  console.log("🗓️ 현재 월:", pivotDate);
  console.log("📅 월별 필터링 결과:", monthlyData);

  const onIncreaseMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1)
    );
  };

  const onDecreaseMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1)
    );
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
