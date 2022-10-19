import styled from "@emotion/styled";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <RowUl>
          <li>
            <Link to="/">로그인 회원가입 페이지</Link>
          </li>
          <li>
            <Link to="/todo">TodoList 페이지</Link>
          </li>
        </RowUl>
      </nav>
      <Outlet />
    </div>
  );
};

const RowUl = styled.ul`
  display: flex;
  list-style: none;

  & > li {
    margin-right: 10px;
  }
`;

export default Layout;
