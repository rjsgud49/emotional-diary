import "./Viewer.css";
import { getEmotionImage } from "../util/get-emotion-image";
import { emotionList } from "../util/constants";

const Viewer = ({ emotion, content }) => {
  const emotionId = Number(emotion);
  const emotionItem = emotionList.find(
    (item) => item.emotionId === emotionId
  );

  // 진단용 로그
  console.log("emotionId:", emotionId);
  console.log("emotionItem:", emotionItem);

  if (!emotionItem) {
    return (
      <div className="Viewer">
        <p>❗ 감정 정보가 잘못되었습니다 (emotionId: {emotionId})</p>
        <p>일기 내용: {content}</p>
      </div>
    );
  }

  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>오늘의 감정</h4>
        <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
          <img
            src={getEmotionImage(emotionId)}
            alt={emotionItem.emotionName}
          />
          <div>{emotionItem.emotionName}</div>
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
