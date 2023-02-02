# 가져올 이미지 정의
FROM node:alpine

ENV NODE_VERSION 18.13.0

# 경로 설정
WORKDIR /app

# package.json 워킹 디렉토리에 복사
COPY ./package* /app

# 명령어 실행 (의존성 설치)
RUN npm install

# 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사
COPY . .

EXPOSE 3000

CMD ["npm", "start"]