import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { type UserCredentials } from "../types.d";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const handleGitHubLogin = () => {
  alert("GitHub ile giriş yapılıyor...");
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<UserCredentials>({
    email: "",
    password: "",
  } as UserCredentials);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(
          err.response.data.message || "Giriş başarısız oldu, ağ hatası."
        );
      } else {
        toast.error("Beklenmedik bir ağ hatası oluştu.");
      }
    }
  };



  const dashboardItems = [
    { name: "Proje Alpha", w: "w-12", color: "bg-green-400" },
    { name: "Beta Launch", w: "w-8", color: "bg-blue-400" },
    { name: "UI Redesign", w: "w-4", color: "bg-orange-400" },
  ];

  const dashboardUsers = [
    { text: "B", color: "bg-green-100", textc: "text-green-600" },
    { text: "M", color: "bg-purple-100", textc: "text-purple-600" }, // O benim tatlim
    { text: "+2", color: "bg-gray-200", textc: "text-gray-600" },
  ];
  return (
    <div className="flex w-screen h-screen font-sans">


      <div className="flex-1 hidden lg:block rounded-r-4xl p-6 overflow-hidden bg-gray-50 border-r border-gray-200">
        <div className="h-full w-full flex items-center justify-center">
          <div className="lg:flex justify-center items-center hidden">
            <motion.div
              className="relative floating"
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="w-96 h-96 bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 
                   transform rotate-3 hover:rotate-0 transition-transform duration-500 hover-lift"
              >
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-400 rounded-2xl flex items-center justify-center">
                      <i className="ri-team-line text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Takım ilerlemesi
                      </h4>
                      <p className="text-sm text-gray-500">3 aktif proje</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {dashboardItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {item.name}
                        </span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div
                            className={`${item.w} h-2 ${item.color} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    {dashboardUsers.map((u, idx) => (
                      <div
                        key={idx}
                        className={`w-8 h-8 ${u.color} rounded-full flex items-center justify-center`}
                      >
                        <span className={`text-xs font-semibold ${u.textc}`}>
                          {u.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-400 rounded-2xl shadow-lg flex items-center justify-center transform -rotate-12 floating-delayed hover-lift"
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <i className="ri-notification-line text-white text-2xl" />
              </motion.div>
              <motion.div
                className="absolute -top-4 -left-4 w-20 h-20 bg-orange-400 rounded-2xl shadow-lg flex items-center justify-center transform rotate-12 floating hover-lift"
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <i className="ri-calendar-check-line text-white text-xl" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center flex-1 p-4 w-full">
        <div className="flex w-full max-w-md flex-col items-center">
          <div className="w-11/12 p-8 rounded-xl bg-white border-2 border-gray-900">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
              Giriş Yap
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  E-posta Adresi:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-mail-line text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 p-3 w-full rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm hover:border-gray-400"
                    placeholder="e-posta@mail.com"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Şifre:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-lock-line text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10 p-3 w-full rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm hover:border-gray-400"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="p-3 rounded-lg bg-orange-600 text-white font-bold text-lg mt-4 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors shadow-md"
              >
                Giriş Yap
              </button>
            </form>
            <div className="relative my-8">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white dark:bg-gray-800 px-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  VEYA
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-col space-y-3">
              <button
                onClick={handleGitHubLogin}
                className="p-3 rounded-lg border-2 border-gray-900 bg-gray-50 text-gray-700 font-bold hover:bg-gray-100 transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.5)] w-full flex justify-center items-center"
              >
                <i className="ri-github-line mr-2"></i>
                GitHub ile Devam Et
              </button>
            </div>

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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
