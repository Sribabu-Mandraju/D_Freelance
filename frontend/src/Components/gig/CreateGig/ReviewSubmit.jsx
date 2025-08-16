import { Info, Tag, Clock, DollarSign, CheckCircle } from "lucide-react";

export default function ReviewSubmit({ formData, packageData }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-4">
        <h2 className="text-xl md:text-3xl font-bold text-white mb-2 sm:mb-0">Review Your Gig</h2>
        <div className="flex items-center gap-2 text-green-400">
          <CheckCircle className="w-5 h-5" />
          <span className="text-md md:text-lg font-medium">Ready to submit</span>
        </div>
      </div>
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 sm:p-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
          <ReviewItem icon={Info} title="Username" content={formData.username} />
          <ReviewItem icon={Info} title="Title" content={formData.title} />
          <ReviewItem icon={Tag} title="Category" content={formData.category} />
          <ReviewItem icon={Clock} title="Delivery Time" content={`${formData.deliveryTime} Days`} />
        </div>
        <div className="space-y-4 mb-4 md:mb-6">
          <h3 className="text-xl font-bold text-white">Packages</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {["basic", "standard", "pro"].map((pkgName) => (
              <div key={pkgName} className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                <span className="font-semibold text-white">{pkgName.charAt(0).toUpperCase() + pkgName.slice(1)}:</span>
                <ul className="list-disc list-inside text-gray-300 text-sm mt-2 space-y-1">
                  <li><span className="font-semibold">Hourly Pay:</span> ${packageData[pkgName].hourlyPay}</li>
                  <li><span className="font-semibold">Duration:</span> {packageData[pkgName].duration}</li>
                  <li><span className="font-semibold">Custom UI:</span> {packageData[pkgName].custom_ui}</li>
                  <li><span className="font-semibold">Code Reviews:</span> {packageData[pkgName].code_reviews}</li>
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
            <span className="text-sm font-medium text-gray-400">FAQs</span>
            <div className="space-y-2 mt-2">{formData.faqs.map((faq, index) => (<div key={index} className="bg-slate-700 p-3 rounded-lg"><p className="text-gray-300 text-sm font-semibold">Q: {faq.question}</p><p className="text-gray-400 text-xs mt-1">A: {faq.answer}</p></div>))}</div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
          {formData.location && <ReviewItem icon={Info} title="Location" content={formData.location} />}
          {formData.projects !== undefined && <ReviewItem icon={Info} title="Projects" content={formData.projects} />}
          {formData.responseTime && <ReviewItem icon={Info} title="Response Time" content={formData.responseTime} />}
          {formData.successRate !== undefined && <ReviewItem icon={Info} title="Success Rate" content={`${formData.successRate}%`} />}
        </div>
        {formData.images[0]?.url && (
          <div className="mt-6">
            <span className="text-sm font-medium text-gray-400">Gig Image</span>
            <img src={formData.images[0].url} alt="Gig preview" className="w-full h-40 object-cover rounded-lg border border-slate-600 mt-2" onError={(e) => { e.target.src = "/placeholder.svg"; }} />
          </div>
        )}
      </div>
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-4 mt-6">
        <h3 className="text-lg font-semibold text-white mb-2">Important Note</h3>
        <p className="text-sm text-gray-300 mb-3">By submitting, you agree that your gig details are accurate and you are authorized to offer these services.</p>
        <label className="flex items-center"><input type="checkbox" name="terms-checkbox" className="mr-2 accent-blue-500 h-5 w-5 rounded-md" required /><span className="text-md text-gray-300">I agree to the terms and conditions</span></label>
      </div>
    </div>
  );
}
const ReviewItem = ({ icon: Icon, title, content }) => (
  <div>
    <div className="flex items-center gap-2 mb-1">
      <Icon className="w-4 h-4 text-purple-400" />
      <span className="text-sm md:text-lg font-medium text-gray-400">{title}</span>
    </div>
    <p className="text-white font-semibold text-md md:text-lg">{content}</p>
  </div>
);
const ReviewContent = ({ title, content }) => (
  <div className="mb-4">
    <span className="text-sm font-medium text-gray-400">{title}</span>
    <p className="text-gray-300 text-sm leading-relaxed mt-1">{content}</p>
  </div>
);
const ReviewTags = ({ title, tags }) => (
  <div className="mb-4">
    <span className="text-sm font-medium text-gray-400">{title}</span>
    <div className="flex flex-wrap gap-2 mt-1">
      {tags.map((tag, index) => (<span key={index} className="px-3 py-1 bg-slate-700 rounded-full text-xs text-gray-300">{tag}</span>))}
    </div>
  </div>
);