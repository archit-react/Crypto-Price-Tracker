import { useState, useEffect } from "react";
import axios from "axios";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
}

const CryptoList = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"price" | "name">("price");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const fetchData = () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
      )
      .then((res) => setCryptos(res.data))
      .catch((err) => console.log("api err", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleSort = (field: "price" | "name") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filtered = cryptos
    .filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === "price") {
        return sortOrder === "asc"
          ? a.current_price - b.current_price
          : b.current_price - a.current_price;
      } else {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
    });

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const nextPage = () => setPage((p) => (p < 10 ? p + 1 : p));
  const prevPage = () => setPage((p) => (p > 1 ? p - 1 : 1));

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Top 10 Cryptos</h2>
        <div>
          <button onClick={fetchData} style={styles.btn}>
            Refresh
          </button>
          <button onClick={() => toggleSort("price")} style={styles.btn}>
            Sort Price: {sortOrder.toUpperCase()}
          </button>
          <button onClick={() => toggleSort("name")} style={styles.btn}>
            Sort Name: {sortOrder.toUpperCase()}
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search name/symbol"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.input}
      />

      <div style={styles.grid}>
        {paginated.map((c) => (
          <div key={c.id} style={styles.card}>
            <img src={c.image} alt={c.name} style={styles.img} />
            <h2 style={styles.title}>{c.name}</h2>
            <p style={styles.symbol}>{c.symbol.toUpperCase()}</p>
            <p style={styles.price}>${c.current_price.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div style={styles.pagination}>
        <button onClick={prevPage} style={styles.btn}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={nextPage} style={styles.btn}>
          Next
        </button>
      </div>
    </div>
  );
};

const styles: { [k: string]: React.CSSProperties } = {
  wrapper: {
    padding: "1rem",
    fontFamily: "system-ui, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  heading: {
    margin: 0,
    fontSize: "2.8rem", 
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 700,
    color: "#777" 
  },
  btn: {
    padding: "0.5rem 0.75rem",
    marginLeft: "0.5rem",
    backgroundColor: "#111827",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  input: {
    padding: "0.5rem 1rem",
    width: "100%",
    marginBottom: "1rem",
    fontSize: "1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1rem",
  },
  card: {
    border: "1px solid #eee",
    borderRadius: "0.5rem",
    padding: "1rem",
    textAlign: "center",
  },
  img: {
    width: "50px",
    height: "50px",
  },
  title: {
    margin: "0.5rem 0 0",
    fontSize: "1.2rem",
  },
  symbol: {
    margin: "0.2rem 0",
    color: "#555",
    textTransform: "uppercase",
  },
  price: {
    margin: 0,
    fontWeight: "bold",
  },
  pagination: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
  },
};

export default CryptoList;
