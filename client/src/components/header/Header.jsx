import "./header.css";
import { colors } from "../../settings/Colors";

const Header = ({ categories }) => {
  return (
    <div
      className="header"
      style={{
        gridTemplateColumns: `repeat(${categories.length}, 1fr)`,
      }}
    >
      {categories.map((category, index) => (
        <div
          key={index}
          style={{ backgroundColor: `${colors[index]}` }}
          className={`headerGridColumn column-${index}`}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Header;
