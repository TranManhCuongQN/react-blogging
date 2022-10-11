import React from "react";
import styled, { css } from "styled-components";
import LoadingSpinner from "../loading/LoadingSpinner";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  height: ${(props) => props.height || "66px"};
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.bg === "secondary" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: white;
    `};

  ${(props) =>
    props.bg === "primary" &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `};

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  bg = "primary",
  ...props
}) => {
  const { isLoading, to } = props;
  // !! convert giá trị thành boolean (string,number,... nó convert sang boolean)
  // Nếu mà là true thì nó sẽ hiện ra loading còn ngược lại nếu không phải loading thì hiện ra children
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to} style={{ display: "inline-block" }}>
        <ButtonStyles type={type} {...props} bg={bg}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles type={type} onClick={onClick} {...props} bg={bg}>
      {child}
    </ButtonStyles>
  );
};

// Khi sử dụng propTypes thì component của chúng ta sẽ tương minh hơn ta biết những props truyền vào là gì kiểu dữ liệu là gì và có bắt buộc hay không
Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  bg: PropTypes.oneOf(["primary", "secondary"]),
};

export default Button;
