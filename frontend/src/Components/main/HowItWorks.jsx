
import { useState, useEffect } from "react"
import { Wallet, Search, FileText, Code, DollarSign, Star, Shield, Zap, Globe } from "lucide-react"
import { FaDatabase } from "react-icons/fa";
import { motion } from "framer-motion";

 const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Connect Your Wallet",
      description:
        "Sign in securely using your crypto wallet to establish a decentralized, password-free identity on the blockchain.",
      icon: <Wallet className="w-8 h-8" />,
      color: "from-purple-500 to-cyan-500",
    },
    {
      number: 2,
      title: "Post or Browse Jobs",
      description:
        "Clients can post jobs directly to the blockchain. Freelancers explore and bid on jobs across various categories.",
      icon: <Search className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-500",
    },
    {
      number: 3,
      title: "Smart Contract Agreement",
      description:
        "Both parties agree on job terms. A smart contract locks the funds in escrow, ensuring transparency and trust.",
      icon: <FileText className="w-8 h-8" />,
      color: "from-blue-500 to-purple-500",
    },
    {
      number: 4,
      title: "Deliver Work & Review",
      description:
        "Freelancer completes and submits the work. The client reviews and approves it through the platform.",
      icon: <Code className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      number: 5,
      title: "Instant Crypto Payment",
      description: "Upon approval, the smart contract releases escrowed funds instantly to the freelancer's wallet.",
      icon: <DollarSign className="w-8 h-8" />,
      color: "from-pink-500 to-cyan-500",
    },
    {
      number: 6,
      title: "Build Reputation",
      description: "Both users gain on-chain reputation. Dispute resolution ensures fair outcomes for all parties.",
      icon: <Star className="w-8 h-8" />,
      color: "from-cyan-500 to-purple-500",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className=" flex items-center flex-col mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 border border-cyan-500 text-cyan-400 rounded-full text-sm font-medium">
            HOW IT WORKS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
            Simple Steps to Start Freelancing
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our decentralized platform makes it easy to connect, collaborate, and get paid securely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-[95%] lg:grid-cols-3 gap-8 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
            key={index}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
            }}
            initial={{
              opacity: 0,
              y: index * 40, // small offset for slide
              scale: 0.95, // slight zoom in
              rotate: index % 2 === 0 ? 2 : -2, // subtle rotation
            }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 12,
              delay: index * 0.08,
            }}
            whileHover={{
              
              rotate: 0,
             
            }}
            className="transition-transform duration-200 ease-out"
          >
            <StepCard key={index} step={step} index={index} />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-gray-900/50 backdrop-blur-sm sm:border sm:border-gray-800 rounded-xl md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Ready to Start Your Decentralized Journey?
              </h3>
              <p className="text-gray-400 mb-6 text-lg">
                Join thousands of skilled professionals and clients already collaborating on the future of work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-6 py-3 rounded-lg flex items-center justify-center font-semibold transition-all">
                  Find Work
                </button>
                <button className="border-2 border-gray-600 hover:border-purple-500 text-gray-200 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all">
                  Hire Talent
                </button>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <FeatureList />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default HowItWorksSection;
function StepCard({ step, index }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setIsVisible(true)
      },
      index * 100 + 100,
    )

    return () => clearTimeout(timer)
  }, [index])

  return (
 <div
  className={`relative transition-all duration-700 ease-out ${
    isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-24 scale-95"
  } group`}
>
  <div className="relative bg-gray-900/70 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/70 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 ease-in-out group">
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
  <div className="inline-flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
    <div className="relative w-12 h-12 rounded-lg">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 opacity-20 z-0" />
      <div className="relative z-10 text-white text-xl flex items-center justify-center h-full w-full">
        {step.icon}
      </div>
    </div>
  </div>
  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{step.title}</h3>
  <p className="text-gray-300 leading-relaxed text-sm">{step.description}</p>
</div>
</div>

  )
}

function FeatureList() {
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      title: "Decentralized & Secure",
      description: "No central authority, full blockchain security",
    },
    {
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      title: "Zero Platform Fees",
      description: "Keep 100% of your earnings",
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      title: "Global Marketplace",
      description: "Connect with talent worldwide",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-400" />,
      title: "Instant Payments",
      description: "Get paid immediately upon completion",
    },
  ]

  return (
    <div className="space-y-4">
      <h4 className="text-xl font-bold text-white mb-4">Why Choose CryptoLance?</h4>
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">{feature.icon}</div>
          <div>
            <h5 className="font-semibold text-white mb-1">{feature.title}</h5>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
