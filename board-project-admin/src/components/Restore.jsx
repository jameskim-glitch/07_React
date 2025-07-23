import React, { useEffect, useState } from "react";
import { axiosApi } from "../api/axiosAPI";

// Restore 컴포넌트: 탈퇴 회원 및 삭제 게시글 복구 기능을 담당
export default function Restore() {
  const [withdrawMembers, setWithdrawMembers] = useState(null); // 탈퇴 회원 목록
  const [deleteBoards, setDeleteBoards] = useState(null); // 삭제 게시글 목록
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // 상태값 설명:
  // null   -> 서버 응답 전
  // []     -> 응답 받았으나 데이터 없음
  // [data] -> 응답 받았고 데이터 있음

  // 탈퇴한 회원 목록 조회 함수
  const getWithdrawnMemberList = async () => {
    try {
      const resp = await axiosApi.get("/admin/withdrawnMemberList");
      if (resp.status === 200) setWithdrawMembers(resp.data);
    } catch (error) {
      console.log("탈퇴 회원 목록 조회 중 에러 :", error);
    }
  };

  // 탈퇴 회원 복구 요청 함수
  const restoreMember = async (member) => {
    if (
      window.confirm(member.memberNickname + "님을 탈퇴 복구 시키겠습니까?")
    ) {
      try {
        const resp = await axiosApi.put("/admin/restoreMember", {
          memberNo: member.memberNo,
        });
        if (resp.status === 200) {
          alert("복구 되었습니다!");
          getWithdrawnMemberList(); // 변경된 데이터 다시 불러오기
        }
      } catch (error) {
        console.log("복구 중 에러 :", error);
      }
    }
  };

  // 삭제된 게시글 목록 조회 함수
  const getDeleteBoardList = async () => {
    try {
      const resp = await axiosApi.get("/admin/deleteBoardList");
      if (resp.status === 200) setDeleteBoards(resp.data);
    } catch (error) {
      console.log("삭제된 게시글 목록 조회 중 에러 :", error);
    }
  };

  // 삭제 게시글 복구 요청 함수
  const restoreBoard = async (board) => {
    if (window.confirm(board.boardNo + "번 게시글을 복구 시키겠습니까?")) {
      try {
        const resp = await axiosApi.put("/admin/restoreBoard", {
          boardNo: board.boardNo,
        });
        if (resp.status === 200) {
          alert("복구 되었습니다!");
          getDeleteBoardList(); // 변경된 데이터 다시 불러오기
        }
      } catch (error) {
        console.log("게시글 복구 에러 :", error);
      }
    }
  };

  // 컴포넌트 첫 렌더링 시 목록 조회
  useEffect(() => {
    getWithdrawnMemberList();
    getDeleteBoardList();
  }, []);

  // 응답 완료 시 로딩 상태 해제
  useEffect(() => {
    if (withdrawMembers !== null && deleteBoards !== null) {
      setIsLoading(false);
    }
  }, [withdrawMembers, deleteBoards]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="menu-box">
      <RestoreMember
        withdrawMembers={withdrawMembers}
        restoreMember={restoreMember}
      />
      <RestoreBoard deleteBoards={deleteBoards} restoreBoard={restoreBoard} />
    </div>
  );
}

// 탈퇴 회원 복구 UI 컴포넌트
const RestoreMember = ({ withdrawMembers, restoreMember }) => (
  <section className="section-border">
    <h2>탈퇴 회원 복구</h2>
    <h3>탈퇴한 회원 목록</h3>
    {withdrawMembers.length === 0 ? (
      <p>탈퇴한 회원이 없습니다</p>
    ) : (
      withdrawMembers.map((member, index) => (
        <ul className="ul-board" key={index}>
          <li>회원 번호 : {member.memberNo}</li>
          <li>회원 이메일 : {member.memberEmail}</li>
          <li>회원 닉네임 : {member.memberNickname}</li>
          <button className="restoreBtn" onClick={() => restoreMember(member)}>
            복구
          </button>
        </ul>
      ))
    )}
  </section>
);

// 삭제 게시글 복구 UI 컴포넌트
const RestoreBoard = ({ deleteBoards, restoreBoard }) => (
  <section className="section-border">
    <h2>삭제 게시글 복구</h2>
    <h3>삭제된 게시글 목록</h3>
    {deleteBoards.length === 0 ? (
      <p>삭제된 게시글이 없습니다</p>
    ) : (
      deleteBoards.map((board, index) => (
        <ul className="ul-board" key={index}>
          <li>게시글 번호 : {board.boardNo}</li>
          <li>게시글 카테고리명 : {board.boardName}</li>
          <li>게시글 제목 : {board.boardTitle}</li>
          <li>작성자 이름 : {board.memberNickname}</li>
          <button className="restoreBtn" onClick={() => restoreBoard(board)}>
            복구
          </button>
        </ul>
      ))
    )}
  </section>
);
