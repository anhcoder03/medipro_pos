import { useDispatch, useSelector } from "react-redux";
import PriceUtils from "../../helper/PriceUtils";
import { updateCartByTabId } from "../../store/slice/cartSlice";

const ResultSearch = ({ data, show = true, loading }) => {
  const dispatch = useDispatch();
  const tabId = useSelector((state) => state?.tabCart?.tabSelected);
  const handleAddCart = (product) => {
    dispatch(
      updateCartByTabId({
        tabId,
        product: {
          _id: product?._id,
          price: product?.price,
          quantity: 1,
          name: product?.name,
        },
      })
    );
  };
  return (
    <>
      {show && (
        <div className="flex flex-col p-3 bg-white rounded-lg overflow-auto max-h-[375px] gap-y-2">
          {/* {loading && <LoadingSearch></LoadingSearch>} */}
          {data?.length > 0
            ? data?.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-start cursor-pointer"
                  onClick={() => handleAddCart(item)}
                >
                  <div className="flex items-start gap-x-3">
                    <img
                      className="w-[70px] h-[70px] object-cover rounded"
                      src={`${
                        item?.image
                          ? item?.image
                          : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                      } `}
                      alt=""
                    />
                    <h3>{item?.name}</h3>
                  </div>
                  <div className="text-primary font-medium">
                    {PriceUtils.format(item?.price)}
                  </div>
                </div>
              ))
            : !loading && (
                <div className="px-5 py-3">Không tìm thấy sản phẩm.</div>
              )}
        </div>
      )}
    </>
  );
};

export default ResultSearch;
