import {
  Info,
  Tag,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Package,
  Image,
  FileText,
} from "lucide-react";

export default function ReviewSubmit({
  formData,
  packageData,
  validationErrors,
}) {
  const getFieldError = (field) => {
    return validationErrors[field];
  };

  const hasErrors = Object.keys(validationErrors).length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Review Your Gig
          </h2>
          <p className="text-gray-400">
            Review all information before submitting
          </p>
        </div>
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            hasErrors
              ? "bg-red-500/20 border border-red-500/30 text-red-400"
              : "bg-green-500/20 border border-green-500/30 text-green-400"
          }`}
        >
          {hasErrors ? (
            <>
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Please fix errors</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Ready to submit</span>
            </>
          )}
        </div>
      </div>

      {/* Validation Errors Summary */}
      {hasErrors && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-400 mb-3">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">
              Please fix the following errors:
            </span>
          </div>
          <div className="space-y-2">
            {Object.entries(validationErrors).map(([field, error]) => (
              <div
                key={field}
                className="flex items-center gap-2 text-red-300 text-sm"
              >
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                <span className="capitalize">
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  :
                </span>
                <span>{error}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-6">
        <div className="border-b border-gray-700/50 pb-4 mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Info className="w-5 h-5 text-cyan-400" />
            Basic Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ReviewItem
            icon={Info}
            title="Username"
            content={formData.username}
            error={getFieldError("username")}
          />
          <ReviewItem
            icon={FileText}
            title="Title"
            content={formData.title}
            error={getFieldError("title")}
          />
          <ReviewItem
            icon={DollarSign}
            title="Price"
            content={formData.price}
            error={getFieldError("price")}
          />
          <ReviewItem
            icon={Tag}
            title="Category"
            content={formData.category}
            error={getFieldError("category")}
          />
          <ReviewItem
            icon={Clock}
            title="Delivery Time"
            content={`${formData.deliveryTime} days`}
            error={getFieldError("deliveryTime")}
          />
          <ReviewItem
            icon={Image}
            title="Gig Image"
            content={formData.gigimage ? "Uploaded" : "Not uploaded"}
            error={getFieldError("gigimage")}
          />
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-semibold text-cyan-300 mb-3">
            Description
          </h4>
          <div className="bg-gray-900/50 border border-gray-600/30 rounded-lg p-4">
            <p className="text-gray-300 leading-relaxed">
              {formData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Package Information */}
      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-6">
        <div className="border-b border-gray-700/50 pb-4 mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-purple-400" />
            Package Information
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {["basic", "standard", "pro"].map((pkgName) => (
            <div
              key={pkgName}
              className="p-6 bg-gray-900/50 rounded-lg border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-purple-400 text-lg capitalize">
                  {pkgName} Package
                </span>
                <div
                  className={`w-3 h-3 rounded-full ${
                    getFieldError(`${pkgName}_hourlyPay`) ||
                    getFieldError(`${pkgName}_duration`) ||
                    getFieldError(`${pkgName}_custom_ui`) ||
                    getFieldError(`${pkgName}_code_reviews`)
                      ? "bg-red-400"
                      : "bg-green-400"
                  }`}
                ></div>
              </div>

              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span className="text-cyan-300 text-sm font-medium">
                    Hourly Pay:
                  </span>
                  <span className="text-white font-semibold">
                    ${packageData[pkgName].hourlyPay}
                  </span>
                  {getFieldError(`${pkgName}_hourlyPay`) && (
                    <span className="text-red-400 text-xs ml-2">Required</span>
                  )}
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-cyan-300 text-sm font-medium">
                    Duration:
                  </span>
                  <span className="text-white">
                    {packageData[pkgName].duration}
                  </span>
                  {getFieldError(`${pkgName}_duration`) && (
                    <span className="text-red-400 text-xs ml-2">Required</span>
                  )}
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-cyan-300 text-sm font-medium">
                    Custom UI:
                  </span>
                  <span className="text-white capitalize">
                    {packageData[pkgName].custom_ui}
                  </span>
                  {getFieldError(`${pkgName}_custom_ui`) && (
                    <span className="text-red-400 text-xs ml-2">Required</span>
                  )}
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-cyan-300 text-sm font-medium">
                    Code Reviews:
                  </span>
                  <span className="text-white">
                    {packageData[pkgName].code_reviews}
                  </span>
                  {getFieldError(`${pkgName}_code_reviews`) && (
                    <span className="text-red-400 text-xs ml-2">Required</span>
                  )}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-6">
        <div className="border-b border-gray-700/50 pb-4 mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Info className="w-5 h-5 text-emerald-400" />
            Additional Information
          </h3>
        </div>

        <div className="space-y-6">
          {formData.about && (
            <div>
              <h4 className="text-lg font-semibold text-emerald-300 mb-3">
                About Your Service
              </h4>
              <div className="bg-gray-900/50 border border-gray-600/30 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">
                  {formData.about}
                </p>
              </div>
            </div>
          )}

          {formData.tags && formData.tags.length > 0 && (
            <ReviewTags title="Tags" tags={formData.tags} color="purple" />
          )}

          {formData.skills && formData.skills.length > 0 && (
            <ReviewTags title="Skills" tags={formData.skills} color="cyan" />
          )}

          {formData.badges && formData.badges.length > 0 && (
            <ReviewTags
              title="Badges & Certifications"
              tags={formData.badges}
              color="emerald"
            />
          )}

          {formData.faqs && formData.faqs.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-emerald-300 mb-3">
                Frequently Asked Questions
              </h4>
              <div className="space-y-3">
                {formData.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/50 border border-gray-600/30 rounded-lg p-4"
                  >
                    <p className="text-cyan-300 text-sm font-semibold mb-2">
                      Q: {faq.question}
                    </p>
                    <p className="text-gray-300 text-sm">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.location && (
              <ReviewItem
                icon={Info}
                title="Location"
                content={formData.location}
              />
            )}
            {formData.projects !== undefined && (
              <ReviewItem
                icon={Info}
                title="Projects Completed"
                content={formData.projects}
              />
            )}
            {formData.responseTime && (
              <ReviewItem
                icon={Clock}
                title="Response Time"
                content={formData.responseTime}
              />
            )}
            {formData.successRate !== undefined && (
              <ReviewItem
                icon={CheckCircle}
                title="Success Rate"
                content={`${formData.successRate}%`}
              />
            )}
          </div>
        </div>
      </div>

      {/* Images */}
      {formData.images && formData.images.length > 0 && (
        <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-6">
          <div className="border-b border-gray-700/50 pb-4 mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Image className="w-5 h-5 text-blue-400" />
              Images
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {formData.images.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img.url}
                  alt={`Gig image ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border-2 border-gray-600/30 group-hover:border-blue-500/50 transition-colors duration-300"
                />
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Main
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewItem({ icon: Icon, title, content, error }) {
  return (
    <div
      className={`p-4 rounded-lg border transition-all duration-300 ${
        error
          ? "bg-red-500/10 border-red-500/30"
          : "bg-gray-900/50 border-gray-600/30 hover:border-cyan-500/30"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <Icon
          className={`w-5 h-5 ${error ? "text-red-400" : "text-cyan-400"}`}
        />
        <span
          className={`text-sm font-medium ${
            error ? "text-red-400" : "text-cyan-300"
          }`}
        >
          {title}
        </span>
      </div>
      <p className={`text-sm ${error ? "text-red-300" : "text-white"}`}>
        {content || "Not provided"}
      </p>
      {error && (
        <div className="flex items-center gap-1 mt-2 text-red-400 text-xs">
          <AlertCircle className="w-3 h-3" />
          {error}
        </div>
      )}
    </div>
  );
}

function ReviewTags({ title, tags, color = "cyan" }) {
  const colorClasses = {
    cyan: "bg-cyan-600/20 border-cyan-500/30 text-cyan-300",
    purple: "bg-purple-600/20 border-purple-500/30 text-purple-300",
    emerald: "bg-emerald-600/20 border-emerald-500/30 text-emerald-300",
  };

  return (
    <div>
      <h4 className="text-lg font-semibold text-emerald-300 mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`px-3 py-2 rounded-lg border text-sm font-medium ${colorClasses[color]}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
