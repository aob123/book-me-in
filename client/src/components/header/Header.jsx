import "./header.css";

const Header = ({ categories, handleView }) => {
  return (
    <header>
      <div className="headerButton" onClick={handleView}>
        <p>Add booking</p>
      </div>
      <div
        className="header"
        style={{
          gridTemplateColumns: `repeat(${categories.length}, 1fr)`,
        }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            style={{ backgroundColor: `${category.color}` }}
            className={`headerGridColumn column-${index}`}
          >
            <div className="headerIcon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="30"
                viewBox="0 0 612 512"
                // preserveAspectRatio="xMinYMin meet"
              >
                {/* Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                <path fill="white" d={category.icon} />
              </svg>
            </div>
            <div className="headerCatName">
              <h1>{category.name}</h1>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
