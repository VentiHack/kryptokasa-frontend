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
  const [updateCustomersData, setUpdateCustomersData] = useState({
    name: row.original.name,
    surname: row.original.surname,
    email: row.original.email,
    phone_number: row.original.phone_number,
  });
  const { onDelete, deleteAction, onEdit, editAction } = useActions();
  const { toast } = useToast();

  const deleteCustomerHandler = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/customers/${row.original.id}`,
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
      title: "Deleted customer",
      description: "Customer has been succesfully deleted",
    });

    onDelete(!deleteAction);
  };

  const editCustomerHandler = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/customers/${row.original.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updateCustomersData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
      title: "Edited customer",
      description: "Customer has been succesfully edited",
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
                <DialogTitle>Edit customer</DialogTitle>
                <DialogDescription>
                  Make changes to choosen customer here. Click save when you're
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
                    value={updateCustomersData.name}
                    className="col-span-3"
                    onChange={(e) =>
                      setUpdateCustomersData({
                        ...updateCustomersData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="surname" className="text-right">
                    Surname
                  </Label>
                  <Input
                    id="surname"
                    value={updateCustomersData.surname}
                    className="col-span-3"
                    onChange={(e) =>
                      setUpdateCustomersData({
                        ...updateCustomersData,
                        surname: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    email
                  </Label>
                  <Input
                    id="email"
                    value={updateCustomersData.email}
                    className="col-span-3"
                    onChange={(e) =>
                      setUpdateCustomersData({
                        ...updateCustomersData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phonenumber" className="text-right">
                    Phone number
                  </Label>
                  <Input
                    id="phonenumber"
                    value={updateCustomersData.phone_number}
                    onChange={(e) =>
                      setUpdateCustomersData({
                        ...updateCustomersData,
                        phone_number: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={editCustomerHandler} type="submit">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={deleteCustomerHandler}>
          <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
