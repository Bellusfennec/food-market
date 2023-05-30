import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductByIdHTTP } from "../../../app/http/productHTTP";
import { Loading } from "../../../common/components/ui/loading";
import { createForm } from "../../../common/utils/form";

const DetailProduct = () => {
  const { page, productId } = useParams();
  const [productForm, setForm] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await getProductByIdHTTP(productId);
      if (response.ok) {
        const newForm = createForm(response.data);
        setForm(newForm);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  if (!productForm) {
    return <Loading />;
  }
  return <div>Страница товара</div>;
};

export default DetailProduct;
