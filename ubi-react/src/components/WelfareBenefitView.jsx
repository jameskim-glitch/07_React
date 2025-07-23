const WelfareBenefitView = ({ district, benefits }) => {
  const cleanDistrict = district?.trim().normalize("NFC");
  const list = benefits[cleanDistrict];

  console.log("🔍 선택된 지자체명:", cleanDistrict);
  console.log("🧾 해당 지자체 복지 데이터:", list);
  console.log("📦 전체 benefitsData keys:", Object.keys(benefits));

  if (!list) return <p>해당 지역의 복지혜택 데이터가 없습니다.</p>;

  return (
    <div>
      <h3>{cleanDistrict} 복지 혜택 목록</h3>
      <ul>
        {list.map((item) => (
          <li key={item.servId}>
            <strong>{item.servNm}</strong> ({item.intrsThemaNmArray}) -{" "}
            {item.servDgst}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WelfareBenefitView;
