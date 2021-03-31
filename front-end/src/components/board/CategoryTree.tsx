import React, { useEffect, useMemo } from "react";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import category from "../../modules/category";


interface TreeViews {
  children?: TreeViews[];
  custom: string;
  id: string;
}

interface CategoryProps {
  category: TreeViews
}

const renderTrees = (nodes: TreeViews) => (
  <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.custom}>
    {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTrees(node)) : null}
  </TreeItem>
);

const Category = ({ category }: CategoryProps) => {
  useEffect(() => {

  }, [category]);
  return renderTrees(category);
}

function CategoryTree(categorys: any) {

  const useTreeStyles = makeStyles({
    root: {
      flexGrow: 1,
      textAlign: 'left',
    },
  });

  const classes = useTreeStyles();

  const cateList = useMemo(() => {
    // if (!(categorys.categorys === undefined)) {
    //   if (categorys.categorys.length != 0) {
    //     return categorys.categorys;
    //   }
    // }

    if (categorys.categorys == null) {
      return []
    }

    return categorys.categorys;
  }, [categorys]);


  return (
    <div>{categorys.categorys.length > 0 && (

      <div>
        {cateList.map((category: TreeViews) => <Category key={category.id} category={category} />
        )}
      </div>

    )}
    </div>
  )
}

export default CategoryTree;

