import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryTree from "../../components/board/CategoryTree";
import { fetchCateList, FETCH_CATE_LIST } from "../../modules/category";
import { arrayToTree } from 'performant-array-to-tree'


const CategoryContainer = () => {

  const dispatch = useDispatch();

  const { categorys } = useSelector((category: any) => ({
    categorys: category.category,
  }));

  let trees;

  useEffect(() => {
    dispatch(fetchCateList());
  }, [dispatch]);


  if (categorys.length != 0) {
    const arr = categorys.categorys;
    trees = arrayToTree(arr, { dataField: null })
  }

  return <CategoryTree 
            categorys={trees} 
            category={categorys} />;
};

export default CategoryContainer;



