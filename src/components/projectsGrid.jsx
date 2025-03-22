import { useState, useEffect, useMemo } from "react";
import LoadingSpinner from "./ui/LoadingSpinner";
import ErrorMessage from "./ui/ErrorMessage";
import ProjectCard from "./projectCard";
import Pagination from "./pagination";

const API_URL = "https://crm.server.pro-part.es/api/v1/secondary-projects/integration/projects";
const ACCESS_KEY = "A7gjfjj0WdBynt8d";
const SECRET_KEY = "tGH5UlZcgNtAPrfq9MnmMhWji9j5vYXn";
const PAGE_SIZE = 9;

export default function ProjectsGrid() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);

  const fetchProjects = async (page) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}?accessKey=${ACCESS_KEY}&secretKey=${SECRET_KEY}&isPagination=true&size=${PAGE_SIZE}&page=${page}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data) {
        setProjects(data);
        setTotalPages(data.totalPages || 1);
      } else {
        setProjects([]);
        setTotalPages(0);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Не вдалося завантажити проєкти. Спробуйте пізніше.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getFallbackProjects = useMemo(() => {
    
    return projects.projects?.map((item, index) => ({
      id: item._id,
      title: item.generalInfo.name,
      price: item.generalInfo.price,
      address: `${item.generalInfo.province}, ${item.generalInfo.name}`,
      beds: parseInt(item.generalInfo.rooms, 10),
      baths: item.generalInfo.bathrooms,
      area: item.generalInfo.size,
      isNew: index % 3 === 0, 
      images: item.images.slice(0, 3).map((image) => image.medium),
    }));
  }, [projects]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => fetchProjects(currentPage)} />;
  }

  const displayProjects = projects.length > 0 ? projects : getFallbackProjects;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages || Math.ceil(getFallbackProjects.length / PAGE_SIZE)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}