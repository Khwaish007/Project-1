import React, { useEffect } from 'react';
import { 
  XMarkIcon, 
  CalendarDaysIcon, 
  ClockIcon, 
  UserCircleIcon, 
  BuildingOffice2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  VideoCameraIcon,
  PhotoIcon // Add PhotoIcon
} from '@heroicons/react/24/outline';

// Helper to create embeddable video URL for various sources
const getVideoEmbed = (url) => {
  if (!url) return null;

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    const pathname = urlObj.pathname;

    // YouTube
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      const videoId = hostname.includes('youtu.be') ? pathname.slice(1) : urlObj.searchParams.get('v');
      if (videoId) {
        return { type: 'iframe', src: `https://www.youtube.com/embed/${videoId}` };
      }
    }

    // Vimeo
    if (hostname.includes('vimeo.com')) {
      const videoId = pathname.split('/').pop();
      if (videoId && !isNaN(videoId)) {
        return { type: 'iframe', src: `https://player.vimeo.com/video/${videoId}` };
      }
    }

    // Direct video files
    if (pathname.endsWith('.mp4') || pathname.endsWith('.webm') || pathname.endsWith('.ogg')) {
      return { type: 'video', src: url };
    }

    return null; // URL is not a supported video format
  } catch (error) {
    // Handle cases where the URL is invalid
    return null;
  }
};

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  if (!images || images.length === 0) return null;

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative h-64 md:h-96 w-full overflow-hidden group/slider rounded-lg bg-gray-800">
      <div
        className="w-full h-full bg-contain bg-no-repeat bg-center transition-transform duration-500 ease-in-out"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>
      {images.length > 1 && (
        <>
          <button onClick={goToPrevious} className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-opacity">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button onClick={goToNext} className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-opacity">
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
};

const ProjectDetailModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  const embedInfo = getVideoEmbed(project.videoUrl);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gray-900/80 backdrop-blur-md p-6 border-b border-gray-700 z-10">
          <h2 className="text-3xl font-bold text-white">{project.projectTitle}</h2>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <XMarkIcon className="w-8 h-8" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Video Section */}
          {project.videoUrl && (
            <div>
              <h3 className="text-xl font-semibold text-indigo-400 mb-3 flex items-center">
                <VideoCameraIcon className="w-6 h-6 mr-2" />
                Project Video
              </h3>
              {embedInfo ? (
                <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                  {embedInfo.type === 'iframe' ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={embedInfo.src}
                      title="Project Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      width="100%"
                      height="100%"
                      controls
                      src={embedInfo.src}
                      className="rounded-lg"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ) : (
                <div className="aspect-video w-full bg-black rounded-lg overflow-hidden flex items-center justify-center text-gray-400">
                  <VideoCameraIcon className="w-10 h-10 mr-2"/> Invalid or unsupported video URL.
                </div>
              )}
            </div>
          )}

          {/* Image Slider Section */}
          {project.imageUrls && project.imageUrls.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-indigo-400 mb-3 flex items-center">
                <PhotoIcon className="w-6 h-6 mr-2" />
                Image Gallery
              </h3>
              <ImageSlider images={project.imageUrls} />
            </div>
          )}

          {/* Project Details */}
          <div>
            <h3 className="text-xl font-semibold text-indigo-400 mb-3">Project Details</h3>
            <p className="text-gray-300 leading-relaxed">{project.projectDetails}</p>
          </div>

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-indigo-400 mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-700 text-indigo-300 text-sm font-medium rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-700">
            <div className="flex items-center text-gray-400">
              <UserCircleIcon className="w-6 h-6 mr-3 text-blue-400" />
              <div>
                <strong>Client:</strong> <span className="text-white">{project.name}</span>
              </div>
            </div>
            {project.companyName && (
              <div className="flex items-center text-gray-400">
                <BuildingOffice2Icon className="w-6 h-6 mr-3 text-blue-400" />
                <div>
                  <strong>Company:</strong> <span className="text-white">{project.companyName}</span>
                </div>
              </div>
            )}
            <div className="flex items-center text-gray-400">
              <CalendarDaysIcon className="w-6 h-6 mr-3 text-green-400" />
              <div>
                <strong>Timeline:</strong> <span className="text-white">{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center text-gray-400">
              <ClockIcon className="w-6 h-6 mr-3 text-yellow-400" />
              <div>
                <strong>Completed:</strong> <span className="text-white">{new Date(project.completedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;