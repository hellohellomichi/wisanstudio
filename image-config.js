// Centralized Image Configuration
// Single source of truth for all website images
const IMAGE_CONFIG = {
  basePath: '../images/',
  
  // Homepage images
  homepage: {
    logo: 'homepage/logo.png',
    hero: 'homepage/134011769155382_.pic_hd.jpg'
  },
  
  // Project images organized by project key
  projects: {
    'wellness-club': {
      title: 'Luxury Gym',
      description: 'A serene luxury wellness retreat featuring minimalist design, natural materials, and tranquil spa facilities. This project combines modern architecture with holistic wellness concepts to create an immersive healing environment.',
      location: 'Venice Beach, CA',
      category: 'commercial',
      folder: '600 Main Hume Lux Gym',
      coverImage: '07292024_Hume_0235_V1.jpg',
      images: [
        '07292024_Hume_0082_V1.jpg',
        '07292024_Hume_0172_V1.jpg',
        '07292024_Hume_0235_V1.jpg',
        '07292024_Hume_0292_V2.jpg',
        '07292024_Hume_0405_V3.jpg',
        '07292024_Hume_sauna.jpg'
      ]
    },
    
    'joshua-tree': {
      title: 'Joshua Tree Airbnb',
      description: 'Luxury Airbnb vacation home, integrating high-end indoor comforts with exceptional outdoor features, creating an immersive desert retreat.',
      location: 'Joshua Tree, CA',
      category: 'residential',
      folder: '678 Polaris Joshua Tree Airbnb',
      coverImage: '1.png',
      images: [
        '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png',
        '9.png', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png', '16.png'
      ]
    },
    
    'single-family-adu': {
      title: 'Single Family+ADU',
      description: 'A thoughtfully designed single-family residence paired with an accessory dwelling unit. This project maximizes the potential of the property while maintaining architectural harmony between the main house and the ADU, creating additional living space and rental income potential.',
      location: 'Los Angeles, CA',
      category: 'residential',
      folder: '3003 Canfield SFD+ADU',
      coverImage: 'SF+ADU_1.jpg',
      images: [
        'SF+ADU_1.jpg', 'SF+ADU_2.jpg', 'SF+ADU_3.jpg', 'SF+ADU_4.png',
        'SF+ADU_5.jpg', 'SF+ADU_6.jpg', 'SF+ADU_7.jpg', 'SF+ADU_8.jpg', 'SF+ADU_9.jpg'
      ]
    },
    
    'luxury-expansion': {
      title: 'Expansion ADU',
      description: 'An elegant home expansion project featuring a modern addition and accessory dwelling unit in Santa Monica. This design seamlessly integrates contemporary architecture with the existing home, creating luxurious additional living space while respecting the neighborhood character.',
      location: 'Santa Monica, CA',
      category: 'residential',
      folder: '205 Georgina Addition+ADU',
      coverImage: '4.jpg',
      images: [
        '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg'
      ]
    },
    
    'multi-apartment': {
      title: 'Multiple Unit Apartment',
      description: 'A contemporary 10-unit apartment building in Hollywood that maximizes density while maintaining quality living spaces. This multi-family residential project features modern amenities and efficient layouts designed for urban living, contributing to the neighborhood\'s housing solutions.',
      location: 'Hollywood, CA',
      category: 'residential',
      folder: '4915 Elmwood 10 unit Apartment',
      coverImage: '1.png',
      images: [
        '1.png', '2.png', '3.jpg', '4.jpg', '5.jpg'
      ]
    },
    
    'multi-condo': {
      title: 'Duplex',
      description: 'A modern duplex development in Inglewood featuring two thoughtfully designed residential units. This project optimizes the site with contemporary architecture while providing quality housing options that enhance the local community and offer excellent investment potential.',
      location: 'Inglewood, CA',
      category: 'residential',
      folder: '642 Fairview Duplex',
      coverImage: '1.png',
      images: [
        '1.png', '2.png', '3.png', '4.png', '5.png', '6.png'
      ]
    },
    
    'family-renovation': {
      title: 'Family Renovation',
      description: 'A comprehensive renovation project in Westwood that transforms an existing family home into a modern living space. This renovation preserves the home\'s character while updating it with contemporary amenities, improved layouts, and energy-efficient features for modern family living.',
      location: 'Westwood, CA',
      category: 'residential',
      folder: '2115 Kerwood Renovation',
      coverImage: '1.png',
      images: [
        '1.png', '2.png', '3.png', '4.jpg'
      ]
    },
    
    'customized-adu': {
      title: 'Customized ADU',
      description: 'A compact yet luxurious accessory dwelling unit in Pasadena, designed to maximize every square foot. This custom ADU features clever space-saving solutions, high-end finishes, and thoughtful design elements that create a comfortable and stylish independent living space.',
      location: 'Pasadena, CA',
      category: 'residential',
      folder: '1950 E Mountain ADU',
      coverImage: '1.jpg',
      images: [
        '1.jpg', '2.png', '3.png', '4.jpg', '5.png', '6.png'
      ]
    },
    
    'tenant-improvement': {
      title: 'General Office TI',
      description: 'A modern tenant improvement project in Anaheim that transforms a commercial space into a stylish dessert restaurant. This design creates an inviting atmosphere with contemporary finishes, efficient kitchen layouts, and customer-focused dining areas that enhance the culinary experience.',
      location: 'Anaheim, CA',
      category: 'commercial',
      folder: '1775 Lincoln TI',
      coverImage: '1.png',
      images: [
        '1.png', '2.png'
      ]
    }
  }
};

// Helper Functions

// Safe URL encoding for file paths - encodes individual path components while preserving path structure
function encodePathComponent(component) {
  // Only encode the component, not path separators
  return encodeURIComponent(component);
}

function getImagePath(category, key, filename = null) {
  const config = IMAGE_CONFIG[category];
  if (!config) return null;

  if (category === 'homepage') {
    if (!filename || !config[filename]) return null;
    // Split the path and encode each component separately
    const imagePath = config[filename];
    const pathParts = imagePath.split('/');
    const encodedPath = pathParts.map(part => encodePathComponent(part)).join('/');
    return `${IMAGE_CONFIG.basePath}${encodedPath}`;
  }

  if (category === 'projects') {
    const project = config[key];
    if (!project) return null;

    const targetFile = filename || project.coverImage;
    if (!targetFile) return null;

    return `${IMAGE_CONFIG.basePath}projects/${encodePathComponent(project.folder)}/${encodePathComponent(targetFile)}`;
  }

  return null;
}

function getHomepageImage(imageKey) {
  return getImagePath('homepage', null, imageKey);
}

function getProjectCoverImage(projectKey) {
  return getImagePath('projects', projectKey);
}

function getProjectGallery(projectKey) {
  const project = IMAGE_CONFIG.projects[projectKey];
  if (!project) return [];

  return project.images.map(filename =>
    `${IMAGE_CONFIG.basePath}projects/${encodePathComponent(project.folder)}/${encodePathComponent(filename)}`
  );
}

function getProjectData(projectKey) {
  return IMAGE_CONFIG.projects[projectKey] || null;
}

function getAllProjects() {
  return Object.keys(IMAGE_CONFIG.projects).map(key => ({
    key,
    ...IMAGE_CONFIG.projects[key]
  }));
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    IMAGE_CONFIG,
    getImagePath,
    getHomepageImage,
    getProjectCoverImage,
    getProjectGallery,
    getProjectData,
    getAllProjects
  };
}

// Global access for browser
window.ImageConfig = {
  IMAGE_CONFIG,
  getImagePath,
  getHomepageImage,
  getProjectCoverImage,
  getProjectGallery,
  getProjectData,
  getAllProjects
};
