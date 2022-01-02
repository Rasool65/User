import { ListItem } from '@material-ui/core';
import { NavRoute, RouteItem } from './style';

const Bredcrumb = (props) => {
  const { listItems, icon } = props;
  return (
    <NavRoute>
      {listItems
        .slice(0)
        .reverse()
        .map((item, index) => {
          return (
            <RouteItem key={index}>
              {item}
              <span>{index < listItems.length - 1 ? icon : ``}</span>
            </RouteItem>
          );
        })}
    </NavRoute>
  );
};
export default Bredcrumb;
