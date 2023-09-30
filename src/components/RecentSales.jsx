import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { useEffect, useState } from "react";

export function RecentSales() {
  const [ordersData, setOrdersData] = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [productsData, setProductsData] = useState([]);

  const fetchOrdersData = async () => {
    const response = await fetch("http://127.0.0.1:8000/orders");
    const data = await response.json();
    // console.log(data);
    setOrdersData(data);
  };

  const fetchCustomersData = async () => {
    const response = await fetch("http://127.0.0.1:8000/customers");
    const data = await response.json();
    // console.log(data);
    setCustomersData(data);
  };

  const fetchProductsData = async () => {
    const response = await fetch("http://127.0.0.1:8000/products");
    const data = await response.json();
    // console.log(data);
    setProductsData(data);
  };

  const getOrdersPrice = (IDarr) => {
    console.log(IDarr);
    let total = 0;
    for (let product of productsData) {
      for (let id of IDarr) {
        if (product.id === id) {
          total = total + Number(product.price.slice(0, -1));
        }
      }
    }
    return total;
  };

  useEffect(() => {
    fetchOrdersData();
    fetchCustomersData();
    fetchProductsData();
  }, []);
  return (
    <div className="space-y-8">
      {ordersData.map((order) => (
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>
              {customersData[order.order_id].name[0]}
              {customersData[order.order_id].surname[0]}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {customersData[order.order_id].name + " "}

              {customersData[order.order_id].surname}
            </p>
            <p className="text-sm text-muted-foreground">
              {customersData[order.order_id].email}
            </p>
          </div>
          <div className="ml-auto font-medium">
            +{getOrdersPrice(order.order_items)}$
          </div>
        </div>
      ))}
    </div>
  );
}
