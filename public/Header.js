const Header = ({ section, data, handleData }) => {
  return (
    <header className="header-footer">
      <h1>
        {section} : {data[section]}
      </h1>
      <AddLosser handleData={handleData} data={data} section={section} />
      <DataDisplayer data={data} />
    </header>
  );
};
