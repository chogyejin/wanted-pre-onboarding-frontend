import { useEffect, useState } from "react";

const useValidation = (values: { email: string; password: string }) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (values.email.includes("@") && values.password.length >= 8) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [values.email, values.password]);

  return [isValid];
};

export default useValidation;
