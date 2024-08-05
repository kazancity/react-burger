import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import styles from "./burger-ingredients.module.css";
import { IngredientType, Store } from "../../types";
import { GridLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";

const BurgerIngredients = () => {
  const { isLoading, isError, data } = useSelector(
    (store: Store) => store.burgerIngredients,
  );
  const tabsRef = useRef<HTMLDivElement>(null);
  const groupBunRef = useRef<HTMLHeadingElement>(null);
  const groupSauceRef = useRef<HTMLHeadingElement>(null);
  const groupMainRef = useRef<HTMLHeadingElement>(null);
  const [activeTab, setActiveTab] = useState<IngredientType>("bun");
  const location = useLocation();

  const handleScrollIngredientGroup = () => {
    const tabsTopCoord = tabsRef.current?.getBoundingClientRect().top;
    const bunTopCoord = groupBunRef.current?.getBoundingClientRect().top;
    const sauceTopCoord = groupSauceRef.current?.getBoundingClientRect().top;
    const mainTopCoord = groupMainRef.current?.getBoundingClientRect().top;
    if (tabsTopCoord && bunTopCoord && sauceTopCoord && mainTopCoord) {
      const arr: number[] = [bunTopCoord, sauceTopCoord, mainTopCoord];
      const closestIndex = arr.findIndex(
        (elem: number) =>
          elem ===
          arr.reduce((prev: number, curr: number) =>
            Math.abs(curr - tabsTopCoord) < Math.abs(prev - tabsTopCoord)
              ? curr
              : prev,
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
    }
  };

  const handleClickTab = (tab: string) => {
    setActiveTab("bun");
    if ("bun" === tab) {
      groupBunRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    if ("sauce" === tab) {
      groupSauceRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    if ("main" === tab) {
      groupMainRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <GridLoader
        color="#8585ad"
        loading={isLoading}
        cssOverride={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate('-50%', '-50%')",
        }}
      />
      {isError && <>Ошибка при загрузке ингредиентов</>}
      {data && (
        <article>
          <h1>Соберите бургер</h1>
          <div ref={tabsRef} className={`${styles.items} mb-10`}>
            <Tab
              value="bun"
              active={activeTab === "bun"}
              onClick={handleClickTab}
            >
              Булки
            </Tab>
            <Tab
              value="sauce"
              active={activeTab === "sauce"}
              onClick={handleClickTab}
            >
              Соусы
            </Tab>
            <Tab
              value="main"
              active={activeTab === "main"}
              onClick={handleClickTab}
            >
              Начинки
            </Tab>
          </div>
          <div
            className={styles.items_group}
            onScroll={handleScrollIngredientGroup}
          >
            <section>
              <h2 className="text text_type_main-medium" ref={groupBunRef}>
                Булки
              </h2>
              <ul className={styles.list}>
                {data
                  .filter((ingredient) => ingredient.type === "bun")
                  .map((ingredient) => (
                    <Link
                      className={styles.link}
                      key={ingredient._id}
                      to={`/ingredients/${ingredient._id}`}
                      state={{ backgroundLocation: location }}
                    >
                      <BurgerIngredientsItem
                        key={ingredient._id}
                        ingredient={ingredient}
                      />
                    </Link>
                  ))}
              </ul>
            </section>
            <section>
              <h2 className="text text_type_main-medium" ref={groupSauceRef}>
                Соусы
              </h2>
              <ul className={styles.list}>
                {data
                  .filter((ingredient) => ingredient.type === "sauce")
                  .map((ingredient) => (
                    <Link
                      className={styles.link}
                      key={ingredient._id}
                      to={`/ingredients/${ingredient._id}`}
                      state={{ backgroundLocation: location }}
                    >
                      <BurgerIngredientsItem
                        key={ingredient._id}
                        ingredient={ingredient}
                      />
                    </Link>
                  ))}
              </ul>
            </section>
            <section>
              <h2 className="text text_type_main-medium" ref={groupMainRef}>
                Начинки
              </h2>
              <ul className={styles.list}>
                {data
                  .filter((ingredient) => ingredient.type === "main")
                  .map((ingredient) => (
                    <Link
                      className={styles.link}
                      key={ingredient._id}
                      to={`/ingredients/${ingredient._id}`}
                      state={{ backgroundLocation: location }}
                      replace={true}
                    >
                      <BurgerIngredientsItem
                        key={ingredient._id}
                        ingredient={ingredient}
                      />
                    </Link>
                  ))}
              </ul>
            </section>
          </div>
        </article>
      )}
    </>
  );
};

export default BurgerIngredients;
