/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MoreHorizontal, Pen, Trash } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import { useActions } from "@/store/actions-context";
import { useState } from "react";

export function DataTableRowActions({ row }) {
  const [updateOrderData, setUpdateOrderData] = useState({
    customerID: row.original.customer_id,
    orderItems: row.original.order_items,
  });
  const { onDelete, deleteAction, onEdit, editAction } = useActions();
  const { toast } = useToast();

  console.log(row);

  const deleteOrderHandler = async () => {
    const response = await fetch(`http://127.0.0.1:8000/orders/${row.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
      title: "Deleted order",
      description: "Order has been succesfully deleted",
    });

    onDelete(!deleteAction);
  };

  const editOrderHandler = async () => {
    const orderItemsIDs = [];

    function isCharNumber(c) {
      return c >= "0" && c <= "9";
    }

    for (let char of updateOrderData.orderItems) {
      if (isCharNumber(char)) {
        orderItemsIDs.push(Number(char));
      }
    }

    const order_data = {
      customer_id: Number(updateOrderData.customerID),
      order_items: orderItemsIDs,
    };

    const response = await fetch(`http://127.0.0.1:8000/orders/${row.id}`, {
      method: "PATCH",
      body: JSON.stringify(order_data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `There was a problem with your request: ${resData.message} `,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

      return;
    }

    onEdit(!editAction);

    toast({
      title: "Edited order",
      description: "Order has been succesfully edited",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger className="flex items-center px-2 py-1.5 text-sm">
              <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Edit
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit order</DialogTitle>
                <DialogDescription>
                  Enter order data to update it. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customerID" className="text-right">
                    Customer ID
                  </Label>
                  <Input
                    value={updateOrderData.customerID}
                    className="col-span-3"
                    onChange={(e) =>
                      setUpdateOrderData({
                        ...updateOrderData,
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
                    value={updateOrderData.orderItems}
                    className="col-span-3"
                    onChange={(e) =>
                      setUpdateOrderData({
                        ...updateOrderData,
                        orderItems: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={editOrderHandler} type="submit">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={deleteOrderHandler}>
          <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
