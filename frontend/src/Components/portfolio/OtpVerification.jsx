"use client";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Mail, ArrowLeft, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";

function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    } else {
      setMessage("Error: Email not found in URL");
      toast.error("Email not found in URL");
    }

    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [searchParams]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setMessage("Please enter all 6 digits");
      toast.error("Please enter all 6 digits");
      return;
    }

    setIsVerifying(true);
    setMessage("");
    const toastId = toast.loading("Verifying OTP...");

    try {
      const portfolioId = sessionStorage.getItem("portfolioId");
      const authToken = localStorage.getItem("authToken");

      if (!portfolioId) {
        setMessage("Error: Portfolio ID is missing");
        toast.error("Portfolio ID is missing", { id: toastId });
        setIsVerifying(false);
        return;
      }

      if (!authToken) {
        setMessage("Error: Authentication token is missing");
        toast.error("Authentication token is missing", { id: toastId });
        setIsVerifying(false);
        return;
      }

      const response = await fetch(
        "http://localhost:3001/api/portfolio/otp/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            email,
            otp: otpString,
            portfolioId,
          }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage("Verification successful! Redirecting to your portfolio...");
        toast.success("Verification successful! Redirecting...", {
          id: toastId,
        });
        sessionStorage.removeItem("portfolioId");
        setTimeout(() => {
          navigate(`/portfolio/me`);
        }, 2000);
      } else {
        setMessage(`Error: ${result.message}`);
        toast.error(`Error: ${result.message}`, { id: toastId });
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      toast.error(`Error: ${error.message}`, { id: toastId });
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setMessage("Email not found. Please go back and try again.");
      toast.error("Email not found. Please go back and try again.");
      return;
    }

    const portfolioId = sessionStorage.getItem("portfolioId");
    const authToken = localStorage.getItem("authToken");

    if (!portfolioId) {
      setMessage("Error: Portfolio ID is missing");
      toast.error("Portfolio ID is missing");
      return;
    }

    if (!authToken) {
      setMessage("Error: Authentication token is missing");
      toast.error("Authentication token is missing");
      return;
    }

    setIsResending(true);
    setMessage("");
    const toastId = toast.loading("Resending OTP...");

    try {
      const response = await fetch(
        "http://localhost:3001/api/portfolio/otp/resend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ email, portfolioId }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage("New OTP sent to your email!");
        toast.success("New OTP sent to your email!", { id: toastId });
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else {
        setMessage(`Error: ${result.message}`);
        toast.error(`Error: ${result.message}`, { id: toastId });
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      toast.error(`Error: ${error.message}`, { id: toastId });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"></div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30 mb-4">
              <Mail className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Verify Your Email
              </span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              We've sent a 6-digit code to
            </p>
            <p className="text-purple-400 font-medium text-sm sm:text-base break-all">
              {email}
            </p>
          </div>
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex gap-2 sm:gap-3 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-900/50 border border-purple-500/50 rounded-lg text-center text-xl sm:text-2xl font-bold text-white focus:border-purple-400 focus:outline-none focus:shadow-[0_0_10px_rgba(147,51,234,0.3)] transition-all duration-300"
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? "Verifying..." : "Verify & Create Portfolio"}
            </button>
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-600/50 hover:border-gray-500 rounded-lg text-gray-300 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                className={`w-4 h-4 ${isResending ? "animate-spin" : ""}`}
              />
              {isResending ? "Sending..." : "Resend Code"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Form
            </button>
            {message && (
              <div
                className={`p-4 rounded-lg border text-sm text-center ${
                  message.includes("Error")
                    ? "bg-red-500/10 border-red-500/50 text-red-400"
                    : "bg-green-500/10 border-green-500/50 text-green-400"
                }`}
              >
                {message}
              </div>
            )}
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              Didn't receive the code? Check your spam folder or click resend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
