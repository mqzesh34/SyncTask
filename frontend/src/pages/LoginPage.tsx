import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { type UserCredentials } from "../types.d";
import axios from "axios";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<UserCredentials>({
    email: "",
    password: "",
  } as UserCredentials);

  const [error, setError] = useState<string | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await login(formData);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data.message || "Giriş başarısız oldu, ağ hatası."
        );
      } else {
        setError("Beklenmedik bir ağ hatası oluştu.");
      }
    }
  };

  useEffect(() => {
    if (error) {
      setIsToastVisible(true);

      const timer = setTimeout(() => {
        setIsToastVisible(false);
        setTimeout(() => {
          setError(null);
        }, 300);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div
      className="flex w-screen h-screen font-sans"
      style={{ backgroundColor: "rgba(247, 225, 168, 1)" }}
    >
      <div className="fixed top-4 right-4 z-50 pointer-events-none">
        {error && (
          <div
            className={`transform transition-transform duration-300 ${
              isToastVisible ? "translate-x-0" : "translate-x-full"
            } bg-red-600 border-2 border-gray-900 text-white p-4 rounded-lg shadow-2xl max-w-sm w-full pointer-events-auto`}
          >
            {error}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 flex-1 hidden lg:block rounded-r-4xl border-4 border-gray-900 p-6 overflow-hidden">
        <div className="h-full w-full flex items-center justify-center"></div>
      </div>

      <div className="flex justify-center items-center flex-1 p-4 w-full">
        <div className="flex w-full max-w-md flex-col items-center">
          <div className="w-11/12 p-8 rounded-xl bg-white border-4 border-gray-900 shadow-[10px_10px_0px_rgba(30,41,59,1)]">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
              Giriş Yap
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col ">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  E-posta Adresi:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="p-3 rounded-lg border-2 border-gray-900 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                  placeholder="e-posta@mail.com"
                />
              </div>

              <div className="flex flex-col ">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Şifre:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="p-3 rounded-lg border-2 border-gray-900 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="p-3 rounded-lg bg-orange-600 text-white font-extrabold text-lg mt-6 border-2 border-gray-900 hover:translate-y-[2px] transition-all"
              >
                Giriş Yap
              </button>
            </form>

            <p className="text-center text-sm text-gray-700 mt-6">
              Hesabın yok mu?{" "}
              <a
                onClick={() => navigate("/register")}
                className="cursor-pointer text-orange-600 hover:text-orange-700 font-bold underline transition"
              >
                Kayıt Ol
              </a>
            </p>
          </div>

          <div className="text-gray-900 text-3xl sm:text-4xl text-center mt-10">
            <p className="text-sm italic">my grandma still play bingo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
