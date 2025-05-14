import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000', // Nest 백엔드 주소
});

// 전체 일기 조회
export const fetchDiaries = async () => {
    const res = await API.get('/diaries');
    return res.data;
};

// 일기 생성
export const createDiary = async (diary) => {
    const res = await API.post('/diaries', diary);
    return res.data;
};

// 일기 수정
export const updateDiary = async (id, diary) => {
    const res = await API.put(`/diaries/${id}`, diary);
    return res.data;
};

// 일기 삭제
export const deleteDiary = async (id) => {
    const res = await API.delete(`/diaries/${id}`);
    return res.data;
};
