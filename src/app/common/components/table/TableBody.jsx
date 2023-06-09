/* eslint-disable no-unused-expressions */
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import style from "./Table.module.scss";

const TableBody = ({ data, columns }) => {
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    return _.get(item, columns[column].path);
  };

  return (
    <tbody className={style.body}>
      {data.map((item) => (
        <tr key={item._id} className={style.row}>
          {Object.keys(columns).map((column) => (
            <td key={column} className={style.cell}>
              {renderContent(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
};
export default TableBody;
