const CartTable = ({ item, handleRemoveCart}) => {
  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">#{item._id.slice(0,5)}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <img
            src={item.image}
            alt={item.title}
            className="h-16 w-16 object-cover rounded"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {item.title}
          {item?.variants?.length > 0 && (
            <div className="mt-1">
              {item.variants.map((variant, idx) => (
                <span key={idx} className="flex items-center gap-2 mb-2">
                  <button
                    key={idx}
                    style={{ backgroundColor: variant.color }}
                    className={`color-option w-5 h-5 rounded-full mr-2
                    }`}
                  ></button>
                  <button className="px-3 py-1 bg-blue-200 rounded-md">
                    {variant.size}
                  </button>{" "}
                  {"x"}{" "}
                  <button className="px-2 py-1 bg-blue-200 rounded-md">
                    {variant.quantity}
                  </button>
                </span>
              ))}
            </div>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {item.prices.discounted
            ? item.prices.discounted
            : item.prices.original}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {item.prices.discounted
            ? item.prices.discounted * item.quantity
            : item.prices.original * item.quantity}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-red-500">
          <button onClick={() => handleRemoveCart(item._id)}>Remove</button>
        </td>
      </tr>
      </>
  );
};

export default CartTable;
