import GigHeader from "../../Components/gig/GigHeader";
import ImageShowcase from "../../Components/gig/ImageShowcase";
import ProHandleSection from "../../Components/gig/ProHandleSection";
import ProjectDetails from "../../Components/gig/ProjectDetails";
import ServiceTiersTable from "../../Components/gig/ServiceTiersTable";
import FAQSection from "../../Components/gig/FAQSection";
import ProjectSteps from "../../Components/gig/ProjectSteps";
import AboutSection from "../../Components/gig/AboutSection";
import ServiceSidebar from "../../Components/gig/ServiceSidebar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/Navbar";
import { fetchGig } from "../../store/gigSlice/gigSlice"; // Adjust path

const GigPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { formData, packageData, loading, error } = useSelector((state) => state.gig);

  useEffect(() => {
    dispatch(fetchGig(id));
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-xl">
        Loading gig data...
      </div>
    );
  }

  if (error || !formData.title) { // Check if formData is populated
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-red-500 text-xl">
        Error loading gig: {error || "No gig data available"}
      </div>
    );
  }

  // Map Redux state to props expected by child components
  const gigProps = {
    username: formData.username,
    avatar: formData.avatar,
    rating: 0, // Placeholder; replace with actual rating logic if available
    title: formData.title,
    about: formData.about || formData.description, // Use about or fall back to description
    badges: formData.badges || [],
    images: formData.images || [{ url: "" }],
    description: formData.description,
    skills: formData.skills || [],
    tags: formData.tags || [],
    faqs: formData.faqs || [],
    location: formData.location,
    basic: packageData.basic,
    standard: packageData.standard,
    pro: packageData.pro,
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-screen pb-12 bg-gradient-to-br relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mt-[100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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