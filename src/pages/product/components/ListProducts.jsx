import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./ListProducts.module.scss";
import { getCategoriesListHTTP } from "../../../app/http/categoryHTTP";
import { getProductsListHTTP } from "../../../app/http/productHTTP";
import {
  MdCurrencyRuble,
  MdFavorite,
  MdFavoriteBorder,
  MdStar,
} from "react-icons/md";
import { Loading } from "../../../common/components/ui/loading";
import Divider from "../../../common/components/ui/divider";
import { Button, SearchInput } from "../../../common/components/ui/form";
import Nav from "./Nav";
import Tags from "./Tags";

const ListProducts = () => {
  const [loading, setLoading] = useState(true);
  const [INIT_PRODUCTS, setINIT_PRODUCTS] = useState(false);
  const [products, setProducts] = useState(false);
  const [categories, setCategories] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await getProductsListHTTP();
      if (response.ok) {
        setINIT_PRODUCTS(response.data);
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategoriesListHTTP();
      if (response.ok) {
        setCategories(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const handlerSelectedCategory = (name) => {
    if (name === "") return setProducts(INIT_PRODUCTS);
    const filtredProducts = INIT_PRODUCTS.filter(
      ({ category }) => category === name
    );
    setProducts(filtredProducts);
  };

  return (
    <>
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      {!loading && (
        <>
          <header className={style.header}>
            <img src="/image/page-2.jpg" alt="" />
            <h2 className={style.textHeader}>Меню</h2>
            <div className={style.filterHeader}></div>
          </header>
          <Nav options={categories} onClick={handlerSelectedCategory} />
          <Tags options={categories} />
          <div className={style.container}>
            {products.length > 0 &&
              products.map(({ title, uuid, category }, i) => (
                <div key={uuid} className={style.item}>
                  <div className={style.image}>
                    <img src={`/image/${i}.jpg`} alt={title} />
                  </div>
                  <div className={style.main}>
                    <Link
                      to={`/product/detail/${uuid}`}
                      className={style.label}
                    >
                      <h3>{title}</h3>
                    </Link>
                    <div className={style.info}>
                      <div className={style.action}>
                        <div className={style.rating}>
                          <MdStar /> <span>4.5/5</span>
                        </div>
                        <div className={style.favorite}>
                          {false ? <MdFavorite /> : <MdFavoriteBorder />}{" "}
                          <span>Избранное</span>
                        </div>
                      </div>
                      <div className={style.price}>
                        <div className={style.discount}>
                          <div>Скидка -30%</div>
                          <span>
                            129 <MdCurrencyRuble />
                          </span>
                        </div>
                        <div className={style.regular}>
                          {" "}
                          99 <MdCurrencyRuble />
                        </div>
                      </div>
                    </div>
                    <div className={style.button}>
                      <Button type="button">В корзину</Button>
                    </div>
                  </div>
                </div>
              ))}
            {products.length === 0 && <div>Не найдено</div>}
            {!products && <div>Нет продуктов</div>}
          </div>
        </>
      )}
    </>
  );
};

export default ListProducts;
