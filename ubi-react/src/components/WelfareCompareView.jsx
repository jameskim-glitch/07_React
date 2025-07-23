const WelfareCompareView = ({ districtA, districtB, benefits, isLoading }) => {
  // ✅ 키 정제
  const cleanA = districtA?.trim().normalize("NFC");
  const cleanB = districtB?.trim().normalize("NFC");

  const listA = benefits[cleanA];
  const listB = benefits[cleanB];

  // ✅ 디버깅용 로그 (선택)
  console.log("🔍 비교 지자체 A:", `"${cleanA}"`);
  console.log("🔍 비교 지자체 B:", `"${cleanB}"`);
  console.log("📦 전체 benefits keys:", Object.keys(benefits));

  if (isLoading) return <p>복지 데이터를 불러오는 중입니다...</p>;

  if (!listA || !listB) {
    return <p>복지혜택 데이터가 부족하여 비교할 수 없습니다.</p>;
  }

  return (
    <div>
      <h3>
        {cleanA} vs {cleanB} 복지 혜택 비교
      </h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              {cleanA}
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              {cleanB}
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.max(listA.length, listB.length) }).map(
            (_, idx) => (
              <tr key={idx}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {listA[idx] ? (
                    <>
                      <strong>{listA[idx].servNm}</strong> <br />(
                      {listA[idx].intrsThemaNmArray}) - {listA[idx].servDgst}
                    </>
                  ) : (
                    "-"
                  )}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {listB[idx] ? (
                    <>
                      <strong>{listB[idx].servNm}</strong> <br />(
                      {listB[idx].intrsThemaNmArray}) - {listB[idx].servDgst}
                    </>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WelfareCompareView;
