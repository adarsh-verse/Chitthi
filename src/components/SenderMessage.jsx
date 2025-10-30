const SenderMessage = ({ message, image, time }) => {
  return (
    <div className="flex justify-end mb-2 pr-6">
      <div className="w-fit max-w-[70%] bg-green-100 px-3 py-2 rounded-xl rounded-tr-none shadow-sm">
        {image && (
          <div className="mb-1">
            <img
              src={image}
              alt="sent"
              className="rounded-lg max-h-60 object-cover"
            />
          </div>
        )}

      
        {message && (
          <p className="text-gray-800 text-[14px] leading-tight wrap-break-word">
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

export default SenderMessage;
