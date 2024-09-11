import React, { useEffect, useState } from "react";
import json from "../../data/data.json";
import s from "./Table.module.css";
import cn from "classnames";
import ChartComponent from "../char/ChartComponent";

const Table = () => {
  const [data, setData] = useState([]);
  const [chartVisible, setChartVisible] = useState({});
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setData(json);
  }, [json]);

  const handleClick = (name) => {
    setChartVisible((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleChangeIndex = (index) => {
    setIndex(index);
  }

  return (
    <table className={s.table}>
      <thead>
        <tr className={s.headerRow}>
          <th className={s.headerCell}>Показатель</th>
          <th className={s.headerCell}>Текущий день</th>
          <th className={s.headerCell}>Вчера</th>
          <th className={s.headerCell}>Этот день</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          const currentDay = item.values[item.values.length - 1];
          const yesterday = item.values[item.values.length - 2];
          const percentageChange =
            yesterday !== 0 ? ((currentDay - yesterday) / yesterday) * 100 : 0;

          return (
            <>
              <tr
                onClick={() => handleClick(item.name)}
                key={item.name}
                className={s.dataRow}
              >
                <td className={s.dataCell}>{item.name}</td>
                <td className={s.dataCell}>{currentDay}</td>
                <td
                  className={cn(s.dataCell, {
                    [s.red]: yesterday > currentDay,
                    [s.green]: yesterday < currentDay,
                  })}
                >
                  {yesterday}{" "}
                  <span
                    className={cn(s.percent, {
                      [s.redText]: percentageChange < 0,
                      [s.greenText]: percentageChange >= 0,
                    })}
                  >
                    {percentageChange.toFixed(0)}%
                  </span>
                </td>
                <td className={cn(s.dataCell, {
                  [s.red]: item.values[index] > currentDay,
                  [s.green]: item.values[index] < currentDay,
                })}>{item.values[index]}</td>
              </tr>
              <tr
                className={cn(s.dataChart, {
                  [s.visible]: chartVisible[item.name],
                })}
              >
                <td colSpan="4">
                  <ChartComponent data={item} handleChangeIndex={handleChangeIndex} />
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
