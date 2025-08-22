import { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "../../store/ChatApplicationSlice/ChatAppSlice";
const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.chatApp);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await dispatch(sendMessage({ receiverId: selectedUser._id, messageData: {
        text: text.trim(),
        image: imagePreview,
      } }));

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full bg-slate-800/50 backdrop-blur-sm border-t border-cyan-400/30">
      {imagePreview && (
        <div className="mb-4 flex items-center gap-3">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border-2 border-cyan-400/30 shadow-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-500 border-2 border-slate-800
              flex items-center justify-center text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex gap-3 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full px-4 py-3 rounded-2xl bg-slate-700/50 border-2 border-slate-600/50 text-white placeholder-slate-400 
                       focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-300
                       backdrop-blur-sm"
              placeholder="Type your message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {/* Subtle neon glow on focus */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`p-3 rounded-xl transition-all duration-300 border-2 backdrop-blur-sm ${
              imagePreview 
                ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-400 hover:bg-emerald-500/30" 
                : "bg-slate-700/50 border-slate-600/50 text-slate-400 hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-cyan-400/10"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        
        <button
          type="submit"
          className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg 
                   hover:from-cyan-400 hover:to-purple-400 disabled:from-slate-600 disabled:to-slate-600 
                   disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95
                   disabled:transform-none"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;