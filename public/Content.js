const Content = ({ section, data, handleData }) => {
  return (
    <section className="content">
      <h1>
        {section} : {data[section]}
      </h1>
      <AddLosser handleData={handleData} data={data} section={section} />
      <DataDisplayer data={data} />
    </section>
  );
};
