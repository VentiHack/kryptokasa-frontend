/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  const [productsData, setProductsData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const { onEdit, editAction } = useActions();
  const { toast } = useToast();

  const addProductsHandler = async () => {
    const data = {
      ...productsData,
      price: `${productsData.price}$`,
    };

    const response = await fetch(`http://127.0.0.1:8000/products`, {
      method: "POST",
      body: JSON.stringify(data),
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
      title: "Added product",
      description: "Product has been succesfully added",
    });

    setProductsData({});
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter products..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex items-center space-x-2">
        <DataTableViewOptions table={table} />
        <Dialog>
          <DialogTrigger className="flex items-center px-2 py-1.5 text-sm">
            Add Product +
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add customer</DialogTitle>
              <DialogDescription>
                Enter product data to add it. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={productsData.name}
                  placeholder="Product"
                  className="col-span-3"
                  onChange={(e) =>
                    setProductsData({
                      ...productsData,
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
                  value={productsData.price}
                  placeholder="0.00"
                  className="col-span-3"
                  onChange={(e) =>
                    setProductsData({
                      ...productsData,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={productsData.description}
                  placeholder="Description..."
                  className="col-span-3"
                  onChange={(e) =>
                    setProductsData({
                      ...productsData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addProductsHandler} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
