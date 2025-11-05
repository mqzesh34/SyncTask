import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { type UserCredentials } from "../types.d";
import axios from "axios";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserCredentials>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password
    ) {
      setError("Tüm zorunlu alanları doldurunuz.");
      return;
    }

    try {
      await register(formData);
      setSuccess("Kayıt işlemi başarılı! Şimdi giriş yapabilirsiniz.");
      setFormData({ first_name: "", last_name: "", email: "", password: "" });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Kayıt sırasında hata oluştu.");
      } else {
        setError("Beklenmedik bir ağ bağlantısı hatası oluştu.");
      }
    }
  };

  useEffect(() => {
    if (success || error) {
      setIsToastVisible(true);

      const timer = setTimeout(() => {
        setIsToastVisible(false);
        setTimeout(() => {
          setSuccess(null);
          setError(null);
        }, 300);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const messageType = success ? "success" : error ? "error" : null;

  return (
    <div
      className="flex w-screen h-screen font-sans"
      style={{ backgroundColor: "rgba(247, 225, 168, 1)" }}
    >
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 flex-1 hidden lg:block rounded-r-4xl border-4 border-gray-900 p-6 overflow-hidden">
        <div className="h-full w-full flex items-center justify-center"></div>
      </div>

      <div className="fixed top-4 right-4 z-50 pointer-events-none">
        <div
          className={`transform transition-transform duration-300 ${
            isToastVisible ? "translate-x-0" : "translate-x-full"
          } ${messageType ? "pointer-events-auto" : ""} max-w-sm w-full`}
        >
          {messageType === "success" && success && (
            <div className="bg-green-600 border-2 border-gray-900 text-white p-4 rounded-lg shadow-2xl">
              {success}
            </div>
          )}
          {messageType === "error" && error && (
            <div className="bg-red-600 border-2 border-gray-900 text-white p-4 rounded-lg shadow-2xl">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center flex-1 p-4 w-full">
        <div className="flex w-full max-w-md flex-col items-center">
          <div className="w-11/12 p-8 rounded-xl bg-white border-4 border-gray-900 shadow-[10px_10px_0px_rgba(30,41,59,1)]">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
              Yeni Hesap Oluştur
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Ad:
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="p-3 w-full rounded-lg border-2 border-gray-900 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                    placeholder="Adınız"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Soyad:
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="p-3 w-full rounded-lg border-2 border-gray-900 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                    placeholder="Soyadınız"
                  />
                </div>
              </div>

              <div>
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
                  className="p-3 w-full rounded-lg border-2 border-gray-900 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                  placeholder="e-posta@mail.com"
                />
              </div>

              <div>
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
                  className="p-3 w-full rounded-lg border-2 border-gray-900 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="p-3 w-full rounded-lg bg-orange-600 text-white font-extrabold text-lg mt-6 border-2 border-gray-900 hover:translate-y-[2px] transition-all"
              >
                Kayıt Ol
              </button>
            </form>

            <p className="text-center text-sm text-gray-700 mt-6">
              Zaten hesabın var mı?{" "}
              <a
                onClick={() => navigate("/login")}
                className="cursor-pointer text-orange-600 hover:text-orange-700 font-bold underline transition"
              >
                Giriş Yap
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

export default RegisterPage;
