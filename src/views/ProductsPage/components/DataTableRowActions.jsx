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
  const [updateProductData, setUpdateProductData] = useState({
    name: row.original.name,
    price: row.original.price.slice(0, -1),
    description: row.original.description,
  });

  const { onDelete, deleteAction, onEdit, editAction } = useActions();
  const { toast } = useToast();

  const deleteProductHandler = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/products/${row.original.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
      title: "Deleted product",
      description: "Product has been succesfully deleted",
    });

    onDelete(!deleteAction);
  };

  const editProductHandler = async () => {
    const data = {
      ...updateProductData,
      price: `${updateProductData.price}$`,
    };

    const response = await fetch(
      `http://127.0.0.1:8000/products/${row.original.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
      title: "Edited product",
      description: "Product has been succesfully edited",
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
                <DialogTitle>Edit product</DialogTitle>
                <DialogDescription>
                  Make changes to choosen product here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={updateProductData.name}
                    className="col-span-3"
                    onChange={(e) =>
                      setUpdateProductData({
                        ...updateProductData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="surname" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="price"
                    value={updateProductData.price}
                    className="col-span-3"
                    onChange={(e) =>
                      setUpdateProductData({
                        ...updateProductData,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={updateProductData.description}
                    className="col-span-3"
                    onChange={(e) =>
                      setUpdateProductData({
                        ...updateProductData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={editProductHandler} type="submit">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={deleteProductHandler}>
          <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
