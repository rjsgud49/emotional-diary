import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({ data }) => { // ✅ props로 data 받기
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    const sorted = [...data].sort((a, b) => {
      const dateA = new Date(a.date + "T00:00:00").getTime();
      const dateB = new Date(b.date + "T00:00:00").getTime();

      return sortType === "oldest" ? dateA - dateB : dateB - dateA;
    });

    return sorted;
  };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select value={sortType} onChange={onChangeSortType}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된 순</option>
        </select>
        <Button
          onClick={() => nav("/new")}
          text={"새 일기 쓰기"}
          type={"POSITIVE"}
        />
      </div>
      <div className="list_wrapper">
        {sortedData.length === 0 ? (
          <p>해당 월의 일기가 없습니다.</p>
        ) : (
            sortedData.map((item) => (
              <DiaryItem
                key={item.id}
                id={item.id}
                emotion={item.emotion}
                createdDate={item.date + "T00:00:00"} // ✅ 안전한 포맷
                content={item.content}
              />
            ))

        )}
      </div>
    </div>
  );
};

export default DiaryList;
