import GigHeader from "../../Components/gig/GigHeader";
import ImageShowcase from "../../Components/gig/ImageShowcase";
import ProHandleSection from "../../Components/gig/ProHandleSection";
import ProjectDetails from "../../Components/gig/ProjectDetails";
import ServiceTiersTable from "../../Components/gig/ServiceTiersTable";
import FAQSection from "../../Components/gig/FAQSection";
import ProjectSteps from "../../Components/gig/ProjectSteps";
import AboutSection from "../../Components/gig/AboutSection";
import ServiceSidebar from "../../Components/gig/ServiceSidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Loader from "../../Components/Loader";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const GigPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gigData, setGigData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch gig data directly from API
  useEffect(() => {
    const fetchGigData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://cryptolance-server.onrender.com/api/gigs/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setGigData(data);
      } catch (error) {
        console.error("Error fetching gig:", error);
        setError(error.message || "Failed to fetch gig data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGigData();
    }
  }, [id]);

  if (loading) {
    return <Loader caption="Gig Details" />;
  }

  const handleBack = () => {
    navigate("/gigs");
  };
  if (error || !gigData || !gigData.title) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-red-500 text-xl">
        Error loading gig: {error || "No gig data available"}
      </div>
    );
  }

  // Map API data to props expected by child components
  const gigProps = {
    username: gigData.username,
    avatar: gigData.avatar,
    rating: 0, // Placeholder; replace with actual rating logic if available
    title: gigData.title,
    about: gigData.about || gigData.description, // Use about or fall back to description
    badges: gigData.badges || [],
    images: gigData.images || [{ url: "" }],
    description: gigData.description,
    skills: gigData.skills || [],
    tags: gigData.tags || [],
    faqs: gigData.faqs || [],
    location: gigData.location,
    basic: gigData.basic,
    standard: gigData.standard,
    pro: gigData.pro,
    freelancerId: gigData.freelancerId, // Include freelancerId from API response
  };

  console.log("gigProps", gigProps);

  return (
    <>
      <Navbar />
      <div className="min-h-screen pb-12 bg-gradient-to-br relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mt-[100px] mx-auto px-4 sm:px-6  relative z-10">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors duration-200 hover:shadow-lg hover:shadow-cyan-500/20 p-2 rounded-lg group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-2px] transition-transform duration-200" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:from-cyan-300 group-hover:to-blue-300">
              Back to Gigs
            </span>
          </button>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <GigHeader
                username={gigProps.username}
                avatar={gigProps.avatar}
                rating={gigProps.rating}
                title={gigProps.title}
                about={gigProps.about}
                badges={gigProps.badges}
              />
              <ImageShowcase images={gigProps.images} />
              <ProHandleSection />
              <ProjectDetails
                description={gigProps.description}
                skills={gigProps.skills}
                tags={gigProps.tags}
              />
              <ServiceTiersTable
                basic={gigProps.basic}
                standard={gigProps.standard}
                pro={gigProps.pro}
              />
              <FAQSection faqs={gigProps.faqs} />
              <ProjectSteps username={gigProps.username} />
              <AboutSection
                id={gigProps.freelancerId}
                avatar={gigProps.avatar}
                username={gigProps.username}
                tags={gigProps.tags}
                skills={gigProps.skills}
                about={gigProps.about}
                location={gigProps.location}
              />
            </div>

            {/* Right Sidebar */}
            <ServiceSidebar
              basic={gigProps.basic}
              standard={gigProps.standard}
              pro={gigProps.pro}
              username={gigProps.username}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GigPage;
