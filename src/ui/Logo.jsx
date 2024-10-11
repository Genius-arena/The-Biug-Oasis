import styled from "styled-components";
import logo_light from "../data/img/logo-light.png";
import logo_dark from "../data/img/logo-dark.png";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? logo_light : logo_dark;

  return (
    <StyledLogo>
      <Img src={src} alt="Logoo" />
    </StyledLogo>
  );
}

export default Logo;
