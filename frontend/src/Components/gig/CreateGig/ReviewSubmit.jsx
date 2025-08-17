import { Info, Tag, Clock, DollarSign, CheckCircle } from "lucide-react"

export default function ReviewSubmit({ formData, packageData }) {
  return (
    <div className="space-y-6 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-4">
        <h2 className="text-xl md:text-3xl font-bold text-cyan-400 mb-2 sm:mb-0">Review Your Gig</h2>
        <div className="flex items-center gap-2 text-green-400">
          <CheckCircle className="w-5 h-5" />
          <span className="text-md md:text-lg font-medium">Ready to submit</span>
        </div>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-wrap md:flex-row md:justify-between gap-4 md:gap-6 mb-4 md:mb-6">
          <ReviewItem icon={Info} title="Username" content={formData.username} />
          <ReviewItem icon={Info} title="Title" content={formData.title} />
          <ReviewItem icon={DollarSign} title="Price" content={formData.price} />
          <ReviewItem icon={Tag} title="Category" content={formData.category} />
          <ReviewItem icon={Clock} title="Delivery Time" content={`${formData.deliveryTime} Days`} />
        </div>

        <div className="space-y-4 mb-4 md:mb-6">
          <h3 className="text-xl font-bold text-cyan-400">Packages</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {["basic", "standard", "pro"].map((pkgName) => (
              <div
                key={pkgName}
                className="p-4 bg-slate-800/60 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors"
              >
                <span className="font-semibold text-cyan-400 text-lg">
                  {pkgName.charAt(0).toUpperCase() + pkgName.slice(1)}
                </span>
                <ul className="list-disc list-inside text-gray-300 text-sm mt-3 space-y-2">
                  <li>
                    <span className="font-semibold text-cyan-300">Hourly Pay:</span>{" "}
                    <span className="text-white">${packageData[pkgName].hourlyPay}</span>
                  </li>
                  <li>
                    <span className="font-semibold text-cyan-300">Duration:</span>{" "}
                    <span className="text-white">{packageData[pkgName].duration}</span>
                  </li>
                  <li>
                    <span className="font-semibold text-cyan-300">Custom UI:</span>{" "}
                    <span className="text-white">{packageData[pkgName].custom_ui}</span>
                  </li>
                  <li>
                    <span className="font-semibold text-cyan-300">Code Reviews:</span>{" "}
                    <span className="text-white">{packageData[pkgName].code_reviews}</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        <ReviewContent title="Description" content={formData.description} />
        {formData.about && <ReviewContent title="About Gig" content={formData.about} />}
        {formData.tags.length > 0 && <ReviewTags title="Tags" tags={formData.tags} />}
        {formData.skills.length > 0 && <ReviewTags title="Skills" tags={formData.skills} />}
        {formData.badges.length > 0 && <ReviewTags title="Badges" tags={formData.badges} />}

        {formData.faqs.length > 0 && (
          <div className="mt-4">
            <span className="text-sm font-medium text-cyan-400">FAQs</span>
            <div className="space-y-2 mt-2">
              {formData.faqs.map((faq, index) => (
                <div key={index} className="bg-slate-800/60 p-3 rounded-lg border border-slate-600/30">
                  <p className="text-cyan-300 text-sm font-semibold">Q: {faq.question}</p>
                  <p className="text-gray-300 text-xs mt-1">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
          {formData.location && <ReviewItem icon={Info} title="Location" content={formData.location} />}
          {formData.projects !== undefined && <ReviewItem icon={Info} title="Projects" content={formData.projects} />}
          {formData.responseTime && <ReviewItem icon={Info} title="Response Time" content={formData.responseTime} />}
          {formData.successRate !== undefined && (
            <ReviewItem icon={Info} title="Success Rate" content={`${formData.successRate}%`} />
          )}
        </div>

        {formData.images[0]?.url && (
          <div className="mt-6">
            <span className="text-sm font-medium text-cyan-400">Gig Image</span>
            <img
              src={formData.images[0].url || "/placeholder.svg"}
              alt="Gig preview"
              className="w-full h-40 object-cover rounded-lg border border-slate-600/50 mt-2 hover:border-cyan-500/30 transition-colors"
              onError={(e) => {
                e.target.src = "/placeholder.svg"
              }}
            />
          </div>
        )}
      </div>

      <div className="bg-slate-900/60 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 mt-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-2">Important Note</h3>
        <p className="text-sm text-gray-300 mb-3 leading-relaxed">
          By submitting, you agree that your gig details are accurate and you are authorized to offer these services.
        </p>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="terms-checkbox"
            className="mr-3 accent-cyan-500 h-5 w-5 rounded-md border-2 border-slate-600 bg-slate-800 focus:ring-2 focus:ring-cyan-500/20"
            required
          />
          <span className="text-md text-gray-300 select-none">I agree to the terms and conditions</span>
        </label>
      </div>
    </div>
  )
}

const ReviewItem = ({ icon: Icon, title, content }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-cyan-400" />
      <span className="text-sm md:text-base font-medium text-cyan-400">{title}</span>
    </div>
    <p className="text-white font-medium text-md md:text-lg pl-6">{content}</p>
  </div>
)

const ReviewContent = ({ title, content }) => (
  <div className="mb-4 space-y-2">
    <span className="text-sm font-medium text-cyan-400">{title}</span>
    <p className="text-gray-300 text-sm leading-relaxed bg-slate-800/30 p-3 rounded-lg border border-slate-700/30">
      {content}
    </p>
  </div>
)

const ReviewTags = ({ title, tags }) => (
  <div className="mb-4 space-y-2">
    <span className="text-sm font-medium text-cyan-400">{title}</span>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-slate-800/60 border border-cyan-500/20 rounded-full text-xs text-cyan-300 hover:border-cyan-500/40 transition-colors"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
)
