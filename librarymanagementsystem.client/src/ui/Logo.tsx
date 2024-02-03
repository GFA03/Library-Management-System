import React from "react";

const Logo: React.FC = () => {
  const logoSrc = "libraryLogo.jpg";

  return (
    <div className="text-center">
      <img src={logoSrc} alt="Library Logo" className="h-24 mx-auto" />
    </div>
  );
};

export default Logo;
