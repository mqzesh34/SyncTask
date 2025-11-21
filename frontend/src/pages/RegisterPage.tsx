import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { type UserCredentials } from "../types.d";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserCredentials>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("Tüm zorunlu alanları doldurunuz.");
      return;
    }

    try {
      await register(formData);
      toast.success("Kayıt işlemi başarılı! Şimdi giriş yapabilirsiniz.");
      setFormData({ first_name: "", last_name: "", email: "", password: "" });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message || "Kayıt sırasında hata oluştu.");
      } else {
        toast.error("Beklenmedik bir ağ bağlantısı hatası oluştu.");
      }
    }
  };





  return (
    <div className="flex w-screen h-screen font-sans">
      <div className="flex-1 hidden lg:block rounded-r-4xl p-6 overflow-hidden bg-gray-50 border-r border-gray-200">
        <div className="h-full w-full flex items-center justify-center">
          <motion.div
            className="relative floating"
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-100 w-full max-w-md mx-auto shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-500 hover-lift">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">
                    Takım Performansı
                  </h4>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm mr-6 text-gray-600">
                      Tamamlanan Görevler
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        75%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Proje İlerlemesi
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: "62%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        62%
                      </span>
                    </div>
                  </div>

                  {/* Bar 3 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Ekip Verimliliği
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-400 rounded-full"
                          style={{ width: "87%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        87%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl text-center shadow-sm border border-gray-50">
                  <div className="text-2xl font-bold text-blue-500 mb-1">
                    24
                  </div>
                  <div className="text-xs text-gray-500">Aktif Görev</div>
                </div>
                <div className="bg-white p-4 rounded-xl text-center shadow-sm border border-gray-50">
                  <div className="text-2xl font-bold text-emerald-500 mb-1">
                    12
                  </div>
                  <div className="text-xs text-gray-500">Ekip Üyesi</div>
                </div>
                <div className="bg-white p-4 rounded-xl text-center shadow-sm border border-gray-50">
                  <div className="text-2xl font-bold text-orange-500 mb-1">
                    98%
                  </div>
                  <div className="text-xs text-gray-500">Başarı Oranı</div>
                </div>
              </div>
            </div>
            </div>
            <motion.div
              className="absolute -bottom-8 -right-8 w-20 h-20 bg-purple-400 rounded-2xl shadow-lg flex items-center justify-center transform -rotate-12 floating-delayed hover-lift"
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <i className="ri-rocket-line text-white text-2xl" />
            </motion.div>
            <motion.div
              className="absolute -top-8 -left-8 w-16 h-16 bg-pink-400 rounded-2xl shadow-lg flex items-center justify-center transform rotate-12 floating hover-lift"
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <i className="ri-bar-chart-grouped-line text-white text-xl" />
            </motion.div>
          </motion.div>
        </div>
      </div>



      <div className="flex justify-center items-center flex-1 p-4 w-full">
        <div className="flex w-full max-w-md flex-col items-center">
          <div className="w-11/12 p-8 rounded-xl bg-white border-2 border-gray-900">
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
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="ri-user-line text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="pl-10 p-3 w-full rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm hover:border-gray-400"
                      placeholder="Adınız"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Soyad:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="ri-user-line text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      className="pl-10 p-3 w-full rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm hover:border-gray-400"
                      placeholder="Soyadınız"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                className="p-3 w-full rounded-lg bg-orange-600 text-white font-bold text-lg mt-6 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors shadow-md"
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
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
