const Widget = () => {
  return (
    <>
      <div className=" h-[790px]  max-h-[790px]">
        <iframe
          className=" rounded-sm mb-4"
          src={process.env.LINK_VEDIO}
          height="450"
          width="380"
          title="Embedded post"
        ></iframe>
        {/* <iframe
          className=" rounded-sm mb-4"
          src={process.env.Link2}
          height="450"
          width="380"
          title="Embedded post"
        ></iframe> */}
      </div>
    </>
  );
};

export default Widget;
