import { useState } from "react"
import ImageSlider from "./imageSlider"
import { BathIcon, BedIcon, HeartIcon, MapPinIcon, SquareIcon } from "./ui/Icons"
import { formatPrice } from "../utils/formatPrice"


export default function ProjectCard({ project }) {
    const [isFavorite, setIsFavorite] = useState(false)
  
    const toggleFavorite = (e) => {
      e.preventDefault()
      e.stopPropagation()
      setIsFavorite(!isFavorite)
    }
  

    return (
      <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <ImageSlider images={project.images} />
  
          {project.isNew && (
            <div className="absolute top-4 left-4 bg-teal-600 text-white px-4 py-2 rounded-full font-semibold z-10">
              NEW BUILDING
            </div>
          )}
  
          <button
            onClick={toggleFavorite}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md z-10"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <HeartIcon
              className={`w-6 h-6 ${isFavorite ? "text-red-500" : "text-gray-500"}`}
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>
  
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-bold text-gray-800">{project.title}</h3>
            <p className="text-2xl font-bold text-orange-500">{formatPrice(project.price)}</p>
          </div>
  
          <div className="flex items-center text-gray-600 mb-4">
            <MapPinIcon className="w-5 h-5 mr-1" />
            <p>{project.address}</p>
          </div>
  
          <div className="flex justify-between border-t pt-4">
            <div className="flex items-center text-gray-600">
              <BedIcon className="w-5 h-5 mr-2" />
              <span>{project.beds} Beds</span>
            </div>
  
            <div className="flex items-center text-gray-600">
              <BathIcon className="w-5 h-5 mr-2" />
              <span>{project.baths} Baths</span>
            </div>
  
            <div className="flex items-center text-gray-600">
              <SquareIcon className="w-5 h-5 mr-2" />
              <span>{project.area} sqft</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  