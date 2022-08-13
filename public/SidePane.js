const SidePane = ({ section, data, handleData }) => {
  return (
    <aside className="side-panes">
      <h1>
        {section} : {data[section]}
      </h1>
      <AddLosser handleData={handleData} data={data} section={section} />
      <DataDisplayer data={data} />
    </aside>
  );
};
