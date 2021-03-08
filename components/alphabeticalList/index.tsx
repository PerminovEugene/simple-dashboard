import React from "react";
import styles from "./alphabeticalList.module.css";

interface Item {
  id: number;
}

interface AlphabeticalListProps<T extends Item> {
  items: T[];
  fieldForNaming: string;
  onSelect: (id: number) => void;
  selectedId?: number;
  emptyListText: string;
  children: any;
}

const AlphabeticalList = <T extends Item>({
  items,
  children,
  fieldForNaming,
  onSelect,
  selectedId,
  emptyListText,
}: AlphabeticalListProps<T>) => {
  let previousFirstLetter = "";
  return (
    <ul className={styles.list}>
      {!items.length && <div>{emptyListText}</div>}
      {!!items.length &&
        items.map((item) => {
          const childrenWithProps = React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { item } as any);
            }
            return child;
          });
          const firstLetter = item[fieldForNaming][0].toUpperCase();
          const result = [];
          if (previousFirstLetter !== firstLetter) {
            previousFirstLetter = firstLetter;
            result.push(
              <li
                className={`${styles.listItem} ${styles.firstLetter}`}
                key={`list-letter-item-${item[fieldForNaming][0]}`}
              >
                {firstLetter}
              </li>
            );
          }
          result.push(
            <li
              className={`${styles.listItem} ${
                item.id === selectedId ? styles.selected : ""
              }`}
              onClick={() => onSelect(item.id)}
              key={`list-item-${item[fieldForNaming]}-${item.id}`}
            >
              {childrenWithProps}
            </li>
          );
          return result;
        })}
    </ul>
  );
};
export default AlphabeticalList;
