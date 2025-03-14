# pokepedia

포켓몬 백과사전

## url

https://pokepedia-kr.netlify.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/cfad446b-94a6-476a-83e9-c9e74f0cbcba/deploy-status)](https://app.netlify.com/sites/pokepedia-kr/deploys)

## 구현 목적

포켓몬을 좋아하는 사용자들에게 포켓몬을 백과사전처럼 볼 수 있도록 하는 것
또한 속성별로 모아서 볼 수 있는 기능 제공

## 구현 목표

### 필수 구현

(work started at 24.03.26 15:00 ~)

- 포켓몬 목록 조회 [complete - 24.03.26 23:38]

  - api: https://pokeapi.co/api/v2/pokemon/
  - 필수 구현: 썸네일, 이름
  - 추가 구현: 추가 조회(페이지네이션), 번호, 속성, 지역 등

- 포켓몬 상세 조회 [complete - 24.03.27 14:02]

  - api: https://pokeapi.co/api/v2/pokemon/{:id or :name}
  - 필수 구현: 썸네일, 이름, 간단한 설명
  - 추가 구현: 능력, 스텟(프로그래스), 행동(아코디언, 테이블) 등

### 추가 구현

- 속성 검색 기능 [complete - 24.03.27 18:27]

  - api:
    - https://pokeapi.co/api/v2/type/
    - https://pokeapi.co/api/v2/type/{:name}
  - 구현:
    - 특정 속성을 클릭해서 해당 속성에 해당하는 포켓몬들을 모아서 볼 수 있도록 하는 기능
    - 해당 속성의 강타입, 약타입 관계 확인 가능
      - 존재하지 않으면 없음 표시
    - 해당 속성의 포켓몬 수 확인 가능

- 포켓몬 상세 조회 시 종족, 진화 연쇄를 시각적으로 확인 가능 [complete - 24.03.29 14:34]

  - api:
    - https://pokeapi.co/api/v2/pokemon-species/{:id or :name}
    - https://pokeapi.co/api/v2/evolution-chain/{:id}

- 포켓몬 상세 조회 시 마주칠 수 있는 지역 확인 가능 [complete - 24.03.31 09:56]

  - api:
    - https://pokeapi.co/api/v2/pokemon/{:id or :name}/encounters

- 포켓몬 이름 검색 가능 [complete - 24.04.01 18:46]

  - api:
    - https://pokeapi.co/api/v2/pokemon/
  - auto complete search box를 추가하여 포켓몬 이름 검색으로 상세 조회

- 페이지네이션 숫자 입력 이동, 현재 페이지 노출, 페이지 뷰 개수 수정 기능

## 사용 기술

- 프레임워크: Nextjs - "next": "14.1.4"
- 스타일:
  - UI/UX: Material UI (MUI v5) - "@mui/material": "^5.15.14"
  - 폰트: Pretendard - cdn web font
- 프로젝트 관리
  - Github
- 배포
  - Netlify
- 참조 API
  - Pokemon API (https://pokeapi.co/docs/v2)

## 라우터 구조

- 목록 페이지: `/`, `/?page=2`
- 상세 페이지: `/pokemon/[name]`
- 속성 필터 페이지: ` /type`, `/type/[type] `

## 요구사항

### [목록페이지]

- 목표
  - 특정 집단 군의 다수 자료를 나열
  - 레이아웃의 형태는 자유 (Grid, Table, List 등등)
- 기능
  - 목록 표시
    - 항목 구성 (\*은 필수)
      - \*썸네일
      - \*이름 (제목)
      - 간략한 설명
    - 페이지네이션: 일정 단위로 자료 집단을 표시 및 추가로 조회
      - 구현 방식은 자유 (하단 예시, 예시 외 기타 방식도 허용)
        - ‘네비게이션’ 혹은 ‘페이지 번호’를 통한 직접 조회
        - ‘추가 불러오기’ 를 통해 다음 집단을 추가 조회
        - 사용자의 스크롤을 추적하여 나열된 목록의 끝에 도달시 추가 조회
        - 목록의 항목 선택시 [상세페이지] 로 이동 및 상세정보 표시

### [상세페이지]

- 목표
  - 이전 [목록페이지] 에서 선택한 항목의 상세정보를 표시
- 기능
  - 상세정보 표시 (\*은 필수)
    - \*썸네일
    - \*이름 (제목)
    - \*간략한 설명
    - 기타 메타정보
  - 별도의 url 주소를 통해서 특정 정보에 직접 접근 하도록 라우팅
