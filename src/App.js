import RequestServerApi from "./components/RequestServerApi";

function App() {

  const TableContent = ({data}) => {
    return (
      <table className="mb-3">
        <thead>
          <tr>
            <td className="w-[80%]">quote</td>
            <td className="w-[20%]">author</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
                <td>{item.quote}</td>
                <td>{item.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}

  return (
    <div className="App">
      <h1 className="text-[20px] font-bold text-center">Цитаты великих людей</h1>
      <RequestServerApi
        apiQuery='quotes'
        name_component={TableContent}
        path_to_data_json='.data.quotes'
      />
    </div>
  );
}

export default App;
