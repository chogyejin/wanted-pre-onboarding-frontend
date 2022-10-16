import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { setToken } from "../lib/localStorage";

type Values = {
  [key: string]: string;
};

const Auth = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<Values>();
  const [isSigninForm, setIsSigninForm] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSigninForm) {
      const response = await axios.post<{ access_token: string }>(
        `/auth/signin`,
        values
      );

      if (response.status === 200) {
        console.log(response);
        alert("로그인 성공");
        navigate("/todo");
        setToken(response.data.access_token);
      } else {
        console.log(response);
        alert("로그인에 실패했어요");
      }
    } else {
      const response = await axios.post<{ access_token: string }>(
        `/auth/signup`,
        values
      );

      if (response.status === 201) {
        console.log(response);
        alert("회원가입 성공");
      } else {
        alert("다시 시도하세요");
      }
    }
  };

  const toggleButton = () => {
    setIsSigninForm((prev) => !prev);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요."
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          onChange={handleChange}
        />
        <button type="submit">{isSigninForm ? "로그인" : "회원가입"}</button>
      </form>
      <button type="button" onClick={toggleButton}>
        {isSigninForm ? "회원가입 버튼으로" : "로그인 버튼으로"}
      </button>
    </div>
  );
};

export default Auth;
