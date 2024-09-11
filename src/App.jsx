import "./App.css";
import ContentContainer from "./components/ContentContainer/ContentContainer";
import Table from "./components/Table/Table";

function App() {
  return (
    <div className="App">
      <ContentContainer>
        <Table />
      </ContentContainer>
    </div>
  );
}

export default App;
