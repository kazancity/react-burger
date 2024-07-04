import BurgerIngredientsItemList from "../burger-ingredients-item-list/burger-ingredients-item-list";
import { getIngredients } from "../../services/slices/burger-ingredients-slice";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import styles from "./burger-ingredients.module.css";
import { useEffect, useRef, useState } from "react";
import { GridLoader } from "react-spinners";

const BurgerIngredients = () => {
  const { isLoading, isError, data } = useSelector(
    (state) => state.burgerIngredients,
  );
  const [activeTab, setActiveTab] = useState("bun");
  const dispatch = useDispatch();
  const groupSauceRef = useRef();
  const groupMainRef = useRef();
  const groupBunRef = useRef();
  const tabsRef = useRef();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const processScrollBurgerIngredientsItemList = () => {
    const tabsTopCoord = tabsRef.current.getBoundingClientRect().top;
    const bunTopCoord = groupBunRef.current.getBoundingClientRect().top;
    const sauceTopCoord = groupSauceRef.current.getBoundingClientRect().top;
    const mainTopCoord = groupMainRef.current.getBoundingClientRect().top;
    const arr = [bunTopCoord, sauceTopCoord, mainTopCoord];
    const closestIndex = arr.findIndex(
      (currElem) =>
        currElem ===
        arr.reduce((accum, item) =>
          item - tabsTopCoord <
          (() =>
            accum - tabsTopCoord < 0
              ? 0 - (accum - tabsTopCoord)
              : accum - tabsTopCoord)()
            ? item
            : accum,
        ),
    );

    setActiveTab("bun");
    if (0 === closestIndex) {
      if (activeTab !== "bun") setActiveTab("bun");
    }
    if (1 === closestIndex) {
      if (activeTab !== "sauce") setActiveTab("sauce");
    }
    if (2 === closestIndex) {
      if (activeTab !== "main") setActiveTab("main");
    }
  };

  const processClickTab = (tab) => {
    setActiveTab("bun");
    if ("bun" === tab) {
      groupBunRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if ("sauce" === tab) {
      groupSauceRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if ("main" === tab) {
      groupMainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <GridLoader
        color="#ffd700"
        loading={isLoading}
        cssOverride={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate('-50%', '-50%')",
        }}
      />
      {data && (
        <article>
          <h1>Соберите бургер</h1>
          <div ref={tabsRef} className={styles.items}>
            <Tab
              value="bun"
              active={activeTab === "bun"}
              onClick={processClickTab}
            >
              Булки
            </Tab>
            <Tab
              value="sauce"
              active={activeTab === "sauce"}
              onClick={processClickTab}
            >
              Соусы
            </Tab>
            <Tab
              value="main"
              active={activeTab === "main"}
              onClick={processClickTab}
            >
              Начинки
            </Tab>
          </div>
          <div
            className={styles.items_group}
            onScroll={processScrollBurgerIngredientsItemList}
          >
            <BurgerIngredientsItemList
              ingredients={data}
              title="Булки"
              type="bun"
              ref={groupBunRef}
            />
            <BurgerIngredientsItemList
              ingredients={data}
              title="Соусы"
              type="sauce"
              ref={groupSauceRef}
            />
            <BurgerIngredientsItemList
              ingredients={data}
              title="Начинки"
              type="main"
              ref={groupMainRef}
            />
          </div>
        </article>
      )}
      {isError && <>В процессе загрузки ингредиентов произошла ошибка!</>}
    </>
  );
};

export default BurgerIngredients;
