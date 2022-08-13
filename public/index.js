function DataDisplayer({ data }) {
  return (
    <div className="data-display">
      Header:{data.header} Left:{data.left} Content:{data.content} Right:
      {data.right} Footer: {data.footer}
    </div>
  );
}

function AddLosser({ section, data, handleData }) {
  function handle(e) {
    if (e.target.id === "plus") {
      handleData({ name: section, value: 1 });
    } else if (e.target.id === "minus") {
      handleData({ name: section, value: -1 });
    }
  }
  return (
    <>
      <img
        src={`./icons/${section}_plus.png`}
        id="plus"
        onClick={(e) => {
          handle(e);
        }}
      />
      <img
        src={`./icons/${section}_minus.png`}
        id="minus"
        onClick={(e) => {
          handle(e);
        }}
      />
    </>
  );
}

function update(section, value) {
  return new Promise((resolve, reject) => {
    var url = `/update/${section}/${value}`;
    superagent.get(url).end(function (err, res) {
      err ? reject(null) : resolve(res.body);
    });
  });
}

function read() {
  return new Promise((resolve, reject) => {
    var url = "/data";
    superagent.get(url).end(function (err, res) {
      err ? reject(null) : resolve(res.body);
    });
  });
}

const App = () => {
  const [data, setData] = React.useState({
    header: 0,
    left: 0,
    content: 0,
    right: 0,
    footer: 0,
  });

  React.useEffect(() => {
    const response = read().then((res) => {
      setData(res);
    });
  }, []);

  const handleData = (section) => {
    const response = update(section.name, section.value).then((res) => {
      setData(res);
    });
  };
  return (
    <div className="app-container flex-cent">
      <Header handleData={handleData} section="header" data={data} />
      <div className="mid-section flex-cent">
        <SidePane handleData={handleData} section="left" data={data} />
        <Content handleData={handleData} section="content" data={data} />
        <SidePane handleData={handleData} section="right" data={data} />
      </div>
      <Footer handleData={handleData} section="footer" data={data} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
