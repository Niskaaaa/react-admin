import ajax from "./ajax";
import jsonp from "jsonp";
/*
通过jsonp 请求获取天气信息
*/
export function reqWeather(city) {
  const url = `https://lbs.amap.com/api/webservice/guide/api/ipconfig`;
  return new Promise((resolve, reject) => {
    jsonp(
      url,
      {
        param: "callback",
      },
      (error, response) => {
        console.log(response);
        if (!error && response.status == "success") {
          const {
            dayPictureUrl,
            weather,
          } = response.results[0].weather_data[0];
          resolve({ dayPictureUrl, weather });
        } else {
          alert("获取天气信息失败");
        }
      }
    );
  });
}
// 登陆
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");

export const reqCategorys = (parentId) =>
  ajax("/manage/category/list", { parentId },"GET");
// 添加分类
export const reqAddCategory = (parentId, categoryName) =>
  ajax(
    "/manage/category/add",
    {
      parentId,
      categoryName,
    },
    "POST"
  );
// 更新品类名称
export const reqUpdateCategory = ({ categoryId, categoryName }) =>
  ajax(
    "/manage/category/update",
    {
      categoryId,
      categoryName,
    },
    "POST"
  );

// 根据分类ID 获取分类
export const reqCategory = (categoryId) =>
  ajax("/manage/category/info", { categoryId });
// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) =>
  ajax("/manage/product/list", { pageNum, pageSize });

export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchType,
  searchName,
}) =>
  ajax("/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName,
  });
// 添加/更新商品
export const reqAddOrUpdateProduct = (product) =>
  ajax("/manage/product/" + (product._id ? "update" : "add"), product, "post");
// 对商品进行上架/下架处理
export const reqUpdateProductStatus = (productId, status) =>
  ajax(
    "/manage/product/updateStatus",
    {
      productId,
      status,
    },
    "POST"
  );
// 删除图片
export const reqDeleteImg = (name) =>
  ajax("/manage/img/delete", { name }, "post");
