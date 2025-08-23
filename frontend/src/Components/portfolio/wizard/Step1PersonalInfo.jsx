import React, { useState } from "react";
import { User, Upload, X, Camera } from "lucide-react";
import axios from "axios";

const Section = ({ title, icon: Icon, accent = "purple", children, desc }) => (
  <section
    className={`relative rounded-2xl border p-6 sm:p-7 
    bg-gray-900/40 backdrop-blur-xl
    shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_10px_40px_-12px_rgba(0,0,0,0.6)]
    border-${accent}-500/30`}
  >
    <div
      className="absolute -inset-px rounded-2xl pointer-events-none 
      [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)] 
      bg-[conic-gradient(from_220deg_at_50%_50%,rgba(168,85,247,.25),rgba(6,182,212,.25),transparent_60%)]"
    />
    <header className="relative mb-5 flex items-start gap-3">
      <div
        className={`p-2 rounded-xl border bg-black/30 
        border-${accent}-500/40 shadow-[0_0_20px_-6px_rgba(147,51,234,.6)]`}
      >
        <Icon className={`w-5 h-5 text-${accent}-300`} />
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white">{title}</h3>
        {desc ? <p className="text-xs text-gray-400 mt-1">{desc}</p> : null}
      </div>
    </header>
    <div className="relative">{children}</div>
  </section>
);

const FieldLabel = ({ children, required }) => (
  <label className="block text-sm font-medium mb-2 text-gray-300">
    {children} {required && <span className="text-pink-400">*</span>}
  </label>
);

const InputBase = (props) => (
  <input
    {...props}
    className={[
      "w-full rounded-xl px-4 py-3 text-gray-100",
      "bg-gray-900/60 border border-white/10",
      "outline-none transition",
      "focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50",
      "placeholder:text-gray-500",
      props.className || "",
    ].join(" ")}
  />
);

const TextareaBase = (props) => (
  <textarea
    {...props}
    className={[
      "w-full rounded-xl px-4 py-3 text-gray-100 resize-none",
      "bg-gray-900/60 border border-white/10",
      "outline-none transition",
      "focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50",
      "placeholder:text-gray-500",
      props.className || "",
    ].join(" ")}
  />
);

const IconGhostButton = ({ children, className = "", ...rest }) => (
  <button
    {...rest}
    className={`p-2 rounded-lg border border-white/10 bg-white/5 
      hover:bg-white/10 hover:border-white/20 active:scale-95 
      transition ${className}`}
  >
    {children}
  </button>
);

const NeonPill = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group relative inline-flex items-center gap-2 rounded-xl px-3 py-2 
      border border-fuchsia-500/30 bg-fuchsia-500/10 
      hover:border-fuchsia-400/60 hover:bg-fuchsia-500/15 
      transition shadow-[0_0_20px_-8px_rgba(217,70,239,.6)]"
  >
    <span className="text-sm text-fuchsia-200 group-hover:text-white">
      {children}
    </span>
    <span
      className="absolute -z-10 inset-0 rounded-xl blur-xl opacity-40 
      bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20"
    />
  </button>
);

const ChipCounter = ({ value = 0, max = 40 }) => (
  <span className="text-[11px] text-gray-500 self-center min-w-[3rem] text-right">
    {value}/{max}
  </span>
);

const Step1PersonalInfo = ({
  portfolioData,
  onUpdateNestedField,
  onUpdateArrayItem,
  onAddArrayItem,
  onRemoveArrayItem,
}) => {
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    portfolioData.heroSection.profile || ""
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!profileImage) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", profileImage);
    formData.append("upload_preset", "Freelance_Website");
    formData.append("cloud_name", "dd33ovgv1");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd33ovgv1/image/upload",
        formData
      );
      const uploadedUrl = res.data.secure_url;
      setImagePreview(uploadedUrl);
      onUpdateNestedField("heroSection", "profile", uploadedUrl);
      setProfileImage(null);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setProfileImage(null);
    onUpdateNestedField("heroSection", "profile", "");
  };

  return (
    <div className="space-y-8">
      {/* Header / Step Badge */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-3">
          <div
            className="h-9 rounded-full px-3 inline-flex items-center gap-2 
              bg-gradient-to-r from-fuchsia-500/15 to-cyan-500/15 
              border border-white/10"
          >
            <span className="w-2 h-2 rounded-full animate-pulse bg-fuchsia-400/80 shadow-[0_0_12px_2px_rgba(217,70,239,.7)]" />
            <span className="text-xs tracking-wide text-gray-300">
              Step 1 • Personal Info
            </span>
          </div>
        </div>
      </div>

      {/* Profile Image */}
      <Section
        title="Profile Image"
        icon={Camera}
        accent="purple"
        desc="Upload a crisp, square headshot. PNG/JPG recommended."
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            {imagePreview ? (
              <div className="relative group">
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl object-cover 
                    border border-white/10 shadow-[0_10px_30px_-10px_rgba(147,51,234,.6)]"
                />
                <IconGhostButton
                  type="button"
                  onClick={removeImage}
                  aria-label="Remove image"
                  className="absolute -top-2 -right-2 bg-red-500/20 border-red-400/30 hover:bg-red-500/30"
                  title="Remove image"
                >
                  <X className="w-4 h-4 text-red-300" />
                </IconGhostButton>
              </div>
            ) : (
              <div
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl border border-dashed 
                border-white/15 grid place-items-center
                bg-gradient-to-br from-gray-900/60 to-gray-800/40"
              >
                <Camera className="w-8 h-8 text-purple-300/70" />
              </div>
            )}
          </div>

          <div className="flex flex-col items-center sm:items-start gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="profile-image-input"
            />
            <label
              htmlFor="profile-image-input"
              className="relative inline-flex items-center gap-2 rounded-xl px-4 py-2
                border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20
                transition cursor-pointer"
            >
              <Upload className="w-4 h-4 text-gray-200" />
              <span className="text-sm text-gray-200">Choose Image</span>
              <span
                className="absolute -z-10 inset-0 rounded-xl blur-xl opacity-40 
                bg-gradient-to-r from-purple-500/20 to-cyan-500/20"
              />
            </label>

            {profileImage && (
              <button
                type="button"
                onClick={handleImageUpload}
                disabled={isUploading}
                className="relative inline-flex items-center gap-2 rounded-xl px-4 py-2
                  bg-gradient-to-r from-fuchsia-600 to-cyan-600 
                  enabled:hover:from-fuchsia-500 enabled:hover:to-cyan-500
                  text-white transition disabled:opacity-60 disabled:cursor-not-allowed
                  shadow-[0_10px_30px_-10px_rgba(34,211,238,.6)]"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">Uploading…</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span className="text-sm">Upload to Cloud</span>
                  </>
                )}
              </button>
            )}
            <p className="text-xs text-gray-500">
              Max ~10MB. Square images look best.
            </p>
          </div>
        </div>
      </Section>

      {/* Personal Information */}
      <Section
        title="Personal Information"
        icon={User}
        accent="purple"
        desc="These details power your hero section."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <FieldLabel required>Name</FieldLabel>
            <InputBase
              type="text"
              value={portfolioData.heroSection.name || ""}
              onChange={(e) =>
                onUpdateNestedField("heroSection", "name", e.target.value)
              }
              placeholder="Jane Doe"
              required
            />
          </div>

          <div>
            <FieldLabel>Thought Line</FieldLabel>
            <InputBase
              type="text"
              value={portfolioData.heroSection.thoughtLine || ""}
              onChange={(e) =>
                onUpdateNestedField(
                  "heroSection",
                  "thoughtLine",
                  e.target.value
                )
              }
              placeholder="Design. Build. Iterate."
            />
          </div>
        </div>

        <div className="mt-5">
          <FieldLabel>About Me</FieldLabel>
          <TextareaBase
            rows="4"
            value={portfolioData.heroSection.aboutMe || ""}
            onChange={(e) =>
              onUpdateNestedField("heroSection", "aboutMe", e.target.value)
            }
            placeholder="A concise bio that highlights your strengths, interests, and goals."
            maxLength="300"
          />
          <div className="mt-2 flex justify-end">
            <ChipCounter
              value={
                portfolioData.heroSection.aboutMe
                  ? portfolioData.heroSection.aboutMe.length
                  : 0
              }
              max={300}
            />
          </div>
        </div>

        {/* Domains */}
        <div className="mt-6">
          <FieldLabel>Domains</FieldLabel>
          {portfolioData.heroSection.domains.map((domain, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <InputBase
                type="text"
                value={domain || ""}
                onChange={(e) =>
                  onUpdateArrayItem(
                    "heroSection",
                    "domains",
                    index,
                    e.target.value
                  )
                }
                placeholder="e.g., Full-Stack, UI/UX, DevOps"
              />
              {portfolioData.heroSection.domains.length > 1 && (
                <IconGhostButton
                  type="button"
                  onClick={() =>
                    onRemoveArrayItem("heroSection", "domains", index)
                  }
                  title="Remove domain"
                  className="shrink-0"
                >
                  <X className="w-4 h-4 text-red-300" />
                </IconGhostButton>
              )}
            </div>
          ))}
          <div className="mt-2">
            <NeonPill
              onClick={() => onAddArrayItem("heroSection", "domains", "")}
            >
              + Add Domain
            </NeonPill>
          </div>
        </div>

        {/* Expertise */}
        <div className="mt-6">
          <FieldLabel>Expertise (Max 4, 40 chars each)</FieldLabel>
          {portfolioData.heroSection.expertise.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <InputBase
                type="text"
                value={item || ""}
                onChange={(e) =>
                  onUpdateArrayItem(
                    "heroSection",
                    "expertise",
                    index,
                    e.target.value
                  )
                }
                maxLength="40"
                placeholder="e.g., React performance, System design"
              />
              <ChipCounter value={item ? item.length : 0} />
              {portfolioData.heroSection.expertise.length > 1 && (
                <IconGhostButton
                  type="button"
                  onClick={() =>
                    onRemoveArrayItem("heroSection", "expertise", index)
                  }
                  title="Remove expertise"
                  className="shrink-0"
                >
                  <X className="w-4 h-4 text-red-300" />
                </IconGhostButton>
              )}
            </div>
          ))}
          {portfolioData.heroSection.expertise.length < 4 && (
            <div className="mt-2">
              <NeonPill
                onClick={() => onAddArrayItem("heroSection", "expertise", "")}
              >
                + Add Expertise
              </NeonPill>
            </div>
          )}
        </div>

        {/* Focus Areas */}
        <div className="mt-6">
          <FieldLabel>Focus Areas (Max 4, 40 chars each)</FieldLabel>
          {portfolioData.heroSection.focusAreas.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <InputBase
                type="text"
                value={item || ""}
                onChange={(e) =>
                  onUpdateArrayItem(
                    "heroSection",
                    "focusAreas",
                    index,
                    e.target.value
                  )
                }
                maxLength="40"
                placeholder="e.g., Accessibility, Micro-interactions"
              />
              <ChipCounter value={item ? item.length : 0} />
              {portfolioData.heroSection.focusAreas.length > 1 && (
                <IconGhostButton
                  type="button"
                  onClick={() =>
                    onRemoveArrayItem("heroSection", "focusAreas", index)
                  }
                  title="Remove focus area"
                  className="shrink-0"
                >
                  <X className="w-4 h-4 text-red-300" />
                </IconGhostButton>
              )}
            </div>
          ))}
          {portfolioData.heroSection.focusAreas.length < 4 && (
            <div className="mt-2">
              <NeonPill
                onClick={() => onAddArrayItem("heroSection", "focusAreas", "")}
              >
                + Add Focus Area
              </NeonPill>
            </div>
          )}
        </div>
      </Section>

      {/* Contact Information */}
      <Section
        title="Contact Information"
        icon={User}
        accent="indigo"
        desc="Share how people can reach you."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <FieldLabel required>Email</FieldLabel>
            <InputBase
              type="email"
              value={portfolioData.contactInfo.email || ""}
              onChange={(e) =>
                onUpdateNestedField("contactInfo", "email", e.target.value)
              }
              placeholder="you@domain.com"
              required
            />
          </div>

          <div>
            <FieldLabel>Phone Number</FieldLabel>
            <InputBase
              type="tel"
              value={portfolioData.contactInfo.phoneNumber || ""}
              onChange={(e) =>
                onUpdateNestedField(
                  "contactInfo",
                  "phoneNumber",
                  e.target.value
                )
              }
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <FieldLabel>LinkedIn Profile</FieldLabel>
            <InputBase
              type="url"
              value={portfolioData.contactInfo.linkedinProfile || ""}
              onChange={(e) =>
                onUpdateNestedField(
                  "contactInfo",
                  "linkedinProfile",
                  e.target.value
                )
              }
              placeholder="https://www.linkedin.com/in/username"
            />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Step1PersonalInfo;
