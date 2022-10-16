import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TOKEN_KEY = "auth-token";

const usePath = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      navigate("/todo");
    } else {
      navigate("/");
    }
  }, [navigate]);
};

export default usePath;
