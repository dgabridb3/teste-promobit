import "./index.css";
import LogoImg from "./img.svg";
import { useNavigate } from "react-router-dom";
import { goToHome } from "../../route/Coordinator";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <section className="section-header">
      <div className="header">
        <img src={LogoImg} alt="logo" onClick={() => goToHome(navigate)} />
      </div>
    </section>
  );
};
