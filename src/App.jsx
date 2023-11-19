import "./App.css";
import { useState, useEffect } from "react";

const url = `https://api.coincap.io/v2/assets`;

function App() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);

        if (json.data && json.data.length > 0) {
          setAssets(json.data);
          setLoading(false);
        }
      } catch (error) {
        // Handle errors here if necessary
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h3 className="text-center text-white">Crypto by 4rian</h3>

            <div className="mb-3">
              <input
                type="text"
                placeholder="Search by name or symbol"
                value={searchTerm}
                onChange={handleSearch}
                className="form-control"
              />
            </div>

            <button
              className="btn btn-primary mb-3"
              onClick={() => window.location.reload(false)}
            >
              Reload
            </button>
            <table className="table table-dark table-striped rounded border-0">
              <thead className="rounded">
                <tr>
                  <th scope="col">Ranking</th>
                  <th scope="col">Name</th>
                  <th scope="col">Symbol</th>
                  <th scope="col">Price (USD)</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
                  <tr key={asset.id}>
                    <td> {asset.rank}</td>
                    <td> {asset.name}</td>
                    <td>{asset.symbol}</td>
                    <td> {asset.priceUsd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
