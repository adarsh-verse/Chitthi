const ReceiverMessage = ({ message, image, name, time }) => {
  return (
    <div className="flex flex-col items-start mb-2 pl-6">
      <div className="w-fit max-w-[70%] bg-white px-3 py-2 rounded-xl rounded-tl-none shadow-sm">
      
        {name && (
          <p className="text-[11px] text-gray-500 mb-[2px]">{name}</p>
        )}

 
        {image && (
          <div className="mb-1">
            <img
              src={image}
              alt="received"
              className="rounded-lg max-h-60 object-cover"
            />
          </div>
        )}

        {message && (
          <p className="text-gray-800 text-[14px] leading-tight">
            {message}
          </p>
        )}

        {time && (
          <p className="text-[10px] text-gray-400 text-right mt-[2px]">
            {time}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReceiverMessage;
