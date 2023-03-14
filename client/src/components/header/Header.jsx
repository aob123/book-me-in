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
              <category.icon size="30" color="white" />
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
