const Footer = ({ section, data, handleData }) => {
  return (
    <footer className="header-footer">
      <h1>
        {section} : {data[section]}
      </h1>
      <AddLosser handleData={handleData} data={data} section={section} />
      <DataDisplayer data={data} />
    </footer>
  );
};
