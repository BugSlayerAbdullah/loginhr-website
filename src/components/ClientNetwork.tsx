
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLanguage } from "../contexts/LanguageContext";
import { ChartNetwork, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";

interface ClientCategory {
  id: string;
  name: string;
  clients: Client[];
  color: string;
  x?: number;
  y?: number;
}

interface Client {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  x?: number;
  y?: number;
}

interface ClientNetworkProps {
  clientCategories: ClientCategory[];
}

const ClientNetwork: React.FC<ClientNetworkProps> = ({ clientCategories }) => {
  const { language } = useLanguage();
  const networkRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Enhanced color palette for better harmony
  const getCategoryColor = (categoryId: string): string => {
    const colorMap: Record<string, string> = {
      'medical': '#6E59A5', // Soft purple
      'factories': '#E5893D', // Soft orange
      'education': '#51A894', // Teal
      'retail': '#7E69AB', // Purple
      'technology': '#D6707B', // Soft pink
      'finance': '#5B8AD6', // Soft blue
      'construction': '#ABA159', // Soft gold
      'entertainment': '#9B87F5', // Bright purple
      'logistics': '#5B8BC5', // Medium blue
      'agriculture': '#63A86B'  // Medium green
    };
    
    return colorMap[categoryId] || '#8E9196'; // Default to neutral gray if category not found
  }
  
  // Calculate positions based on viewport size and number of clients
  const calculatePositions = () => {
    const isMobile = windowWidth < 768;
    const centerX = windowWidth / 2;
    const centerY = isMobile ? 250 : 300;
    
    // Adjust radius based on number of categories
    const categoryCount = clientCategories.length;
    const radius = isMobile ? 120 : Math.min(230, 180 + (categoryCount * 5));
    
    // Position categories in a circle around the center
    const updatedCategories = [...clientCategories].map((category, index) => {
      const angle = (index / clientCategories.length) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      // Calculate positions for clients in this category
      // Adjust client radius based on number of clients to prevent overcrowding
      const clientCount = category.clients.length;
      const clientRadius = isMobile ? 80 : Math.min(120, 150 - (Math.floor(clientCount / 5) * 10));
      const clients = category.clients.map((client, cIndex) => {
        // Distribute clients more evenly when there are many
        const clientSegment = (2 * Math.PI) / Math.max(6, category.clients.length);
        const clientAngle = cIndex * clientSegment;
        
        const clientX = x + clientRadius * Math.cos(clientAngle);
        const clientY = y + clientRadius * Math.sin(clientAngle);
        return { ...client, x: clientX, y: clientY };
      });
      
      // Update category with the enhanced color
      const enhancedColor = getCategoryColor(category.id);
      
      return { ...category, clients, x, y, color: enhancedColor };
    });
    
    return updatedCategories;
  };
  
  const [positionedCategories, setPositionedCategories] = useState<ClientCategory[]>(() => calculatePositions());
  
  // Handle resize events to recalculate positions
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setPositionedCategories(calculatePositions());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth, clientCategories]);
  
  // Animation for nodes
  useEffect(() => {
    if (!networkRef.current) return;
    
    // Animate categories appearing
    const categoryNodes = networkRef.current.querySelectorAll(".category-node");
    gsap.fromTo(
      categoryNodes,
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.7, 
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)"
      }
    );
    
    // Animate connecting lines
    const lines = networkRef.current.querySelectorAll(".connection-line");
    gsap.fromTo(
      lines,
      { strokeDashoffset: 1000, opacity: 0 },
      { 
        strokeDashoffset: 0, 
        opacity: 0.3, // Reduced opacity for less visual noise
        duration: 1.5, 
        stagger: 0.05,
        ease: "power3.out"
      }
    );
  }, [positionedCategories]);
  
  // Effect for when a category is selected
  useEffect(() => {
    if (!networkRef.current || selectedCategory === null) return;
    
    const categoryNodes = networkRef.current.querySelectorAll(".category-node");
    const selectedNode = networkRef.current.querySelector(`.category-node[data-id="${selectedCategory}"]`);
    const clientNodes = networkRef.current.querySelectorAll(`.client-node[data-category="${selectedCategory}"]`);
    
    // Dim other category nodes
    gsap.to(
      categoryNodes,
      { 
        opacity: 0.3, // More dimming for better focus
        scale: 0.85, // Slightly smaller scale for better contrast
        duration: 0.3
      }
    );
    
    // Highlight selected category
    gsap.to(
      selectedNode,
      { 
        opacity: 1,
        scale: 1.1,
        duration: 0.3
      }
    );
    
    // Animate client nodes appearing
    gsap.fromTo(
      clientNodes,
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.05, // Faster stagger for many clients
        ease: "back.out(1.7)"
      }
    );
  }, [selectedCategory]);
  
  // Reset animation when deselecting
  const handleReset = () => {
    if (!networkRef.current) return;
    
    const categoryNodes = networkRef.current.querySelectorAll(".category-node");
    const clientNodes = networkRef.current.querySelectorAll(".client-node");
    
    // Reset category nodes
    gsap.to(
      categoryNodes,
      { 
        opacity: 1,
        scale: 1,
        duration: 0.3
      }
    );
    
    // Hide client nodes
    gsap.to(
      clientNodes,
      { 
        scale: 0, 
        opacity: 0, 
        duration: 0.3,
        ease: "power2.in"
      }
    );
    
    setSelectedCategory(null);
    setSelectedClient(null);
  };
  
  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      handleReset();
    } else {
      setSelectedCategory(categoryId);
      setSelectedClient(null);
    }
  };

  // Hover animation for category nodes
  const handleCategoryHover = (categoryId: string, isHovering: boolean) => {
    if (!networkRef.current || selectedCategory !== null) return;
    
    const categoryNode = networkRef.current.querySelector(`.category-node[data-id="${categoryId}"]`);
    
    gsap.to(
      categoryNode,
      { 
        scale: isHovering ? 1.08 : 1, // Subtle scale for hover
        boxShadow: isHovering ? `0 0 16px ${getCategoryColor(categoryId)}99` : "0 0 8px rgba(0, 0, 0, 0.1)",
        duration: 0.3
      }
    );
  };
  
  return (
    <div 
      ref={networkRef} 
      className="client-network relative w-full overflow-hidden" 
      style={{ height: windowWidth < 768 ? "800px" : "700px" }}
    >
      {/* SVG Layer for connections */}
      <svg 
        ref={svgRef} 
        className="absolute top-0 left-0 w-full h-full z-0" 
        style={{ pointerEvents: 'none' }}
      >
        {/* Draw lines between categories to show relationships */}
        {positionedCategories.map((category, i) => (
          <React.Fragment key={`connections-${category.id}`}>
            {/* Connect categories that are adjacent in the array */}
            {i < positionedCategories.length - 1 && category.x && category.y && positionedCategories[i + 1].x && positionedCategories[i + 1].y && (
              <path
                className="connection-line"
                d={`M${category.x},${category.y} Q${(category.x + positionedCategories[i + 1].x) / 2},${
                  (category.y + positionedCategories[i + 1].y) / 2 - 50
                } ${positionedCategories[i + 1].x},${positionedCategories[i + 1].y}`}
                fill="none"
                stroke={`url(#gradient-${i})`}
                strokeWidth="1.5" // Thinner lines for less visual clutter
                strokeDasharray="4,4" // Smaller dash pattern
                opacity="0.4" // Slightly reduced opacity
              />
            )}
            
            {/* Connect first and last category to create a closed loop */}
            {i === positionedCategories.length - 1 && category.x && category.y && positionedCategories[0].x && positionedCategories[0].y && (
              <path
                className="connection-line"
                d={`M${category.x},${category.y} Q${(category.x + positionedCategories[0].x) / 2},${
                  (category.y + positionedCategories[0].y) / 2 + 50
                } ${positionedCategories[0].x},${positionedCategories[0].y}`}
                fill="none"
                stroke={`url(#gradient-${i}-0)`}
                strokeWidth="1.5"
                strokeDasharray="4,4"
                opacity="0.4"
              />
            )}
            
            {/* If this category is selected, draw lines to its clients */}
            {selectedCategory === category.id && category.x && category.y && 
              category.clients.map((client, j) => (
                client.x && client.y && (
                  <path
                    key={`client-connection-${client.id}`}
                    className="client-connection-line"
                    d={`M${category.x},${category.y} L${client.x},${client.y}`}
                    fill="none"
                    stroke={category.color}
                    strokeWidth="1"
                    opacity="0.5"
                  />
                )
              ))
            }
          </React.Fragment>
        ))}
        
        {/* Gradient definitions for connections */}
        <defs>
          {positionedCategories.map((category, i) => (
            <React.Fragment key={`gradients-${category.id}`}>
              {/* Gradient for connection to next category */}
              <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={category.color} />
                <stop offset="100%" stopColor={
                  i < positionedCategories.length - 1 
                    ? positionedCategories[i + 1].color 
                    : positionedCategories[0].color
                } />
              </linearGradient>
              
              {/* Gradient for connection from last to first */}
              {i === positionedCategories.length - 1 && (
                <linearGradient id={`gradient-${i}-0`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={category.color} />
                  <stop offset="100%" stopColor={positionedCategories[0].color} />
                </linearGradient>
              )}
            </React.Fragment>
          ))}
        </defs>
      </svg>
      
      {/* Category Nodes */}
      {positionedCategories.map(category => (
        <React.Fragment key={category.id}>
          {category.x && category.y && (
            <div 
              className="category-node absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{ 
                left: category.x, 
                top: category.y,
                background: `linear-gradient(135deg, ${category.color}15, ${category.color}40)`,
                borderColor: category.color 
              }}
              data-id={category.id}
              onClick={() => toggleCategory(category.id)}
              onMouseEnter={() => handleCategoryHover(category.id, true)}
              onMouseLeave={() => handleCategoryHover(category.id, false)}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 flex items-center justify-center shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="text-center">
                  <div 
                    className="flex items-center justify-center mx-auto w-8 h-8 rounded-full mb-1"
                    style={{ backgroundColor: `${category.color}22` }}
                  >
                    <ChartNetwork className="h-4 w-4" style={{ color: category.color }} />
                  </div>
                  <p className="text-xs font-semibold text-gray-700">{category.name}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Client Nodes - smaller size for scalability */}
          {selectedCategory === category.id && 
            category.clients.map(client => (
              client.x && client.y && (
                <HoverCard key={client.id}>
                  <HoverCardTrigger asChild>
                    <div 
                      className={`client-node absolute transform -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 scale-0`}
                      style={{ 
                        left: client.x, 
                        top: client.y,
                        background: `linear-gradient(135deg, white, ${category.color}15)`,
                      }}
                      data-category={category.id}
                      data-id={client.id}
                    >
                      <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-110">
                        {client.logo ? (
                          <div className="w-full h-full relative">
                            <div className="absolute inset-0 bg-white/30 z-10"></div>
                            <img 
                              src={client.logo} 
                              alt={client.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div 
                            className="flex items-center justify-center w-full h-full"
                            style={{ backgroundColor: `${category.color}15` }}
                          >
                            <Users className="h-5 w-5" style={{ color: category.color }} />
                          </div>
                        )}
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-72 p-0 shadow-lg border-none">
                    <Card className="overflow-hidden border-none">
                      {client.logo && (
                        <div className="h-28 w-full overflow-hidden">
                          <img 
                            src={client.logo} 
                            alt={client.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-medium" style={{ color: category.color }}>
                            {category.name}
                          </div>
                        </div>
                      )}
                      <CardContent className="p-4">
                        <h4 className="text-base font-semibold mb-1">{client.name}</h4>
                        {client.description && (
                          <p className="text-xs text-gray-600">{client.description}</p>
                        )}
                      </CardContent>
                    </Card>
                  </HoverCardContent>
                </HoverCard>
              )
            ))
          }
        </React.Fragment>
      ))}
      
      {/* Reset Button */}
      {selectedCategory && (
        <Button
          onClick={handleReset}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30"
          variant="outline"
          size="sm"
        >
          {language === "en" ? "View All Categories" : "عرض جميع الفئات"}
        </Button>
      )}
      
      {/* Center "hub" node */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white shadow-md z-5 flex items-center justify-center border-2 border-gray-100">
        <div className="text-center">
          <div className="flex items-center justify-center mx-auto w-10 h-10 rounded-full bg-gray-50 mb-1">
            <ChartNetwork className="h-5 w-5 text-gray-500" />
          </div>
          <p className="text-xs font-medium text-gray-700">
            {language === "en" ? "Client Network" : "شبكة العملاء"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientNetwork;
