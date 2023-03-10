import "./header.css";

const Header = ({ columns, categories }) => {
  return (
    <div
      className="header"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {categories.map((category, index) => (
        <div key={index} className={`headerGridColumn column-${index}`}>
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Header;
