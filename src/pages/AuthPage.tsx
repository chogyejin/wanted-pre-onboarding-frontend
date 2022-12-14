import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePath from "../hooks/usePath";
import useValidation from "../hooks/useValidation";
import { requestSignin, requestSignup } from "../lib/apis";
import { setToken } from "../lib/localStorage";

const Auth = () => {
  usePath();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isValid] = useValidation(values);
  const [isSigninForm, setIsSigninForm] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSigninForm) {
      const response = await requestSignin(values);

      if (response.status === 200) {
        setToken(response.data.access_token);
        navigate("/todo");
      } else {
        alert("로그인에 실패했어요");
      }
    } else {
      const response = await requestSignup(values);

      if (response.status === 201) {
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
        <button type="submit" disabled={!isValid}>
          {isSigninForm ? "로그인" : "회원가입"}
        </button>
      </form>
      <button type="button" onClick={toggleButton}>
        {isSigninForm ? "회원가입 버튼으로" : "로그인 버튼으로"}
      </button>
    </div>
  );
};

export default Auth;
