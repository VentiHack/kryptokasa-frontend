/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./DataTableViewOptions";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import { useActions } from "@/store/actions-context";
import { useState } from "react";

export function DataTableToolbar({ table }) {
  const [orderData, setOrderData] = useState({
    customerID: "",
    orderItems: "",
  });

  const { onEdit, editAction } = useActions();
  const { toast } = useToast();

  const addOrderHandler = async () => {
    const orderItemsIDs = [];

    function isCharNumber(c) {
      return c >= "0" && c <= "9";
    }

    for (let char of orderData.orderItems) {
      if (isCharNumber(char)) {
        orderItemsIDs.push(Number(char));
      }
    }

    const order_data = {
      customer_id: Number(orderData.customerID),
      order_items: orderItemsIDs,
    };

    const response = await fetch(`http://127.0.0.1:8000/orders`, {
      method: "POST",
      body: JSON.stringify(order_data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    onEdit(!editAction);

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `There was a problem with your request: ${data.message} `,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

      return;
    }

    toast({
      title: "Added order",
      description: "Order has been succesfully added",
    });

    setOrderData({});
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter orders..."
          value={table.getColumn("customer_id")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("customer_id")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex items-center space-x-2">
        <DataTableViewOptions table={table} />
        <Dialog>
          <DialogTrigger className="flex items-center px-2 py-1.5 text-sm">
            Add Order +
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add order</DialogTitle>
              <DialogDescription>
                Enter order data to add it. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customerID" className="text-right">
                  Customer ID
                </Label>
                <Input
                  value={orderData.customerID}
                  placeholder="0"
                  className="col-span-3"
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      customerID: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="orders_id" className="text-right">
                  Items
                </Label>
                <Input
                  value={orderData.orderItems}
                  placeholder="1, 2, 3, 4"
                  className="col-span-3"
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      orderItems: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addOrderHandler} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
