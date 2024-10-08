import multer from "multer";

// 메모리 저장소 설정
const storage = multer.memoryStorage();

// multer 미들웨어 설정 (메모리 저장소 사용)
export const FileMiddleWare = multer({ 
  storage: storage 
  ,fileFilter: (req, file, cb) => {
    // 파일명이 UTF-8로 인코딩되었는지 확인
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, true);
  }
});