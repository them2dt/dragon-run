import logo from "../assets/logo.png";
export default function Home() {
  return (
    <div className="home">
      <div className="home-title">
        <img src={logo} alt="logo" />
      </div>
      <div className="home-buttons">
        <button className="home-button">Play</button>
      </div>
    </div>
  );
}
