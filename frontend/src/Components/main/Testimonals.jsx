

import { useState, useEffect } from "react"
import { Star, Quote } from "lucide-react"

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Startup Founder",
      company: "DeFi Labs",
      content:
        "CryptoLance revolutionized how we hire developers. The smart contract escrow gave us complete confidence, and we found amazing Web3 talent within days.",
      avatar: "https://i.pravatar.cc/150?img=47",
      rating: 5,
      project: "Built our entire DeFi platform",
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Full-Stack Developer",
      company: "Freelancer",
      content:
        "As a freelancer, getting paid instantly after project completion is a game-changer. No more waiting weeks for payments or dealing with payment disputes.",
      avatar: "https://i.pravatar.cc/150?img=32",
      rating: 5,
      project: "Earned $45K in 6 months",
    },
    {
      id: 3,
      name: "Elena Volkov",
      role: "Product Manager",
      company: "TechCorp",
      content:
        "The quality of talent on CryptoLance is exceptional. We've hired 12 developers and designers, all delivering outstanding work with perfect communication.",
      avatar: "https://i.pravatar.cc/150?img=68",
      rating: 5,
      project: "Scaled our team globally",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Smart Contract Developer",
      company: "Blockchain Expert",
      content:
        "CryptoLance's decentralized approach means no platform can freeze my earnings. I have complete control over my work and payments. It's the future of freelancing.",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      project: "Completed 50+ smart contracts",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section id="testimonials" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="  mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 border border-yellow-500 text-yellow-400 rounded-full text-sm font-medium">
            TESTIMONIALS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
            What Our Community Says About Us
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join thousands of satisfied clients and freelancers who have transformed their work experience with
            CryptoLance.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12 relative">
            <Quote className="absolute top-6 left-6 w-8 h-8 text-purple-400/30" />

            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
                "{testimonials[activeTestimonial].content}"
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[activeTestimonial].avatar || "/placeholder.svg"}
                  alt={testimonials[activeTestimonial].name}
                  className="w-16 h-16 rounded-full border-2 border-purple-500/50"
                />
                <div className="text-left">
                  <h4 className="text-xl font-bold text-white">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-gray-400">
                    {testimonials[activeTestimonial].role} at {testimonials[activeTestimonial].company}
                  </p>
                  <p className="text-purple-400 text-sm font-medium">{testimonials[activeTestimonial].project}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeTestimonial === index ? "bg-purple-500 scale-125" : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold mb-6">Join Our Thriving Community</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Connect with other freelancers and clients, share insights, and stay updated on the latest in decentralized
            work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-[#5865F2] hover:bg-[#4752c4] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              onClick={() => window.open("https://discord.gg/cryptolance", "_blank")}
            >
              Join Discord
            </button>
            <button
              className="bg-[#0088cc] hover:bg-[#0077b5] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              onClick={() => window.open("https://t.me/cryptolance", "_blank")}
            >
              Join Telegram
            </button>
            <button
              className="bg-[#1DA1F2] hover:bg-[#1a91da] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              onClick={() => window.open("https://twitter.com/cryptolance", "_blank")}
            >
              Follow Twitter
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
export default TestimonialsSection;

function TestimonialCard({ testimonial, index }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true)
    }, index * 100)
  }, [index])

  return (
  <div className="bg-gray-900/70 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/70 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-500 group">
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
  <div className="flex items-center mb-4">
    <img
      src={testimonial.avatar || "/placeholder.svg"}
      alt={testimonial.name}
      className="w-12 h-12 rounded-full border-2 border-gray-700 mr-4 group-hover:border-cyan-500/50 transition-colors"
    />
    <div>
      <p className="font-bold text-white group-hover:text-cyan-300 transition-colors">{testimonial.name}</p>
      <p className="text-sm text-gray-300">{testimonial.role}</p>
    </div>
  </div>
  <div className="flex mb-3">
    {[...Array(testimonial.rating)].map((_, i) => (
      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
    ))}
  </div>
  <p className="text-gray-300 italic text-sm leading-relaxed">"{testimonial.content}"</p>
</div>
  )
}
