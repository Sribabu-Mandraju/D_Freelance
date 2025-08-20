import { Briefcase, Github, Twitter, MessageCircle, FileText, HelpCircle } from "lucide-react"

const Footer = () => {
  return (
    <footer className="w-full bg-gray-950 border-t border-gray-800 py-12 px-4">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-full p-2">
                <Briefcase className="w-full h-full text-white" />
              </div>
              <span className="text-2xl font-orbitron font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500">
                CryptoLance
              </span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              The world's first truly decentralized freelance platform. Connect, collaborate, and get paid instantly
              with cryptocurrency.
            </p>
            <div className="flex space-x-4">
              <SocialIcon type="github" href="https://github.com/cryptolance" icon={<Github className="w-5 h-5" />} />
              <SocialIcon
                type="twitter"
                href="https://twitter.com/cryptolance"
                icon={<Twitter className="w-5 h-5" />}
              />
              <SocialIcon
                type="discord"
                href="https://discord.gg/cryptolance"
                icon={<MessageCircle className="w-5 h-5" />}
              />
            </div>
          </div>

          <FooterLinks
            title="Platform"
            links={[
              { name: "Browse Jobs", href: "/browse-jobs" },
              { name: "Post a Job", href: "/post-job" },
              { name: "Find Freelancers", href: "/freelancers" },
              { name: "How It Works", href: "#how-it-works" },
            ]}
          />

          <FooterLinks
            title="Categories"
            links={[
              { name: "Web Development", href: "/categories/web-dev" },
              { name: "Smart Contracts", href: "/categories/smart-contracts" },
              { name: "UI/UX Design", href: "/categories/design" },
              { name: "Content Writing", href: "/categories/writing" },
            ]}
          />

          <FooterLinks
            title="Support"
            links={[
              { name: "Help Center", href: "/help", icon: <HelpCircle className="w-4 h-4" /> },
              { name: "Documentation", href: "/docs", icon: <FileText className="w-4 h-4" /> },
              { name: "Community", href: "/community" },
              { name: "Contact Us", href: "/contact" },
            ]}
          />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-500">
                &copy; {new Date().getFullYear()}{" "}
                <span className="font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500">
                  CryptoLance
                </span>{" "}
                All rights reserved.
              </p>
              <p className="text-gray-600 text-sm mt-1">Built on blockchain technology for a decentralized future.</p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/security" className="text-gray-400 hover:text-white transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer;
function FooterLinks({ title, links }) {
  return (
    <div>
      <h3 className="font-bold text-lg mb-4 text-white">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
            >
              {link.icon && (
                <span className="text-gray-500 group-hover:text-purple-400 transition-colors">{link.icon}</span>
              )}
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialIcon({ type, href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800 group"
    >
      <span className="group-hover:text-purple-400 transition-colors">{icon}</span>
    </a>
  )
}
