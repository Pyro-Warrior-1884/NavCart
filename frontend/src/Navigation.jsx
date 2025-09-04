import React, { useState } from "react";
import FindPath from "./FindPath";
import SelectItems from "./SelectItems";

const NavigationPage = () => {
  const [showFindPath, setShowFindPath] = useState(false);

  const handleBackToItems = () => setShowFindPath(false);

  return (
    <div>
      {showFindPath ? (
        <FindPath onBackToItems={handleBackToItems} />
      ) : (
        <SelectItems />
      )}
    </div>
  );
};

export default NavigationPage;
